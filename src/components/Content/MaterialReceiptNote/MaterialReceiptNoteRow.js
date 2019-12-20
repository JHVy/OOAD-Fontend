import React, { Component } from "react";
import { connect } from "react-redux";
import { deleteMaterialReceiptNote } from "../../../actions/materialReceiptNoteActions";

class MaterialReceiptNoteRow extends Component {
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
    this.props.history.push(`/materialReceiptNote/details/${id}`);
  };
  handleDelete = id => {
    this.props.deleteMember(id);
  };

  render() {
    const { materialReceiptNote, index } = this.props;
    const { idSupplier, idUser, createddate, _id } = materialReceiptNote;
    const { name } = idSupplier;
    const { fullName } = idUser;

    return (
      <tr>
        <td>{index + 1}</td>
        <td>{name}</td>
        <td>{fullName}</td>
        <td>{this.convertDate(createddate)}</td>
        <td>
          <div className="btn-group">
            <button
              onClick={() => this.handleEdit(_id)}
              type="button"
              className="btn btn-success"
            >
              See details
            </button>

            <button
              onClick={() => this.handleDelete(_id)}
              type="button"
              className="btn btn-danger"
            >
              Delete
            </button>
          </div>
        </td>
      </tr>
    );
  }
}

export default connect(null, { deleteMaterialReceiptNote })(
  MaterialReceiptNoteRow
);
