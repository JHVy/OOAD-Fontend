import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { addProduct, getProducts } from "../../../actions/productActions";
import { addInvoice } from "../../../actions/invoiceActions";
import { getAllCategories } from "../../../actions/categoryActions";
import { showNoti } from "../../../actions/notificationActions";
import "react-notifications/lib/notifications.css";
import { NotificationContainer } from "react-notifications";
import Select from "react-select";
import PropTypes from "prop-types";
import mongoose from "mongoose";

class ProductModal extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  state = {
    name: "",
    idCategory: "",
    price: 0,
    linkpic: '',
    status: 1,
    _id: "",
    msg: "",
    notiType: "",
    listCate: [],
    listStatus: [{ label: 'Inactive', value: 0 }, { label: 'Available', value: 1 }],
    selectedStatus: 1,
  };

  handleClick = () => {
    this.upload.click()
  }

  componentDidMount() {
    this.props.getAllCategories('');
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.product.products !== this.props.product.products) {
      if (this.props.isLoaded === false) {
        return;
      }

      if (
        this.props.product.type === "DELETE_PRODUCT" ||
        this.props.product.type === "GET_PRODUCTS" ||
        this.props.product.type === "GET_SEARCH_PRODUCTS"
      ) {
        return;
      }

      if (this.props.product.response === 200) {
        this.setState({ notiType: "success" });
      } else {
        this.setState({ notiType: "failure" });
      }
    }
  }
  onChange = e => {

    const { name, value } = e.target;
    let msg = "";

    // //Validation
    // const isPassed = this.validatePhone(value);

    // if (!isPassed && name === "phone") {
    //   msg = "Phone can only contain numbers and spaces";
    // }
    this.setState({ [name]: value, msg: msg });
  };

  validatePhone = phone => {
    return new RegExp(/^[0-9 ]*$/).test(phone);
  };

  onSubmit = e => {
    e.preventDefault();
    const newItem = {
      idCategory: this.state.idCategory,
      name: this.state.name,
      price: this.state.price,
      linkpic: this.state.linkpic,
      status: this.state.status,
      _id: mongoose.Types.ObjectId()
    };

    this.props.addProduct(newItem);
    this.setState({ name: "", price: "" });

    // Close modal
    document.getElementById("triggerButton").click();
  };
  onCancel = e => {
    this.setState({ name: "", phone: "" });
  };
  createNotification = () => {
    const { notiType } = this.state;
    this.props.showNoti(notiType);
    this.setState({ notiType: "" });
  };

  onChangeSelectedCate = idCategory => {
    this.setState({ idCategory: idCategory.value })
  }

  onChangeSelectedStatus = status => {
    this.setState({ status: status.value })
  }

  onMenuOpen = () => {
    this.setState(state => {
      let listCate = [...state.listCate]
      if (this.props.category.categories.length === this.state.listCate.length) return;
      else listCate = [];

      this.props.category.categories.map(el => {
        listCate.push({ 'value': el._id, 'label': el.name })
      });

      return {
        listCate
      }
    });
  }

  onChangeFile(event) {
    event.stopPropagation();
    event.preventDefault();
    var file = event.target.files[0];
    this.setState({ linkpic: '../../dist/img/' + file.name });
  }

  render() {
    const { notiType, name, price, linkpic, listCate, listStatus } = this.state;

    return (
      <Fragment>
        {notiType !== "" ? this.createNotification() : null}
        <NotificationContainer />

        {/* Button trigger modal */}
        <button
          type="button"
          id="triggerButton"
          style={{ float: "right" }}
          className="btn btn-primary"
          data-toggle="modal"
          data-target="#exampleModalCenter"
          onClick={this.handleOnClick}
        >
          Add new product
        </button>
        {/* Modal */}
        <form onSubmit={this.onSubmit}>
          <div
            className="modal fade"
            id="exampleModalCenter"
            tabIndex={-1}
            role="dialog"
            aria-labelledby="exampleModalCenterTitle"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-dialog-centered" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <span>
                    <h3 className="modal-title" id="exampleModalLongTitle">
                      Add new Product
                    </h3>
                  </span>
                  <span>
                    <button
                      type="button"
                      className="close"
                      data-dismiss="modal"
                      aria-label="Close"
                    >
                      <span aria-hidden="true">×</span>
                    </button>
                  </span>
                </div>
                <div className="modal-body">
                  {this.state.msg != "" ? (
                    <div className="alert alert-danger alert-dismissible">
                      {this.state.msg}
                    </div>
                  ) : null}
                  <div className="form-group">
                    <label htmlFor="recipient-name" className="col-form-label">
                      Name:
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      placeholder="Add product"
                      name="name"
                      onChange={this.onChange}
                      value={name}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="recipient-name" className="col-form-label">
                      Category:
                    </label>
                    <Select
                      name="idCategory"
                      onMenuOpen={this.onMenuOpen}
                      onChange={this.onChangeSelectedCate}
                      isSearchable={true}
                      options={listCate}>
                    </Select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="recipient-name" className="col-form-label">
                      Price:
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Add price"
                      name="price"
                      onChange={this.onChange}
                      value={price}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="recipient-name" className="col-form-label">
                      Chosse picture:
                    </label>
                    <input id="myInput"
                      type="file"
                      ref={(ref) => this.upload = "ref"}
                      onChange={this.onChangeFile.bind(this)}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="recipient-name" className="col-form-label">
                      Status:
                    </label>
                    <Select
                      name="status"
                      onChange={this.onChangeSelectedStatus}
                      isSearchable={true}
                      options={listStatus}>
                    </Select>

                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-dismiss="modal"
                    onClick={this.onCancel}
                  >
                    Close
                  </button>
                  <button
                    type="submit"
                    //onClick={this.onSubmit}
                    className="btn btn-primary"
                  >
                    Add product
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </Fragment>
    );
  }
}

ProductModal.propTypes = {
  showNoti: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  product: state.product,
  category: state.category,
  isLoaded: state.product.isLoaded
});

export default connect(mapStateToProps, {
  addProduct,
  getProducts,
  addInvoice,
  getAllCategories,
  showNoti
})(ProductModal);
