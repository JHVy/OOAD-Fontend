import React, { Component, Fragment } from "react";
import MaterialReceiptNoteRow from "./MaterialReceiptNoteRow";
import { connect } from "react-redux";
import { getAllMaterialReceiptNotes, getMaterialReceiptNotes, deleteMaterialReceiptNote } from "../../../actions/materialReceiptNoteActions";
import PropTypes from "prop-types";
import axios from "axios";
import Loader from "react-loader";
import { Link } from "react-router-dom";

const mapStateToProps = state => ({
  user: state.auth.user,
  materialReceiptNote: state.materialReceiptNote,
  isLoaded: state.materialReceiptNote.isLoaded
});

class MaterialReceiptNote extends Component {
  state = {
    sort: [{ value: "5" }, { value: "10" }, { value: "20" }],
    select: "5",
    currentPage: 1,
    pages: [],
    totalDocuments: 0,
    query: ""
  };

  componentDidMount() {
    const { select, currentPage, query } = this.state;
    this.getTotalDocuments();
    this.getPages();
    this.props.getMaterialReceiptNotes(select, currentPage, query);
  }

  getTotalDocuments = () => {
    const { query } = this.state;
    let newQuery = "";
    if (query === "") newQuery = "undefined";
    else newQuery = query;

    axios
      .get(`${process.env.REACT_APP_BACKEND_HOST}/api/receipt/count/${newQuery}`)
      .then(response => {
        this.setState({ totalDocuments: response.data });
        console.log(response.data);
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
      .get(`${process.env.REACT_APP_BACKEND_HOST}/api/receipt/count/${newQuery}`)
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
    this.setState({ [e.target.name]: e.target.value }, () => {
      const { select, currentPage, query } = this.state;
      this.props.getMaterialReceiptNotes(select, currentPage, query);
      this.getPages();
      this.getTotalDocuments();
    });
  };

  handleChoosePage = e => {
    this.setState({ currentPage: e }, () => {
      const { select, currentPage, query } = this.state;
      this.props.getMaterialReceiptNotes(select, currentPage, query);
    });
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
          name="currentPage"
          href="fakehref"
          onClick={() => this.handleChoosePage(eachButton.pageNumber)}
          aria-controls="example1"
          data-dt-idx={eachButton.pageNumber}
          tabIndex={0}
        >
          {eachButton.pageNumber}
        </a>
      </li>
    ));
  };

  render() {
    const { materialReceiptNotes } = this.props.materialReceiptNote;
    const { select, totalDocuments } = this.state;
    const { isLoaded } = this.props;

    console.log(materialReceiptNotes);

    return (
      <Fragment>
        {!isLoaded ? (
          <Loader></Loader>
        ) : (
            <React.Fragment>
              {/* Content Header (Page header) */}
              <section className="content-header">
                <h1>
                  Material Receipt Note
                {/* <small>Preview</small> */}
                </h1>
                <ol className="breadcrumb">
                  <li>
                    <Link to="/home">
                      <i className="fa fa-dashboard" /> Home
                  </Link>
                  </li>
                  <li className="active">Material Receipt Note</li>
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
                                  <select
                                      onChange={this.handleOnChange}
                                      name="select"
                                      aria-controls="example1"
                                      style={{ margin: "0px 5px" }}
                                      className="form-control input-sm"
                                      value={this.state.select}
                                    >
                                      {this.state.sort.map(option => (
                                        <option
                                          key={option.value}
                                          value={option.value}
                                        >
                                          {option.value}
                                        </option>
                                      ))}
                                    </select>
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
                                    <th style={{ width: "5%" }}>#</th>
                                    <th style={{ width: "20%" }}>Supplier</th>
                                    <th style={{ width: "15%" }}>User</th>
                                    <th style={{ width: "15%" }}>Created date</th>
                                    <th style={{ width: "40%" }}>Action</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {materialReceiptNotes.map((el, index) => (
                                    <MaterialReceiptNoteRow
                                    
                                      history={this.props.history}
                                      key={el._id}
                                      materialReceiptNote={el}
                                      index={index}
                                      isLoaded={isLoaded}

                                    />
                                  ))}
                                </tbody>
                                <tfoot>
                                  <tr>
                                    <th>#</th>
                                    <th>Supplier</th>
                                    <th>User</th>
                                    <th>Created date</th>
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
            </React.Fragment>
          )}
      </Fragment>
    );
  }
}

MaterialReceiptNote.propTypes = {
  getMaterialReceiptNotes: PropTypes.func.isRequired,
  materialReceiptNote: PropTypes.object.isRequired
};

export default connect(mapStateToProps, { getAllMaterialReceiptNotes, getMaterialReceiptNotes, deleteMaterialReceiptNote })(MaterialReceiptNote);
