import React, { Fragment, Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { showNoti } from "../../../actions/notificationActions";
import 'react-notifications/lib/notifications.css';
import InvoiceDetRow from "./InvoiceDetRow";
import { NotificationContainer, NotificationManager } from 'react-notifications';

class InvoiceEdit extends Component {
  state = {
    idMember: "",
    idUser: "",
    totalAmt: 0,
    createddate: new Date(),
    comments: "",
    _id: "",
    notiType: "",
    invoicedets: [],
  };

  componentDidMount() {
    const { id } = this.props.match.params;
    axios
      .get(
        `${process.env.REACT_APP_BACKEND_HOST}/api/invoicedet/getByInvoiceId/${id}`,
        this.tokenConfig(this.props.auth.token)
      )
      .then(response => {
        if (response.data === null) this.props.history.push("/404");
        // const { invoicedets } = response.data;
        console.log(response.data)
        this.setState({
          invoicedets: response.data
        });

      })
      .catch(er => console.log(er.response));
    //this.props.getByInvoiceId(id);

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
    this.setState({ [e.target.name]: e.target.value });
  };

  handleCancel = e => {
    this.props.history.push("/invoice");
  };

  createNotification = () => {
    const { notiType } = this.state;
    this.props.showNoti(notiType);
    this.setState({ notiType: '' });

  };

  render() {
    const { _id, idMember, idUser, totalAmt, createddate, comments, invoicedets } = this.state;
    return (
      <Fragment>
        {this.state.notiType !== "" ? (
          this.createNotification()
        ) : null}
        <NotificationContainer />

        {/* Content Header (Page header) */}
        <section className="content-header">
          <h1>
            Invoice
            {/* <small>Preview</small> */}
          </h1>
          <ol className="breadcrumb">
            <li>
              <a href="fake_url">
                <i className="fa fa-dashboard" /> Home
              </a>
            </li>
            <li>
              <a href="fake_url">Invoice</a>
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
                <form className="form-horizontal">
                  <div className="box-body">
                    <div className="row">
                      <div className="col-sm-12">
                        <table
                          id="example1"
                          className="table table-bordered table-striped"
                        >
                          <thead>
                            <tr>
                              <th style={{ width: "5%" }}>#</th>
                              <th style={{ width: "15%" }}>Product</th>
                              <th style={{ width: "15%" }}>Price</th>
                              <th style={{ width: "10%" }}>Quantity</th>
                              <th style={{ width: "5%" }}>Discount</th>
                            </tr>
                          </thead>
                          <tbody>
                            {this.state.invoicedets.map((el, index) => (
                              <InvoiceDetRow
                                key={el._id}
                                det={el}
                                index={index}
                              />
                            ))}
                          </tbody>
                          <tfoot>
                            <tr>
                              <th>#</th>
                              <th>Product</th>
                              <th>Price</th>
                              <th>Quantity</th>
                              <th>Discount</th>
                            </tr>
                          </tfoot>
                        </table>
                      </div>
                    </div>
                  </div>
                  {/* /.box-body */}
                  <div className="box-footer">
                    <button
                      id="btncancel"
                      type="button"
                      onClick={this.handleCancel}
                      className="btn btn-default"
                    >
                      Cancel
                    </button>
                    {/* <button id="btnsave" type="submit" className="btn btn-info pull-right">
                      Save
                    </button> */}
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
export default connect(
  mapStateToProps, { showNoti }
)(InvoiceEdit);


