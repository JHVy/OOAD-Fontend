import React, { Fragment, Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { showNoti } from "../../../actions/notificationActions";
import "react-notifications/lib/notifications.css";
import {
  NotificationContainer,
  NotificationManager
} from "react-notifications";
import { Link } from "react-router-dom";
import Select from "react-select";

class PaySlipEdit extends Component {
  state = {
    idUser: "",
    fullnameUser: "",
    idSupplier: "",
    nameSupplier: "",
    comment: "",
    createddate: new Date(),
    totalAmt: 0,
    _id: "",
    notiType: ""
  };

  createNotification = () => {
    const { notiType } = this.state;
    this.props.showNoti(notiType);
    this.setState({ notiType: "" });
  };

  onChangeSelectedCate = idCategory => {
    this.setState({
      idSupplier: idCategory.value,
      nameSupplier: idCategory.label
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
  componentDidMount() {
    const { id } = this.props.match.params;
    const { token } = this.props.auth;
    axios
      .get(
        `${process.env.REACT_APP_BACKEND_HOST}/api/payslip/${id}`,
        this.tokenConfig(token)
      )
      .then(response => {
        const { data } = response;
        const {
          idUser,
          idSupplier,
          createddate,
          totalAmt,
          comment,
          _id
        } = data;
        if (response.data === null) this.props.history.push("/404");
        else
          this.setState({
            idUser: idUser._id,
            fullnameUser: idUser.fullName,
            idSupplier: idSupplier._id,
            nameSupplier: idSupplier.name,
            createddate,
            totalAmt,
            _id,
            comment
          });
      })
      .catch(error => {
        console.log(error.response);
      });
  }
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  handleSubmit = e => {
    const {
      _id,
      idUser,
      idSupplier,
      comment,
      createddate,
      totalAmt
    } = this.state;
    const { token } = this.props.auth;
    e.preventDefault();
    let notiType = "";
    const newPaySlip = {
      idUser,
      idSupplier,
      createddate,
      comment,
      totalAmt,
      _id
    };

    axios
      .put(
        `${process.env.REACT_APP_BACKEND_HOST}/api/payslip/${_id}`,
        newPaySlip,
        this.tokenConfig(token)
      )

      .then(response => {
        if (response.status === 200) {
          this.setState({ notiType: "success" });

          setTimeout(
            function() {
              //Start the timer
              window.location.replace("/payslip");
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
  };

  handleCancel = e => {
    this.props.history.push("/payslip");
  };
  render() {
    const { _id, fullnameUser, nameSupplier, totalAmt, comment } = this.state;

    return (
      <Fragment>
        {this.state.notiType !== "" ? this.createNotification() : null}
        <NotificationContainer />

        {/* Content Header (Page header) */}
        <section className="content-header">
          <h1>
            Pay Slip
            {/* <small>Preview</small> */}
          </h1>
          <ol className="breadcrumb">
            <li>
              <Link to="/home">
                <i className="fa fa-dashboard" /> Home
              </Link>
            </li>
            <li>
              <Link to="/payslip">Payslip</Link>
            </li>
            <li className="active">Edit</li>
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
                  <div className="box-body">
                    <div className="form-group">
                      <label
                        htmlFor="inputPassword3"
                        className="col-sm-2 control-label"
                      >
                        ID
                      </label>
                      <div className="col-sm-10">
                        <input
                          name="_id"
                          type="text"
                          className="form-control"
                          id="inputId"
                          placeholder="Loading..."
                          value={_id}
                          disabled
                          readOnly
                          // onChange={this.handleChange}
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <label
                        htmlFor="inputEmail3"
                        className="col-sm-2 control-label"
                      >
                        User
                      </label>
                      <div className="col-sm-10">
                        <input
                          name="idUser"
                          type="text"
                          id="inputMember"
                          placeholder="Loading..."
                          className="form-control"
                          defaultValue={fullnameUser}
                          disabled
                          readOnly
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label
                        htmlFor="inputPassword3"
                        className="col-sm-2 control-label"
                      >
                        Supplier
                      </label>
                      <div className="col-sm-10">
                        <input
                          name="idSupplier"
                          type="text"
                          className="form-control"
                          id="inputSupplier"
                          placeholder="Loading..."
                          defaultValue={nameSupplier}
                          readOnly
                          disabled
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label
                        htmlFor="inputCreateddate"
                        className="col-sm-2 control-label"
                      >
                        Total Amount
                      </label>
                      <div className="col-sm-10">
                        <input
                          name="totalAmt"
                          type="text"
                          className="form-control"
                          id="inputTotalAmt"
                          placeholder="Loading..."
                          value={totalAmt}
                          disabled
                          readOnly
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label
                        htmlFor="inputCreateddate"
                        className="col-sm-2 control-label"
                      >
                        Comment:
                      </label>
                      <div className="col-sm-10">
                        <textarea
                          name="comment"
                          type="text"
                          className="form-control"
                          id="inputTotalAmt"
                          placeholder="Loading..."
                          value={comment}
                          onChange={this.handleChange}
                        />
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

const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(mapStateToProps, { showNoti })(PaySlipEdit);
