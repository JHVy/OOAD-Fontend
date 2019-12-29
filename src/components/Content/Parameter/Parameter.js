import React, { Component, Fragment } from "react";
import ParameterModal from "./ParameterModal";
import ParameterRow from "./ParameterRow";
import { connect } from "react-redux";
import { getParameters } from "../../../actions/parameterActions";
import PropTypes from "prop-types";
import axios from "axios";
import Loader from "react-loader";
import { Link } from "react-router-dom";

const mapStateToProps = state => ({
  parameters: state.parameter.parameters,
  isLoaded: state.parameter.isLoaded
});

class Parameter extends Component {
  state = {
    sort: [{ value: "5" }, { value: "10" }, { value: "20" }],
    select: "5",
    currentPage: 1,
    pages: [],
    totalDocuments: 0,
    query: ""
  };

  resetState = () => {
    this.setState({ select: "5", currentPage: 1, query: "" });
  };
  componentDidMount() {
    const { select, currentPage, query } = this.state;
    this.getTotalDocuments();

    this.getPages();

    this.props.getParameters(select, currentPage, query);
  }

  getTotalDocuments = () => {
    const { query } = this.state;

    let newQuery = "";
    if (query === "") newQuery = "undefined";
    else newQuery = query;

    axios
      .get(
        `${process.env.REACT_APP_BACKEND_HOST}/api/parameter/count/${newQuery}`
      )
      .then(response => {
        this.setState({ totalDocuments: response.data });
      })
      .catch(er => {
        console.log(er.response);
      });
  };

  getPages = () => {
    const { select, query } = this.state;
    let newQuery = "";
    if (query === "") newQuery = "undefined";
    else newQuery = query;

    axios
      .get(
        `${process.env.REACT_APP_BACKEND_HOST}/api/parameter/count/${newQuery}`
      )
      .then(response => {
        let pages = Math.floor(response.data / select);
        let remainder = response.data % select;
        let newArray = [];
        if (remainder !== 0) pages += 1;

        for (let i = 0; i < pages; i++) {
          newArray.push({ pageNumber: i + 1 });
        }

        this.setState({ pages: newArray });
      })
      .catch(er => {
        console.log(er.response);
      });
  };

  handleOnChange = e => {
    console.log(typeof e.target.name + " " + e.target.name);
    e.persist();
    this.setState({ [e.target.name]: e.target.value }, () => {
      if (e.target.name === "query") {
        this.setState({ currentPage: 1 }, () => {
          this.rerenderPage();
        });
      } else {
        this.rerenderPage();
      }
    });
  };

  rerenderPage = () => {
    const { select, currentPage, query } = this.state;
    this.props.getParameters(select, currentPage, query);
    this.getPages();
    this.getTotalDocuments();
  };

  renderParameters = () => {
    const { parameters } = this.props;
    return parameters.map((eachParameter, index) => (
      <ParameterRow
        history={this.props.history}
        key={eachParameter._id}
        parameter={eachParameter}
        index={index}
      // deleteParameter={this.props.deleteParameter}
      />
    ));
  };
  handleChoosePage = e => {
    this.setState({ currentPage: e }, () => {
      const { select, currentPage, query } = this.state;
      this.props.getParameters(select, currentPage, query);
    });
  };

  renderSelect = () => {
    const { sort, select } = this.state;
    return (
      <select
        onChange={this.handleOnChange}
        name="select"
        aria-controls="example1"
        style={{ margin: "0px 5px" }}
        className="form-control input-sm"
        value={select}
      >
        {sort.map(option => (
          <option key={option.value} value={option.value}>
            {option.value}
          </option>
        ))}
      </select>
    );
  };

  renderPageButtons = () => {
    const { pages, currentPage } = this.state;

    return pages.map(eachButton => (
      <li
        key={eachButton.pageNumber}
        className={
          currentPage === eachButton.pageNumber
            ? "paginae_button active"
            : "paginate_button "
        }
      >
        <a
          className="paga-link"
          name="currentPage"
          href="fake_url"
          onClick={() => this.handleChoosePage(eachButton.pageNumber)}
        >
          {eachButton.pageNumber}
        </a>
      </li>
    ));
  };

  render() {
    const { select, totalDocuments } = this.state;
    const { isLoaded } = this.props;
    return (
      <Fragment>
        {!isLoaded ? (
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
                  <li className="active">Parameter</li>
                </ol>
              </section>
              {/* Main content */}
              <section className="content">
                <div className="row">
                  {/* left column */}
                  <div className="col-md-12">
                    <div className="box">
                      <div className="box-header" style={{ marginTop: "5px" }}>
                        <div
                          style={{ paddingLeft: "5px" }}
                          className="col-md-8"
                        ></div>

                        <div className="col-md-4">
                          <ParameterModal />
                        </div>
                      </div>
                      {/* /.box-header */}
                      <div className="box-body">
                        <div
                          id="example1_wrapper"
                          className="dataTables_wrapper form-inline dt-bootstrap"
                        >
                          <div className="row">
                            <div>
                              <div className="col-sm-6">
                                <div
                                  className="dataTables_length"
                                  id="example1_length"
                                >
                                  <label>
                                    Show
                                  {this.renderSelect()}
                                    entries
                                </label>
                                </div>
                              </div>
                              <div className="col-sm-6">
                                <div
                                  id="example1_filter"
                                  className="dataTables_filter"
                                >
                                  <label style={{ float: "right" }}>
                                    Search:
                                  <input
                                      type="search"
                                      name="query"
                                      style={{ margin: "0px 5px" }}
                                      className="form-control input-sm"
                                      placeholder="Find me  "
                                      aria-controls="example1"
                                      onChange={this.handleOnChange}
                                      value={this.state.query}
                                    />
                                  </label>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="row">
                            <div className="col-sm-12">
                              <table
                                id="example1"
                                className="table table-bordered table-striped"
                              >
                                <thead>
                                  <tr>
                                    <th style={{ width: "10%" }}>#</th>
                                    <th style={{ width: "20%" }}>Max Point</th>
                                    <th style={{ width: "20%" }}>System Discount (%)</th>
                                    <th style={{ width: "20%" }}>Member Discount (%)</th>
                                    <th style={{ width: "30%" }}>Action</th>
                                  </tr>
                                </thead>
                                <tbody>{this.renderParameters()}</tbody>
                                <tfoot>
                                  <tr>
                                    <th>#</th>
                                    <th>Max Point</th>
                                    <th>System Discount(%)</th>
                                    <th>Member Discount(%)</th>
                                    <th>Action</th>
                                  </tr>
                                </tfoot>
                              </table>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-sm-5">
                              <div
                                className="dataTables_info"
                                id="example1_info"
                                role="status"
                                aria-live="polite"
                              >
                                Showing 1 to {select} of {totalDocuments} entries
                            </div>
                            </div>
                            <div className="col-sm-7">
                              <div
                                className="dataTables_paginate paging_simple_numbers"
                                id="example1_paginate"
                              >
                                <ul
                                  className="pagination"
                                  style={{ float: "right" }}
                                >
                                  {this.renderPageButtons()}
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                        {/*/.col (left) */}
                      </div>
                      {/* /.row */}
                    </div>
                  </div>
                </div>
              </section>
              {/* /.content */}
            </Fragment>
          )}
      </Fragment>
    );
  }
}

Parameter.propTypes = {
  getParameters: PropTypes.func.isRequired,
  parameters: PropTypes.array.isRequired,
  isLoaded: PropTypes.bool.isRequired
};

export default connect(mapStateToProps, { getParameters })(Parameter);
