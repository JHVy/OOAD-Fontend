import React, { Fragment, Component } from "react";
import { connect } from "react-redux";
import { showNoti } from "../../../actions/notificationActions";
import "react-notifications/lib/notifications.css";
import { NotificationContainer } from "react-notifications";
import { getAllCategories } from "../../../actions/categoryActions";
import axios from "axios";
import PropTypes from "prop-types";
import Select from "react-select";

class ProductEdit extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  state = {
    name: "",
    idCategory: "",
    price: 0,
    linkpic: "",
    status: 1,
    _id: "",
    listCate: [],
    listStatus: [{ label: 'Inactive', value: 0 }, { label: 'Available', value: 1 }],
    categoryLabel: '',
    msg: "",
    notiType: ""
  };

  handleClick = () => {
    this.upload.click()
  };
  onChangeFile(event) {
    event.stopPropagation();
    event.preventDefault();
    var file = event.target.files[0];
    this.setState({ linkpic: '../../dist/img/' + file.name });
  };

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

  onChangeSelectedCate = idCategory => {
    this.setState({ idCategory: idCategory.value, categoryLabel: idCategory.label })
  }

  onChangeSelectedStatus = status => {
    this.setState({ status: status.value })
  }

  createNotification = () => {
    const { notiType } = this.state;
    this.props.showNoti(notiType);
    this.setState({ notiType: "" });
  };

  componentDidMount() {
    this.props.getAllCategories('');
    const { id } = this.props.match.params;

    axios
      .get(
        `${process.env.REACT_APP_BACKEND_HOST}/api/product/${id}`,
        this.tokenConfig(this.props.auth.token)
      )
      .then(response => {
        if (response.data === null) this.props.history.push("/404");
        const { _id, name, idCategory, price, linkpic, status } = response.data;

        //get category name by id
        axios
          .get(
            `${process.env.REACT_APP_BACKEND_HOST}/api/category/${response.data.idCategory}`,
            this.tokenConfig(this.props.auth.token)
          )
          .then(response => {
            if (response.data === null) this.setState({ categoryLabel: '' });
            this.setState({ categoryLabel: response.data.name });
          })
          .catch(er => console.log(er.response));
        //get category name by id

        this.setState({
          _id,
          name,
          idCategory,
          price,
          linkpic,
          status,
        });
      })
      .catch(er => console.log(er.response));

  }

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

  handleChange = e => {
    //this.setState({ [e.target.name]: e.target.value });
    const { name, value } = e.target;
    let msg = "";

    this.setState({ [name]: value, msg: msg });
  };

  handleSubmit = e => {
    const { _id, name, idCategory, price, linkpic, status } = this.state;
    e.preventDefault();

    const newProduct = {
      _id,
      name,
      idCategory,
      price,
      linkpic,
      status,
    };

    axios
      .put(
        `${process.env.REACT_APP_BACKEND_HOST}/api/product/${_id}`,
        newProduct,
        this.tokenConfig(this.props.auth.token)
      )

      .then(response => {
        if (response.status === 200) {
          this.setState({ notiType: "success" });

          setTimeout(
            function () {
              //Start the timer
              window.location.replace("/product");
            }.bind(this),
            500
          );
        }
        console.log(response.data);
      })
      .catch(error => {
        this.setState({ notiType: "failure" });
        console.log(error.response);
      });

    //Quay về trang chính
  };

  handleCancel = e => {
    this.props.history.push("/product");
  };

  render() {
    const { _id, idCategory, price, linkpic, status, listCate, listStatus, categoryLabel } = this.state;

    return (
      <Fragment>
        {this.state.notiType !== "" ? this.createNotification() : null}
        <NotificationContainer />

        {/* Content Header (Page header) */}
        <section className="content-header">
          <h1>
            Product
            {/* <small>Preview</small> */}
          </h1>
          <ol className="breadcrumb">
            <li>
              <a href="fake_url">
                <i className="fa fa-dashboard" /> Home
              </a>
            </li>
            <li>
              <a href="fake_url">Product</a>
            </li>
            <li>
              <a href="fake_url">Edit</a>
            </li>
          </ol>
        </section>
        {/* Main content */}
        <section className="content">
          <div className="row">
            <div className="col-md-6">
              <div className="box box-info">
                <div className="box-header with-border">
                  <h3 className="box-title">Horizontal Form</h3>
                </div>
                {/* /.box-header */}
                {/* form start */}
                <form className="form-horizontal" onSubmit={this.handleSubmit}>
                  {this.state.msg != "" ? (
                    <div className="alert alert-danger alert-dismissible">
                      {this.state.msg}
                    </div>
                  ) : null}
                  <div className="box-body">
                    <div className="form-group">
                      <label
                        htmlFor="inputEmail3"
                        className="col-sm-2 control-label"
                      >
                        ID
                      </label>
                      <div className="col-sm-10">
                        <input
                          name="_id"
                          type="text"
                          id="inputEmail3"
                          placeholder="Loading..."
                          className="form-control"
                          value={_id}
                          disabled={true}
                          onChange={this.handleChange}
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label
                        htmlFor="inputPassword3"
                        className="col-sm-2 control-label"
                      >
                        Category:
                      </label>
                      <div className="col-sm-10">
                        <Select
                          name="idCategory"
                          onMenuOpen={this.onMenuOpen}
                          onChange={this.onChangeSelectedCate}
                          isSearchable={true}
                          options={listCate}
                          value={{
                            value: idCategory,
                            label: categoryLabel
                          }} >

                        </Select>
                      </div>
                    </div>

                    <div className="form-group">
                      <label
                        htmlFor="inputPassword3"
                        className="col-sm-2 control-label"
                      >
                        Price
                      </label>
                      <div className="col-sm-10">
                        <input
                          name="price"
                          type="number"
                          className="form-control"
                          placeholder="Loading..."
                          value={price}
                          onChange={this.handleChange}
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <label
                        htmlFor="inputPassword3"
                        className="col-sm-2 control-label"
                      >
                        Link Photo
                      </label>
                      <div style={{ display: 'inline-block' }}>
                        <div className="col-sm-10">
                          <input
                            name="linkpic"
                            type="text"
                            className="form-control"
                            placeholder="Loading..."
                            value={linkpic}
                            onChange={this.handleChange}
                          />
                          <input
                            type="file"
                            ref={(ref) => this.upload = "ref"}
                            onChange={this.onChangeFile.bind(this)}
                          //value={linkpic}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="form-group">
                      <label
                        htmlFor="inputPassword3"
                        className="col-sm-2 control-label"
                      >
                        Status
                      </label>
                      <div className="col-sm-10">
                        <Select
                          name="status"
                          onChange={this.onChangeSelectedStatus}
                          isSearchable={true}
                          options={listStatus}
                          value={{
                            value: status,
                            label: status === 1 ? 'Available' : 'Inactive'
                          }} >
                          >
                        </Select>

                      </div>
                    </div>
                  </div>
                  {/* /.box-body */}
                  <div className="box-footer">
                    <button
                      type="button"
                      onClick={this.handleCancel}
                      className="btn btn-default"
                    >
                      Cancel
                    </button>
                    <button type="submit" className="btn btn-info pull-right">
                      Save
                    </button>
                  </div>
                  {/* /.box-footer */}
                </form>
              </div>
            </div>
          </div>
        </section>
      </Fragment>
    );
  }
}

ProductEdit.propTypes = {
  getAllCategories: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    auth: state.auth,
    category: state.category,
  };
};
export default connect(mapStateToProps, { showNoti, getAllCategories })(ProductEdit);
