import React, { Fragment, Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { showNoti } from "../../../actions/notificationActions";
import MaterialReceiptNoteDetailRow from "./MaterialReceiptNoteDetailRow";
class MaterialReceiptNoteDetail extends Component {
  state = {
    details: []
  };
  componentDidMount() {
    const { id } = this.props.match.params;
    axios
      .get(
        `${process.env.REACT_APP_BACKEND_HOST}/api/receiptdet/${id}`,
        this.tokenConfig(this.props.auth.token)
      )
      .then(response => {
        if (!response.data) this.props.history.push("/404");
        else {
          // const { name, quantity, _id } = response.data;
          this.setState({
            details: response.data
          });
        }
      })
      .catch(error => {
        console.log(error.response);
      });
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

  renderMaterialReceiptNoteDetailRow = () => {
    const { details } = this.state;
    return details.map((eachDetail, index) => (
      <MaterialReceiptNoteDetailRow
        key={eachDetail._id}
        detail={eachDetail}
        index={index}
      />
    ));
  };

  handleCancel = e => {
    this.props.history.push("/materialReceiptNote");
  };
  render() {
    const { details } = this.state;

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
              <Link to="/material">Material Receipt Note Details</Link>
            </li>
            <li className="active">Details</li>
          </ol>
        </section>
        {/* Main content */}
        <section className="content">
          <div className="row">
            <div className="col-md-6">
              <div className="box box-info">
                <div className="box-header with-border">
                  <h3 className="box-title">Material Receipt Note Details</h3>
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
                              <th style={{ width: "20%" }}>Material</th>
                              <th style={{ width: "15%" }}>Quantity</th>
                            </tr>
                          </thead>
                          <tbody>
                            {this.renderMaterialReceiptNoteDetailRow()}
                          </tbody>
                          <tfoot>
                            <tr>
                              <th>#</th>
                              <th>Material</th>
                              <th>Quantity</th>
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
export default connect(mapStateToProps, { showNoti })(
  MaterialReceiptNoteDetail
);
