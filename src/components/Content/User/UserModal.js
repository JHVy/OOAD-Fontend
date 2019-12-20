import React, { Component, Fragment } from "react";

import { connect } from "react-redux";
import { addUser } from "../../../actions/userActions";

import mongoose from "mongoose";
import Select from "react-select";
import PropTypes from "prop-types";
import Axios from "axios";
import Loader from "react-loader";
const mapStateToProps = state => ({
  error: state.error,
  auth: state.auth
});

class UserModal extends Component {
  state = {
    idRole: null,
    nameRole: "",
    username: "",
    fullName: "",
    phoneNumber: "",
    address: "",
    msg: null,
    inputErrors: false,
    options: []
  };
  handleSelectChange = event => {
    console.log(event);

    this.setState({
      idRole: event.value,
      nameRole: event.label
    });
  };

  componentDidMount() {
    Axios.get(
      `${process.env.REACT_APP_BACKEND_HOST}/api/role/getall/role`,
      this.tokenConfig(this.props.auth.token)
    )
      .then(response => {
        let tempArr = [];

        response.data.map(eachRes => {
          tempArr.push({ label: eachRes.name, value: eachRes._id });
        });
        this.setState({ options: tempArr });
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

  componentDidUpdate(prevProps) {
    const { error } = this.props;
    if (error !== prevProps.error) {
      // Check for register error
      if (error.id === "ADD_USER_FAIL") {
        this.setState({ msg: error.msg.msg });

        document.getElementById("triggerButton").click();
      } else {
        this.setState({ msg: null });
      }
    }
  }

  static propTypes = {
    error: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
  };
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    const {
      idRole,
      username,
      fullName,
      phoneNumber,
      address,
      nameRole
    } = this.state;
    const newItem = {
      _id: mongoose.Types.ObjectId(),
      idRole: {
        _id: idRole,
        name: nameRole
      },
      username,
      fullName,
      phoneNumber,
      address
    };
    console.log(newItem);

    this.props.addUser(newItem);

    // Close modal
    document.getElementById("triggerButton").click();

    //Toggle

    // this.props.toggle();
  };
  handleOnClick = () => {
    // window.location.replace("/category?page=0&id=2");
    // window.history.pushState("haha", null, "/category/edit");
  };
  render() {
    const {
      idRole,
      username,
      fullName,
      phoneNumber,
      address,
      options
    } = this.state;
    return (
      <Fragment>
        {options.length <= 0 ? (
          <Loader></Loader>
        ) : (
          <Fragment>
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
              Add new user
            </button>
            {/* Modal */}
            <div
              className="modal fade"
              id="exampleModalCenter"
              tabIndex={-1}
              role="dialog"
              aria-labelledby="exampleModalCenterTitle"
              aria-hidden="true"
            >
              <div
                className="modal-dialog modal-dialog-centered"
                role="document"
              >
                <div className="modal-content">
                  <div className="modal-header">
                    <span>
                      <h3 className="modal-title" id="exampleModalLongTitle">
                        Add new user
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
                    <div className="form-group">
                      {this.state.msg ? (
                        <div className="alert alert-danger alert-dismissible">
                          {/* <button
                  type="button"
                  className="close"
                  data-dismiss="alert"
                  aria-hidden="true"
                >
                  ×
                </button> */}

                          {this.state.msg}
                        </div>
                      ) : null}
                      <label htmlFor="user-username" className="col-form-label">
                        Username:
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="userame"
                        placeholder="Add username"
                        name="username"
                        onChange={this.onChange}
                        value={username}
                      />

                      <label htmlFor="user-fullName" className="col-form-label">
                        Fullname:
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="userFullname"
                        placeholder="Add fullname"
                        name="fullName"
                        onChange={this.onChange}
                        value={fullName}
                      />
                      <div className="form-group">
                        <label>Role</label>
                        <Select
                          onChange={this.handleSelectChange}
                          isSearchable={true}
                          options={options}
                          placeholder="Please choose role"
                        ></Select>
                        {/* <select
                          value={idRole}
                          onChange={this.handleSelectChange}
                          className="form-control"
                        >
                          {options.map(eachOption => (
                            <option key={eachOption._id} value={eachOption._id}>
                              {eachOption.name}
                            </option>
                          ))}
                          <option value="" hidden>
                            Please choose role
                          </option>
                        </select> */}
                      </div>

                      <label
                        htmlFor="user-phoneNumber"
                        className="col-form-label"
                      >
                        Phone number:
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="userPhoneNumber"
                        placeholder="Add phone number"
                        name="phoneNumber"
                        onChange={this.onChange}
                        value={phoneNumber}
                      />
                      <label htmlFor="user-address" className="col-form-label">
                        Address:
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="userAddress"
                        placeholder="Add address"
                        name="address"
                        onChange={this.onChange}
                        value={address}
                      />
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      data-dismiss="modal"
                    >
                      Close
                    </button>
                    <button
                      type="button"
                      onClick={this.onSubmit}
                      className="btn btn-primary"
                    >
                      Add user
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Fragment>
        )}
      </Fragment>
    );
  }
}

export default connect(mapStateToProps, { addUser })(UserModal);
