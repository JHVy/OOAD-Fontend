import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addPaySlip } from "../../../actions/payslipActions";
import { showNoti } from "../../../actions/notificationActions";

// import "react-notifications/lib/notifications.css";
import Select from "react-select";
import {
  NotificationContainer,
  NotificationManager
} from "react-notifications";
import Axios from "axios";

const mongoose = require("mongoose");

class PaySlipModal extends Component {
  state = {
    _id: "",

    idSupplier: "",

    createddate: new Date(),
    totalAmt: 0,
    notiType: "",
    msg: "",
    options: [],
    comment: ""
  };
  componentDidMount() {
    Axios.get(
      `${process.env.REACT_APP_BACKEND_HOST}/api/supplier/getall/supply`,
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
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.payslip.payslips !== this.props.payslip.payslips) {
      if (this.props.isLoaded === false) {
        return;
      }

      if (
        this.props.payslip.type === "DELETE_PAYSLIP" ||
        this.props.payslip.type === "GET_PAYSLIPS"
      ) {
        return;
      }

      if (this.props.payslip.response === 200) {
        this.setState({ notiType: "success" });
      } else {
        this.setState({ notiType: "failure" });
      }
    }
  }

  createNotification = () => {
    const { notiType } = this.state;
    this.props.showNoti(notiType);
    this.setState({ notiType: "" });
  };

  onChange = e => {
    //this.setState({ [e.target.name]: e.target.value });
    const { name, value } = e.target;
    let msg = "";

    //Validation
    if (name === "totalAmt") {
      const isPassed = this.validateTotalAmt(value);
      if (!isPassed) {
        msg = "Total Amount can only contain numbers";
      }
    }
    //const inputErrors = isPassed ? false : true;

    this.setState({ [name]: value, msg });
  };

  validateTotalAmt = totalAmt => {
    return new RegExp(/^[0-9]*$/).test(totalAmt);
  };

  onSubmit = e => {
    e.preventDefault();
    const { totalAmt, idSupplier, nameSupplier, comment } = this.state;
    const { user } = this.props.auth;
    const { _id, username } = user;
    const newItem = {
      _id: mongoose.Types.ObjectId(),
      idUser: { _id, username },
      idSupplier: {
        _id: idSupplier,
        name: nameSupplier
      },
      comment,
      createddate: new Date(),
      totalAmt
    };
    console.log(newItem);

    this.props.addPaySlip(newItem);
    // Close modal
    document.getElementById("triggerButton").click();
  };
  onChangeSelectSupplier = event => {
    this.setState({
      idSupplier: event.value,
      nameSupplier: event.label
    });
  };
  render() {
    const { notiType, msg, options, comment } = this.state;
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
        >
          Add new pay slip
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
                      Add new Pay slip
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
                  {msg != "" ? (
                    <div className="alert alert-danger alert-dismissible">
                      {msg}
                    </div>
                  ) : null}
                  <div className="form-group">
                    <label htmlFor="recipient-name" className="col-form-label">
                      User:
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="username"
                      placeholder="Add payslip"
                      name="username"
                      disabled
                      readOnly
                      value={this.props.auth.user.fullName}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="recipient-name" className="col-form-label">
                      Supplier:
                    </label>
                    <Select
                      onMenuOpen={this.onListMemberClick}
                      onChange={this.onChangeSelectSupplier}
                      isSearchable={true}
                      options={options}
                    ></Select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="recipient-name" className="col-form-label">
                      Total Amount:
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="totalAmt"
                      placeholder="Add total amount"
                      name="totalAmt"
                      onChange={this.onChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label
                      htmlFor="inputCreateddate"
                      className="col-form-label"
                    >
                      Comment:
                    </label>
                    <textarea
                      name="comment"
                      type="text"
                      className="form-control"
                      id="inputTotalAmt"
                      placeholder="Loading..."
                      value={comment}
                      onChange={this.onChange}
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
                  <button type="submit" className="btn btn-primary">
                    Add pay slip
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
PaySlipModal.propTypes = {
  auth: PropTypes.object.isRequired,
  payslip: PropTypes.object.isRequired,
  isLoaded: PropTypes.bool.isRequired,
  addPaySlip: PropTypes.func.isRequired,
  showNoti: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  payslip: state.payslip,
  isLoaded: state.member.isLoaded,
  auth: state.auth
});
export default connect(mapStateToProps, {
  addPaySlip,
  showNoti
})(PaySlipModal);
