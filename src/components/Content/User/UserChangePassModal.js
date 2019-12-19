import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

import PropTypes from "prop-types";

import Axios from "axios";
const initialState = {
  currentPassword: "",
  newPassword: "",
  newPassword2: "",
  msg: "",
  goodMsg: "",
  inputErrors: false
};
const mapStateToProps = state => ({
  auth: state.auth
});
class UserChangePassModal extends Component {
  state = initialState;

  handleChange = e => {
    const { name, value } = e.target;
    let msg = "";
    let isPassed = false;
    let inputErrors = true;

    isPassed = this.validatePassword(value);
    if (!isPassed) msg = "Password must contain only letters and numbers";
    // if (name === "newPassword2" && newPassword !== "") {
    //   isPassed1 = this.comparePassword();
    //   if (!isPassed1)
    //     msg = "Your password and confirmation password do not match.";
    // }

    // if (name === "newPassword" && newPassword2 !== "") {
    //   isPassed2 = this.comparePassword();
    //   if (!isPassed2)
    //     msg = "Your password and confirmation password do not match.";
    // }
    // inputErrors = isPassed1 ? false : true;
    // inputErrors = isPassed2 ? false : true;

    inputErrors = isPassed ? false : true;
    this.setState({ [name]: value, msg, inputErrors });
  };

  validatePassword(password) {
    return new RegExp(/^[a-zA-Z0-9]+$/).test(password);
  }

  comparePassword(newPassword, newPassword2) {
    if (newPassword === newPassword2) return true;
    return false;
  }

  handleSubmit = e => {
    const { currentPassword, newPassword, newPassword2 } = this.state;

    const { _id, username } = this.props;
    const { token } = this.props.auth;
    e.preventDefault();
    if (!this.comparePassword(newPassword, newPassword2))
      return this.setState({
        msg: "Your password and confirmation password do not match.",
        inputErrors: true
      });

    const userChangePass = {
      username,
      currentPassword,
      newPassword
    };

    Axios.put(
      `${process.env.REACT_APP_BACKEND_HOST}/api/user/cp/${_id}`,
      userChangePass,
      this.tokenConfig(token)
    )
      .then(response => {
        if (response.status === 225) {
          this.setState({ msg: response.data.msg, inputErrors: true });
        } else {
          this.setState({ ...initialState });
          this.setState({
            msg: "Password has been changed successfully!",
            inputErrors: false
          });
        }
        // console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
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

  onCancel = e => {
    this.setState({ ...initialState });
  };
  render() {
    const { _id, username } = this.props;
    const {
      currentPassword,
      newPassword,
      newPassword2,
      inputErrors,
      msg,
      goodMsg
    } = this.state;
    return (
      <Fragment>
        <button
          type="button"
          id="triggerChangePassButton"
          style={{ float: "right", marginRight: "10px" }}
          className="btn btn-info"
          data-toggle="modal"
          data-target="#exampleModalCenter"
          onClick={this.handleOnClick}
        >
          Change Password
        </button>

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
                    Change Password
                  </h3>
                </span>
                <span>
                  <button
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close"
                    onClick={this.onCancel}
                  >
                    <span aria-hidden="true">×</span>
                  </button>
                </span>
              </div>
              <div className="modal-body" style={{ padding: "30px" }}>
                <div className="form-group">
                  {msg ? (
                    <div
                      className={
                        inputErrors
                          ? "alert alert-danger alert-dismissible"
                          : "alert alert-success alert-dismissible"
                      }
                    >
                      {msg}
                    </div>
                  ) : null}

                  <label className="col-form-label">ID:</label>
                  <input
                    name="_id"
                    type="text"
                    id="userIDModal"
                    placeholder="Loading..."
                    className="form-control"
                    value={_id}
                    disabled
                  />
                  <label className="col-form-label">Username:</label>
                  <input
                    name="username"
                    type="text"
                    id="userUsernameModal"
                    placeholder="Loading..."
                    className="form-control"
                    value={username}
                    disabled
                  />
                  <label className="col-form-label">Current Password:</label>
                  <input
                    type="password"
                    className="form-control"
                    id="currentPassword"
                    placeholder="Enter your password"
                    name="currentPassword"
                    value={currentPassword}
                    onChange={this.handleChange}
                  />

                  <label className="col-form-label">New Password:</label>
                  <input
                    type="password"
                    className="form-control"
                    id="newPassword"
                    placeholder="Enter your new password"
                    value={newPassword}
                    name="newPassword"
                    onChange={this.handleChange}
                  />
                  <label className="col-form-label">
                    Confirmation Password:
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="newPassword2"
                    placeholder="Re-enter your new password"
                    value={newPassword2}
                    name="newPassword2"
                    onChange={this.handleChange}
                  />
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
                  type="button"
                  onClick={this.handleSubmit}
                  className="btn btn-primary"
                  disabled={
                    !inputErrors &&
                    newPassword !== "" &&
                    currentPassword !== "" &&
                    newPassword2 !== ""
                      ? false
                      : true
                  }
                  //data-dismiss="modal"
                >
                  Change
                </button>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default connect(mapStateToProps, null)(UserChangePassModal);
