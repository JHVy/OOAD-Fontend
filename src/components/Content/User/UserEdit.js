import React, { Fragment, Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { updateUser } from "../../../actions/userActions";
import { pushHistory } from "../../../actions/historyActions";
import { Link } from "react-router-dom";
import UserChangePassModal from "./UserChangePassModal";
import Select from "react-select";
const mapStateToProps = state => ({
  history: state.history.history,
  auth: state.auth
});
class UserEdit extends Component {
  state = {
    idRole: "",
    nameRole: "",
    username: "",
    fullName: "",
    phoneNumber: "",
    address: "",
    _id: "",
    inputErrors: false,

    options: []
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
    axios
      .get(
        `${process.env.REACT_APP_BACKEND_HOST}/api/role/getall/role`,
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
    axios
      .get(
        `${process.env.REACT_APP_BACKEND_HOST}/api/user/${id}`,
        this.tokenConfig(this.props.auth.token)
      )
      .then(response => {
        if (response.data === null) this.props.pushHistory("/404");
        else {
          const {
            idRole,
            username,
            fullName,
            phoneNumber,
            address,
            _id
          } = response.data;
          this.setState({
            idRole: idRole._id,
            nameRole: idRole.name,
            username,
            fullName,
            phoneNumber,
            address,
            _id
          });
        }
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
      idRole,
      username,
      fullName,
      phoneNumber,
      address,
      _id
    } = this.state;
    const user = {
      idRole,
      username,
      fullName,
      phoneNumber,
      address,
      _id
    };

    e.preventDefault();
    this.props.updateUser(user);
    //Quay về trang chính
    this.props.history.push("/user");
  };

  handleCancel = e => {
    this.props.history.push("/user");
  };

  handleSelectChange = event => {
    // let index = event.nativeEvent.target.selectedIndex;
    this.setState({
      idRole: event.value,
      nameRole: event.label
    });
  };

  render() {
    const {
      idRole,
      nameRole,
      username,
      fullName,
      phoneNumber,
      address,
      _id,
      options
    } = this.state;

    return (
      <Fragment>
        {/* Content Header (Page header) */}
        <section className="content-header">
          <h1>
            User
            {/* <small>Preview</small> */}
          </h1>
          <ol className="breadcrumb">
            <li>
              <Link to="/home">
                <i className="fa fa-dashboard" /> Home
              </Link>
            </li>
            <li>
              <Link to="/user">User</Link>
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
                  <h3 className="box-title">User Edit Form</h3>
                </div>
                {/* /.box-header */}
                {/* form start */}
                <form className="form-horizontal" onSubmit={this.handleSubmit}>
                  <div className="box-body">
                    <div className="form-group">
                      <label className="col-sm-2 control-label">ID</label>
                      <div className="col-sm-10">
                        <input
                          name="_id"
                          type="text"
                          id="userID"
                          placeholder="Loading..."
                          className="form-control"
                          defaultValue={_id}
                          disabled
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <label className="col-sm-2 control-label">Role</label>
                      <div className="col-sm-10">
                        <Select
                          name="idCategory"
                          onChange={this.handleSelectChange}
                          isSearchable={true}
                          options={options}
                          value={{
                            value: idRole,
                            label: nameRole
                          }}
                        ></Select>
                      </div>
                    </div>

                    <div className="form-group">
                      <label className="col-sm-2 control-label">Username</label>
                      <div className="col-sm-10">
                        <input
                          name="username"
                          type="text"
                          className="form-control"
                          id="userUsername"
                          placeholder="Loading..."
                          value={username}
                          onChange={this.handleChange}
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <label className="col-sm-2 control-label">
                        Full Name
                      </label>
                      <div className="col-sm-10">
                        <input
                          name="fullName"
                          type="text"
                          className="form-control"
                          id="userFullName"
                          placeholder="Loading..."
                          value={fullName}
                          onChange={this.handleChange}
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <label className="col-sm-2 control-label">
                        Phone Number
                      </label>
                      <div className="col-sm-10">
                        <input
                          name="phoneNumber"
                          type="text"
                          className="form-control"
                          id="userPhoneNumber"
                          placeholder="Loading..."
                          value={phoneNumber}
                          onChange={this.handleChange}
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <label className="col-sm-2 control-label">Address</label>
                      <div className="col-sm-10">
                        <input
                          name="address"
                          type="text"
                          className="form-control"
                          id="userAddress"
                          placeholder="Loading..."
                          value={address}
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

                    <button
                      type="submit"
                      className="btn btn-primary pull-right"
                    >
                      Save
                    </button>
                    <UserChangePassModal _id={_id} username={username} />
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
export default connect(mapStateToProps, { updateUser, pushHistory })(UserEdit);
