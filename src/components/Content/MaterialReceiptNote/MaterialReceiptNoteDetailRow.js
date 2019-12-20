import React, { Component } from "react";

class MaterialReceiptNoteDetailRow extends Component {
  render() {
    const { detail, index } = this.props;
    const { idMaterial, quantity } = detail;
    return (
      <tr>
        <td>{index + 1}</td>
        <td>{idMaterial.name}</td>
        <td>{quantity}</td>
      </tr>
    );
  }
}

export default MaterialReceiptNoteDetailRow;
