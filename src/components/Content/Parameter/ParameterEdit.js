import React, { Fragment, Component } from "react";

import { connect } from "react-redux";
import { pushHistory } from "../../../actions/historyActions";
import Loader from "react-loader";
import axios from "axios";
import { updateParameter } from "../../../actions/parameterActions";
import { Link } from "react-router-dom";

class ParameterEdit extends Component {
  state = {
    maxPoint: "",
    systemDiscount: "",
    memberPointDiscount: "",
    _id: ""
  };
  componentDidMount() {
    const { id } = this.props.match.params;
    axios
      .get(
        `${process.env.REACT_APP_BACKEND_HOST}/api/parameter/${id}`,
        this.tokenConfig(this.props.auth.token)
      )
      .then(response => {
        this.setState({
          maxPoint: response.data.maxPoint,
          systemDiscount: response.data.systemDiscount,
          memberPointDiscount: response.data.memberPointDiscount,
          _id: response.data._id
        });
      })
      .catch(er => console.log(er.response));
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
    const {
      maxPoint,
      systemDiscount,
      memberPointDiscount,
      _id
    } = this.state;
    e.preventDefault();

    const newParameter = {
      maxPoint,
      systemDiscount,
      memberPointDiscount,
      _id
    };
    this.props.updateParameter(newParameter);
    //Quay về trang chính
    this.props.history.push("/parameter");
  };

  handleCancel = e => {
    this.props.history.push("/parameter");
  };
  render() {
    const { maxPoint, systemDiscount, memberPointDiscount, _id } = this.state;

    return (
      <Fragment>
        {!_id ? (
          <Loader></Loader>
        ) : (
            <Fragment>
              {/* Content Header (Page header) */}
              <section className="content-header">
                <h1>
                  Parameter
                {/* <small>Preview</small> */}
                </h1>
                <ol className="breadcrumb">
                  <li>
                    <Link to="/home">
                      <i className="fa fa-dashboard" /> Home
                  </Link>
                  </li>
                  <li>
                    <Link to="/parameter">Parameter</Link>
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
                        <h3 className="box-title">Edit parameter</h3>
                      </div>
                      {/* /.box-header */}
                      {/* form start */}
                      <form
                        className="form-horizontal"
                        onSubmit={this.handleSubmit}
                      >
                        <div className="box-body">
                          <div className="form-group">
                            <label
                              htmlFor="inputEmail3"
                              className="col-sm-2 control-label"
                            >
                              ID
                          </label>
                            <div className="col-sm-10">
                              <input
                                name="_id"
                                type="text"
                                id="inputEmail3"
                                placeholder="Loading..."
                                className="form-control"
                                value={_id}
                                disabled
                                onChange={this.handleChange}
                              />
                            </div>
                          </div>
                          <div className="form-group">
                            <label
                              htmlFor="inputPassword3"
                              className="col-sm-2 control-label"
                            >
                              Max Point
                          </label>
                            <div className="col-sm-10">
                              <input
                                name="maxPoint"
                                type="text"
                                className="form-control"
                                id="inputName"
                                placeholder="Loading..."
                                value={maxPoint}
                                onChange={this.handleChange}
                              />
                            </div>
                          </div>
                          <div className="form-group">
                            <label
                              htmlFor="inputPassword3"
                              className="col-sm-2 control-label"
                            >
                              System Discount
                          </label>
                            <div className="col-sm-10">
                              <input
                                name="systemDiscount"
                                type="text"
                                className="form-control"
                                id="inputName"
                                placeholder="Loading..."
                                value={systemDiscount}
                                onChange={this.handleChange}
                              />
                            </div>
                          </div>
                          <div className="form-group">
                            <label
                              htmlFor="inputPassword3"
                              className="col-sm-2 control-label"
                            >
                              Member Discount
                          </label>
                            <div className="col-sm-10">
                              <input
                                name="memberPointDiscount"
                                type="text"
                                className="form-control"
                                id="inputName"
                                placeholder="Loading..."
                                value={memberPointDiscount}
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
                            className="btn btn-info pull-right"
                          >
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
          )}
      </Fragment>
    );
  }
}
const mapStateToProps = (state, props) => {
  return {
    history: state.history.history,
    auth: state.auth
  };
};

export default connect(mapStateToProps, {
  pushHistory,

  updateParameter
})(ParameterEdit);
