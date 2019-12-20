import React, { Component } from "react";

import { connect } from "react-redux";
import { deleteInvoice, updateInvoice } from "../../../actions/invoiceActions";

const mapStateToProps = state => ({
  invoice: state.invoice
});

class InvoiceRow extends Component {

  convertDate = date => {
    const newDate = new Date(date);
    let year = newDate.getFullYear();
    let month = newDate.getMonth() + 1;
    let dt = newDate.getDate();

    dt = dt < 10 ? `0${dt}` : dt;

    month = month < 10 ? `0${month}` : month;
    // if (month < 10) {
    //   month = "0" + month;
    // }

    return year + "-" + month + "-" + dt;
  };
  handleEdit = id => {
    this.props.history.push(`/invoice/detail/${id}`);
  };

  handleInactive = id => {
    let Invoice = this.props;
    const newInvoice = {
      _id: Invoice._id,
      status: 0
    }
    this.props.updateInvoice(newInvoice);
  };

  render() {
    const { Invoice, index } = this.props;

    return (
      <tr>
        <td>{index + 1}</td>
        <td>{Invoice.idUser.username}</td>
        <td>{Invoice.idMember.name}</td>
        <td>{Invoice.totalAmt}</td>
        <td>{this.convertDate(Invoice.createddate)}</td>
        <td>{Invoice.comments}</td>
        <td>
          <div className="btn-group">
            <button
              onClick={() => this.handleEdit(Invoice._id)}
              type="button"
              className="btn btn-success"
            >
              See Details
            </button>

            <button
              onClick={() => this.handleInactive(Invoice._id)}
              type="button"
              className="btn btn-danger"
              disabled={Invoice.status}
            >
              Inactive
            </button>
          </div>
        </td>
      </tr>
    );
  }
}

export default connect(
  mapStateToProps,
  { deleteInvoice, updateInvoice }
)(InvoiceRow);
