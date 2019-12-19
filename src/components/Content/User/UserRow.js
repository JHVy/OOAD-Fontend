import React, { Component } from "react";
import { connect } from "react-redux";
import { deleteUser } from "../../../actions/userActions";
import { pushHistory } from "../../../actions/historyActions";
class UserRow extends Component {
  handleEdit = id => {
    this.props.pushHistory(`/user/edit/${id}`);
  };
  handleDelete = id => {
    // console.log(id);

    this.props.deleteUser(id);
  };
  render() {
    const { user, index } = this.props;
    const { idRole, username, phoneNumber, address, _id } = user;
    return (
      <tr>
        <td>{index + 1}</td>
        <td>{idRole.name}</td>
        <td>{user.username}</td>
        <td>{user.phoneNumber}</td>
        {/* <td>{user.address}</td> */}
        <td>
          <div className="btn-group">
            <button
              onClick={() => this.handleEdit(_id)}
              type="button"
              className="btn btn-success"
            >
              Edit
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

export default connect(null, { deleteUser, pushHistory })(UserRow);
