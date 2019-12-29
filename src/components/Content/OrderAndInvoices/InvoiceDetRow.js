import React, { Component } from "react";
import { connect } from "react-redux";

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


  render() {
    const { det, index } = this.props;
    console.log(det);

    return (
      <tr>
        <td>{index + 1}</td>
        <td>{det.idProduct.name}</td>
        <td>{det.price}</td>
        <td>{det.quantity}</td>
      </tr>
    );
  }
}

export default connect(
  mapStateToProps,
  {}
)(InvoiceRow);
