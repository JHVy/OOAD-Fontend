import React, { Fragment, Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { showNoti } from "../../../actions/notificationActions";

class MaterialEdit extends Component {
  state = {
    name: "",
    quantity: 0,
    _id: ""
  };
  componentDidMount() {
    const { id } = this.props.match.params;


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
  handleSubmit = e => {
    const { _id, name, quantity } = this.state;
    e.preventDefault();

    const newMaterial = {
      name,
      quantity,
      _id
    };

    axios
      .put(`${process.env.REACT_APP_BACKEND_HOST}/api/material/${_id}`, newMaterial,
        this.tokenConfig(this.props.auth.token))

      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.log(error.response);
      });

    //Quay về trang chính
    this.props.history.push("/material");
  };

  handleCancel = e => {
    this.props.history.push("/material");
  };
  render() {
    const { name, quantity, _id } = this.state;
    console.log(quantity);

    return (
      <Fragment>
        {/* Content Header (Page header) */}
        <section className="content-header">
          <h1>
            Material
            {/* <small>Preview</small> */}
          </h1>
          <ol className="breadcrumb">
            <li>
              <Link to="/home">
                <i className="fa fa-dashboard" /> Home
              </Link>
            </li>
            <li>
              <Link to="/material">Material</Link>
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
                  <h3 className="box-title">Material Edit Form</h3>
                </div>
                {/* /.box-header */}
                {/* form start */}
                <form className="form-horizontal" onSubmit={this.handleSubmit}>
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
                              <th style={{ width: "20%" }}>Supplier</th>
                              <th style={{ width: "15%" }}>User</th>
                              <th style={{ width: "15%" }}>Created date</th>
                            </tr>
                          </thead>
                          <tbody>
                            {/* {materialReceiptNotes.map((el, index) => (
                              <MaterialReceiptNoteDetRow
                                onHandler={this.handler}
                                history={this.props.history}
                                key={el._id}
                                det={el}
                                index={index}
                                isLoaded={isLoaded}

                              />
                            ))} */}
                          </tbody>
                          <tfoot>
                            <tr>
                              <th>#</th>
                              <th>Supplier</th>
                              <th>User</th>
                              <th>Created date</th>
                            </tr>
                          </tfoot>
                        </table>
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

const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};
export default connect(mapStateToProps, { showNoti })(MaterialEdit);
