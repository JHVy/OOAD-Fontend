import React, { Component } from "react";

import { connect } from "react-redux";
import { deleteProduct } from "../../../actions/productActions";

class ProductRow extends Component {
  convertDate = date => {
    const newDate = new Date(date);
    let year = newDate.getFullYear();
    let month = newDate.getMonth() + 1;
    let dt = newDate.getDate();

    dt = dt < 10 ? `0${dt}` : dt;
    month = month < 10 ? `0${month}` : month;

    return year + "-" + month + "-" + dt;
  };
  handleEdit = id => {
    this.props.history.push(`/product/edit/${id}`);
  };
  handleDelete = id => {
    this.props.deleteProduct(id);
  };

  render() {
    const { product, index } = this.props;

    return (
      <tr>
        <td>{index + 1}</td>
        <td>{product.name}</td>
        <td>{product.idCategory}</td>
        <td>{product.price}</td>
        {product.status === 1 ? (<td>Available</td>) : (<td>Inactive</td>)}
        <td>
          <div className="btn-group">
            <button
              onClick={() => this.handleEdit(product._id)}
              type="button"
              className="btn btn-success"
            >
              Edit
            </button>

            <button
              onClick={() => this.handleDelete(product._id)}
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

export default connect(null, { deleteProduct })(ProductRow);
