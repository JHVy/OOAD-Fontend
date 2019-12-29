import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import axios from "axios";
import { getInvoices, addInvoice } from "../../../actions/invoiceActions";
import { addInvoiceDet } from "../../../actions/invoicedetActions";
import { getSearchMembers, getMembers } from "../../../actions/memberActions";
import { getProducts, deleteProduct } from "../../../actions/productActions";
import { getParameters } from "../../../actions/parameterActions";
import { showNoti } from "../../../actions/notificationActions";
import MemberModal from "../Member/MemberModal";
import Select from "react-select";
import Loader from "react-loader";
import { NotificationContainer } from "react-notifications";
const mongoose = require("mongoose");

class OrderScreen extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    invisibleInpUserVal: "",
    invisibleInpMemVal: "",
    listSelectMember: [],
    listSelectUser: [],
    selectedMember: "",
    selectedUser: "",
    listOrder: [],
    idMember: "",
    idUser: "",
    comments: "",
    total: 0,
    inputQty: 0,
    point: '',
    sort: [{ value: "5" }, { value: "10" }, { value: "20" }],
    select: "5",
    currentPage: 1,
    pages: [],
    totalDocuments: 0,
    query: "",
    discount: 0,
    isMemberDiscount: false,
    notiType: ""
  };

  tokenConfig = token => {
    const config = {
      headers: {
        "Content-type": "application/json"
      }
    };
    //Header
    if (token) {
      config.headers["x-auth-token"] = token;
    }

    return config;
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    let { isLoaded, member, invoice } = this.props;
    const { selectedMember, total } = this.state;

    if (prevProps.invoice.invoices !== this.props.invoice.invoices) {
      if (isLoaded === false) {
        return;
      }

      if (invoice.type === "ADD_INVOICE") {
        if (invoice.response === 200) {
          this.setState({ notiType: "success" });

          const { parameters } = this.props.parameter;
          //update member's points
          let point = 0;
          if (parameters[0].memberPointDiscount != 0) point = selectedMember.point + total * 5 / 1000 - 1000;
          axios
            .put(
              `${process.env.REACT_APP_BACKEND_HOST}/api/member/point/${selectedMember.value}`,
              {
                _id: selectedMember.value,
                point: point,
              },
              this.tokenConfig(this.props.auth.token)
            )
            .then(response => {
              console.log(response.data);
            })
            .catch(error => {
            });
          //update member's points

          this.state.listOrder.map(el => {
            const newInvoiceDet = {
              idInvoice: invoice.invoices[0]._id, //invoice.invoices[0]._id la id cua invoice vua dc them vao
              idProduct: el._id,
              price: el.price,
              quantity: el.orderQty,
              _id: mongoose.Types.ObjectId()
            };
            this.props.addInvoiceDet(newInvoiceDet);
          });

          setTimeout(
            function () {
              //Start the timer
              //window.location.reload();
            }.bind(this),
            500
          );
        } else {
          this.setState({ notiType: "failure" });
        }
      } else {
        return;
      }
    }
  }

  onRadioChange = e => {
    const { parameters } = this.props.parameter;

    if (e.target.value === 'member') this.setState({ discount: parameters[0].memberPointDiscount })
    else {

      this.setState({ discount: parameters[0].systemDiscount })
    }
  }

  handleOnSearchChange = e => {
    const { query } = this.state;
    this.setState({ [e.target.name]: e.target.value }, () => {
      let format = /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
      if (format.test(this.state.query)) {
        return;
      }
      this.props.getSearchMembers(this.state.query);
    });
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onChangeSelectedMember = selectedMember => {
    const { parameters } = this.props.parameter

    if (selectedMember.point >= Number(parameters[0].maxPoint)) {
      this.setState({ isMemberDiscount: true })
    }
    this.setState({ point: selectedMember.point })
    this.setState({ selectedMember: selectedMember });
    this.setState({ invisibleInpMemVal: selectedMember.value });
  };

  //load len list member
  onListMemberClick = () => {
    this.setState(state => {
      let listSelectMember = [...state.listSelectMember];
      if (
        this.props.member.members.length === this.state.listSelectMember.length
      )
        return;
      else listSelectMember = [];
      this.props.member.members.map(el => {
        listSelectMember.push({
          value: el._id,
          label: el.name + " - " + el.phone,
          point: el.point
        });
      });
      return {
        listSelectMember
      };
    });
  };


  handleInputQtyChange(e, productDet) {
    let totalTmp = 0,
      inputVal = 0;
    if (e.target.value !== "") {
      inputVal = parseInt(e.target.value);
    }

    this.setState(state => {
      let listOrder = [...state.listOrder];

      listOrder.map(function (el, index) {
        if (productDet._id === el._id) {
          //thêm món đã có sẵn trong order -> tăng qty
          const tempObj = {
            _id: el._id,
            name: el.name,
            price: el.price,
            orderQty: inputVal
          };
          totalTmp = state.total - el.price * el.orderQty;
          listOrder.splice(index, 1); //bỏ dòng order hiện tại

          listOrder = [...listOrder, tempObj]; //thêm dòng order mới thay vào chỗ vừa bỏ
          totalTmp = totalTmp + productDet.price * inputVal;

          return false;
        }
      });

      this.setState({ total: totalTmp });

      return {
        listOrder
      };
    });
  }

  handleAddToOrder = productDet => {
    let exit = 0,
      totalTmp = 0;

    this.setState(state => {
      let listOrder = [...state.listOrder];

      listOrder.map(function (el, index) {
        if (productDet._id === el._id) {
          //thêm món đã có sẵn trong order -> tăng qty
          const tempObj = {
            _id: el._id,
            name: el.name,
            price: el.price,
            orderQty: el.orderQty + 1
          };
          totalTmp = state.total - el.price * el.orderQty;
          listOrder.splice(index, 1); //bỏ dòng order hiện tại

          listOrder = [...listOrder, tempObj]; //thêm dòng order mới thay vào chỗ vừa bỏ
          totalTmp = state.total + productDet.price * 1;

          exit = 1;
          return;
        }
      });

      if (exit === 0) {
        //thêm món chưa có sẵn trong order
        const quantity =
          productDet.quantity - 1 < 0 ? 0 : productDet.quantity - 1;
        const orderDetail = {
          _id: productDet._id,
          name: productDet.name,
          price: productDet.price,
          orderQty: 1,
          quantity: quantity
        };
        listOrder = [...state.listOrder, orderDetail];

        totalTmp = state.total + productDet.price * orderDetail.orderQty;
      }
      this.setState({ total: totalTmp });
      return {
        listOrder
      };
    });
  };

  removeItem(index) {
    this.setState(state => {
      //set total invoice
      let totalTmp =
        state.total -
        this.state.listOrder[index].price *
        this.state.listOrder[index].orderQty;
      this.setState({ total: totalTmp });

      let listOrder = [...state.listOrder];
      listOrder.splice(index, 1);
      return {
        ...state.listOrder, //cai dau`
        listOrder //neu ko co cai dau thi lay cai nay
      };
    });
  }

  onSubmit = e => {
    e.preventDefault();

    const { selectedMember, total, comments, discount } = this.state;
    //console.log(discount)
    let temp = discount !== '' ? (total - total * discount / 100) : total;
    this.setState({ total: temp });

    const newInvoice = {
      idMember: selectedMember.value,
      idUser: this.props.user._id,
      totalAmt: temp,
      createddate: new Date(),
      comments: comments,
      status: 1,
      discount: discount,
      _id: mongoose.Types.ObjectId()
    };

    if (total === 0) {
      this.setState({ notiType: "warning-order" });
      return;
    }
    this.props.addInvoice(newInvoice);
  };

  convertDate = date => {
    const newDate = new Date(date);
    let year = newDate.getFullYear();
    let month = newDate.getMonth() + 1;
    let dt = newDate.getDate();

    dt = dt < 10 ? `0${dt}` : dt;
    month = month < 10 ? `0${month}` : month;

    return year + "-" + month + "-" + dt;
  };

  componentDidMount() {
    const { select, currentPage, query } = this.state;
    this.getTotalDocuments();
    this.getPages();
    this.props.getProducts(select, currentPage, query);
    this.props.getParameters(5, 1, '');
    this.props.getSearchMembers("");
  }

  getTotalDocuments = () => {
    const { query } = this.state;
    let newQuery = "";
    if (query === "") newQuery = "undefined";
    else newQuery = query;

    axios
      .get(
        `${process.env.REACT_APP_BACKEND_HOST}/api/product/count/${newQuery}`
      )
      .then(response => {
        this.setState({ totalDocuments: response.data });
      })
      .catch(er => {
        console.log(er.response);
      });
  };

  getPages = () => {
    const { select, query } = this.state;
    console.log(query);
    let newQuery = "";
    if (query === "") newQuery = "undefined";
    else newQuery = query;

    axios
      .get(
        `${process.env.REACT_APP_BACKEND_HOST}/api/product/count/${newQuery}`
      )
      .then(response => {
        let pages = Math.floor(response.data / select);
        let remainder = response.data % select;
        let newArray = [];
        if (remainder !== 0) pages += 1;

        for (let i = 0; i < pages; i++) {
          newArray.push({ pageNumber: i + 1 });
        }

        this.setState({ pages: newArray });
      })
      .catch(er => {
        console.log(er.response);
      });
  };

  handleOnChange = e => {
    this.setState({ [e.target.name]: e.target.value }, () => {
      const { select, currentPage, query } = this.state;
      this.props.getProducts(select, currentPage, query);
      this.getPages();
      this.getTotalDocuments();
    });
  };

  handleChoosePage = e => {
    this.setState({ currentPage: e }, () => {
      const { select, currentPage, query } = this.state;
      this.props.getProducts(select, currentPage, query);
    });
  };

  renderPageButtons = () => {
    const { pages, currentPage } = this.state;

    return pages.map(eachButton => (
      <li
        key={eachButton.pageNumber}
        className={
          currentPage === eachButton.pageNumber
            ? "paginae_button active"
            : "paginate_button "
        }
      >
        <a
          name="currentPage"
          onClick={() => this.handleChoosePage(eachButton.pageNumber)}
          aria-controls="example1"
          data-dt-idx={eachButton.pageNumber}
          tabIndex={0}
        >
          {eachButton.pageNumber}
        </a>
      </li>
    ));
  };

  stages = {
    left: [
      {
        percent: 25,
        icon: "link",
        text: "Get link",
        action: (event, inst) => {
          this.toast("Link copied");
        }
      },
      {
        percent: 50,
        icon: "download",
        text: "Download",
        action: (event, inst) => {
          this.toast("Downloaded");
        }
      }
    ],
    right: [
      {
        percent: -50,
        icon: "remove",
        text: "Delete",
        confirm: true,
        action: (event, inst) => {
          // inst.remove(event.target, null, () => {
          // });
          this.removeItem(event.index);
          return true;
        }
      }
    ]
  };
  createNotification = () => {
    this.props.showNoti(this.state.notiType);
    this.setState({ notiType: "" });
  };

  render() {
    const { products } = this.props.product;
    const { members } = this.props.member;
    const { parameters } = this.props.parameter;
    const { isLoaded } = this.props;
    const {
      invisibleInpMemVal,
      listOrder,
      listSelectMember,
      total,
      point,
      isMemberDiscount
    } = this.state;

    return (
      <Fragment>
        {!isLoaded ? (
          <Loader></Loader>
        ) : (
            <React.Fragment>
              {this.state.notiType !== "" ? this.createNotification() : null}
              <NotificationContainer />

              {/* Content Header (Page header) */}
              <section className="content-header">
                <h1>
                  Order
                {/* <small>Preview</small> */}
                </h1>
                <ol className="breadcrumb">
                  <li>
                    <a href="fake_url">
                      <i className="fa fa-dashboard" /> Home
                  </a>
                  </li>
                  <li>
                    <a href="fake_url">Order</a>
                  </li>
                </ol>
              </section>
              {/* Main content */}

              <section className="content">
                <div className="row">
                  <form onSubmit={this.onSubmit}>
                    <div className="col-md-3">
                      {/* Profile Image */}
                      <div className="box box-primary">
                        <div className="box-body box-profile">
                          <h3 className="profile-username text-center">Order</h3>

                          <p className="text-muted text-center">
                            {this.convertDate(new Date())}
                          </p>

                          <ul className="list-group list-group-unbordered">
                            {listOrder.map((eachProduct, index) => (
                              <li key={eachProduct._id} className="list-group-item">
                                <a
                                  style={{ cursor: "pointer" }}
                                  onClick={() => this.removeItem(index)}
                                  className="fa fa-trash-o"
                                ></a>
                                <b> {eachProduct.name} </b>x{" "}
                                <input
                                  style={{ border: "none", width: "50px" }}
                                  type="number"
                                  value={eachProduct.orderQty}
                                  onChange={e =>
                                    this.handleInputQtyChange(e, eachProduct)
                                  }
                                />
                                <a className="pull-right">
                                  {eachProduct.price * eachProduct.orderQty}
                                </a>
                              </li>
                            ))}
                            <li className="list-group-item">
                              <b>Total </b>
                              <a className="pull-right">{total}</a>
                            </li>
                          </ul>

                          <button
                            className="btn btn-primary btn-block"
                            type="submit"
                          >
                            <b>Order</b>
                          </button>
                        </div>
                        {/* /.box-body */}
                      </div>
                      {/* /.box */}

                      {/* About Me Box */}
                      <div className="box box-primary">
                        <div className="box-header with-border">
                          <h3 className="box-title">Note</h3>
                        </div>
                        {/* /.box-header */}
                        <div className="box-body">
                          <strong>
                            <i className="fa fa-address-book margin-r-5"></i>{" "}
                            Staff name
                        </strong>
                          <input
                            required
                            onChange={this.onChange}
                            type="text"
                            className="form-control"
                            name="idUser"
                            value={this.props.user.username}
                            placeholder="Enter user"
                          ></input>
                          {/* <Select
                          name="idUser"
                          onMenuOpen={this.onListMemberClick}
                          onChange={this.onChangeSelectedUser}
                          isSearchable={true}
                          options={listSelectMember}
                        ></Select>
                        <input
                          style={{ opacity: 0, height: 0 }}
                          required
                          value={invisibleInpUserVal}
                          onChange={this.onChange}
                        /> */}
                          <br />
                          <strong>
                            <i className="fa fa-phone margin-r-5"></i>
                            Customer phone
                          </strong>

                          <Select
                            name="idMember"
                            id="idMember"
                            onMenuOpen={this.onListMemberClick}
                            onChange={this.onChangeSelectedMember}
                            isSearchable={true}
                            options={listSelectMember}
                            required
                          ></Select>
                          <input
                            style={{ opacity: 0, height: 0 }}
                            required
                            value={invisibleInpMemVal}
                            readOnly
                          />
                          <br />
                          <strong>
                            <i className="fa fa-star-o margin-r-5"></i>
                            Point
                          </strong>
                          <input
                            value={point}
                            type="text"
                            className="form-control"
                            name="point"
                            disabled
                          ></input>
                          <br />

                          <strong>
                            <i className="fa fa-sticky-note-o margin-r-5"></i>{" "}
                            Choose discount
                          </strong>
                          <div className="form-group">
                            <div className="radio">
                              <label>
                                <label />
                                <input type="radio" name="optionsRadios" id="optionsRadios1" value="member" onChange={this.onRadioChange} disabled={!isMemberDiscount} />
                                Member's points
                            </label>
                            </div>
                            <div className="radio">
                              <label />
                              <label>
                                <input type="radio" name="optionsRadios" id="optionsRadios3" value="system" onChange={this.onRadioChange} disabled={!(parameters[0].systemDiscount != 0)} />
                                {parameters[0].systemDiscount !== 0 ? parameters[0].systemDiscount + "% discount" : "No discount"}
                              </label>
                            </div>
                          </div>

                          <br />
                          <strong>
                            <i className="fa fa-sticky-note-o margin-r-5"></i>{" "}
                            Notes
                          </strong>
                          <input
                            onChange={this.onChange}
                            type="text"
                            className="form-control"
                            name="comments"
                            placeholder="Enter notes"
                          ></input>
                        </div>
                        {/* /.box-body */}
                      </div>
                      {/* /.box */}
                    </div>
                    {/* /.col */}
                  </form>

                  <div className="col-md-9">
                    <div className="nav-tabs-custom">
                      <ul className="nav nav-tabs">
                        <li className="active">
                          <a href="#activity" data-toggle="tab">
                            Drink
                        </a>
                        </li>
                        <li>
                          <a href="#timeline" data-toggle="tab">
                            Food
                        </a>
                        </li>
                        <li>
                          <a href="#settings" data-toggle="tab">
                            Customers
                        </a>
                        </li>
                      </ul>
                      <div className="tab-content">
                        <div className="active tab-pane" id="activity">
                          <div className="box box-primary">
                            {products.map((eachProduct, index) => (
                              <div
                                key={eachProduct._id}
                                style={menuStyle}
                                className="box-body box-profile"
                              >
                                <img
                                  className="profile-user-img img-responsive img-circle"
                                  src={eachProduct.linkpic}
                                  alt="User profile picture"
                                />
                                <h3 className="profile-username text-center">
                                  {eachProduct.name}
                                </h3>
                                <p className="text-muted text-center">
                                  {eachProduct.price} VND
                              </p>

                                <a
                                  className="btn btn-primary btn-block"
                                  onClick={() =>
                                    this.handleAddToOrder(eachProduct)
                                  }
                                >
                                  <b>Add to order </b>
                                </a>
                              </div>
                            ))}
                          </div>
                        </div>
                        {/* /.tab-pane */}

                        <div className="tab-pane" id="timeline">
                          <p>ttt</p>
                        </div>
                        {/* /.tab-pane */}

                        <div className="tab-pane" id="settings">
                          <MemberModal />
                          <div className="box-body">
                            <div
                              id="example1_wrapper"
                              className="dataTables_wrapper form-inline dt-bootstrap"
                            >
                              <div className="row">
                                <div>
                                  <div className="col-sm-6">
                                    <div
                                      id="example1_filter"
                                      className="dataTables_filter"
                                    >
                                      <label style={{ float: "left" }}>
                                        Search:
                                      <input
                                          type="search"
                                          name="query"
                                          style={{ margin: "0px 5px" }}
                                          className="form-control input-sm"
                                          placeholder="Find me  "
                                          aria-controls="example1"
                                          onChange={this.handleOnSearchChange}
                                          value={this.state.query}
                                        />
                                      </label>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div className="row">
                                <div className="col-sm-12">
                                  <table
                                    id="example1"
                                    className="table table-bordered table-striped"
                                  >
                                    <thead style={{ display: "block" }}>
                                      <tr>
                                        <th style={{ width: "5%" }}>#</th>
                                        <th style={{ width: "20%" }}>Member</th>
                                        <th style={{ width: "15%" }}>Phone</th>
                                        <th style={{ width: "15%" }}>Point</th>
                                        <th style={{ width: "15%" }}>
                                          Created date
                                      </th>
                                      </tr>
                                    </thead>
                                    <tbody
                                      style={{
                                        display: "block",
                                        overflow: "auto",
                                        height: "200px"
                                      }}
                                    >
                                      {members.map((eachMember, index) => (
                                        <tr key={eachMember._id}>
                                          <td style={{ width: "6%" }}>
                                            {index + 1}
                                          </td>
                                          <td style={{ width: "20%" }}>
                                            {eachMember.name}
                                          </td>
                                          <td style={{ width: "15%" }}>
                                            {eachMember.phone}
                                          </td>
                                          <td style={{ width: "15%" }}>
                                            {eachMember.point}
                                          </td>
                                          <td style={{ width: "15%" }}>
                                            {this.convertDate(
                                              eachMember.createAt
                                            )}
                                          </td>
                                        </tr>
                                      ))}
                                    </tbody>
                                  </table>
                                </div>
                              </div>
                            </div>
                            {/*/.col (left) */}
                          </div>
                        </div>
                        {/* /.tab-pane */}
                      </div>
                    </div>
                    {/* /.tab-content */}
                  </div>
                  {/* /.nav-tabs-custom */}
                </div>
              </section>

              {/* /.content */}
            </React.Fragment>
          )}
      </Fragment>
    );
  }
}



OrderScreen.propTypes = {
  getProducts: PropTypes.func.isRequired,
  product: PropTypes.object.isRequired,
  getMembers: PropTypes.func.isRequired,
  getSearchMembers: PropTypes.func.isRequired,
  member: PropTypes.object.isRequired,
  addInvoice: PropTypes.func.isRequired,
  addInvoiceDet: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  product: state.product,
  member: state.member,
  invoice: state.invoice,
  isLoaded: state.member.isLoaded,
  user: state.auth.user,
  parameter: state.parameter,
  auth: state.auth
});

export default connect(mapStateToProps, {
  getProducts,
  deleteProduct,
  getSearchMembers,
  getMembers,
  addInvoice,
  addInvoiceDet,
  getInvoices,
  getParameters,
  showNoti
})(OrderScreen);

const menuStyle = {
  display: "inline-block"
};
