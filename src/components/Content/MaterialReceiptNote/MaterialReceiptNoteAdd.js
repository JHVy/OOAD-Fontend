import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { deleteMember } from "../../../actions/memberActions";
import { getAllSuppliers } from "../../../actions/supplierActions"
import { updateQtyMaterial, getAllMaterials } from "../../../actions/materialActions"
import { addMaterialReceiptNote } from "../../../actions/materialReceiptNoteActions"
import { addMaterialReceiptNoteDet } from "../../../actions/materialReceiptNoteDetActions"
import { addStorageReport } from "../../../actions/storageReportActions"
import { showNoti } from "../../../actions/notificationActions"
import { NotificationContainer } from 'react-notifications';
import PropTypes from "prop-types";
import Loader from "react-loader";
import Select from "react-select";

const mongoose = require("mongoose");

class DailyCheck extends Component {

  state = {
    sort: [{ value: "5" }, { value: "10" }, { value: "20" }],
    select: "5",
    currentPage: 1,
    pages: [],
    totalDocuments: 0,
    query: "",
    rows: [],
    options: [],
    supplierOptions: [],
    index: 0,
    notiType: "",
  };

  removeItem(index) {

    this.setState(state => {
      let rows = [...state.rows]
      rows.splice(index, 1);

      return {
        rows
      }
    });

    this.setState(state => {
      let options = [...state.options];
      options[index].disabled = false;
      return {
        options
      }
    });
  }

  createNotification = () => {
    this.props.showNoti(this.state.notiType);
    this.setState({ notiType: '' });
  };

  convertDate = date => {
    const newDate = new Date(date);
    let year = newDate.getFullYear();
    let month = newDate.getMonth() + 1;
    let dt = newDate.getDate();

    dt = dt < 10 ? `0${dt}` : dt;
    month = month < 10 ? `0${month}` : month;

    return year + "-" + month + "-" + dt;
  };

  addRow = () => {
    let options = [...this.state.options],
      supplierOptions = [...this.state.supplierOptions];

    this.setState(state => {

      if (this.props.material.materials.length === this.state.options.length) return;
      else options = [];
      this.props.material.materials.map(el => {
        options.push({ 'value': el._id, 'label': el.name, 'quantitydb': el.quantity, 'disabled': false })
      });
      return {
        options
      }
    });

    this.setState(state => {

      if (this.props.supplier.suppliers.length === state.supplierOptions.length) return;
      else supplierOptions = [];
      this.props.supplier.suppliers.map(el => {
        supplierOptions.push({ 'value': el._id, 'label': el.name })
      });
      return {
        supplierOptions
      }
    });

    this.setState(state => {
      let rows = [...state.rows];
      rows = [...rows, {
        _id: this.state.index + 1,
        materialId: '',
        supplierId: '',
        name: '',
        supName: '',
        price: 0,
        quantitydb: 0,
        importqty: 0,
        options: options,
        supplierOptions: supplierOptions,
        createAt: new Date()
      }];

      return {
        ...state.rows,
        rows
      }
    });
    this.setState({ index: this.state.index + 1 });
  };

  onSubmit = (e => {

    this.state.rows.map(el => {
      e.preventDefault();

      const newReceipt = {
        _id: mongoose.Types.ObjectId(),
        idSupplier: el.supplierId,
        idUser: this.props.user._id,
        createddate: new Date(),
      }

      newReceipt.dets = [];

      this.state.rows.map(el => {
        const newReceiptDet = {
          _id: mongoose.Types.ObjectId(),
          idMaterialReceiptNote: newReceipt._id,
          idMaterial: el.materialId,
          quantity: el.quantitydb + el.importqty,
          price: el.price
        };
        newReceipt.dets.push(newReceiptDet);


        const newMaterial = {
          _id: el.materialId,
          quantity: Number(el.quantitydb) + Number(el.importqty)
        }

        this.props.updateQtyMaterial(newMaterial);
      })

      this.props.addMaterialReceiptNote(newReceipt)
    });
  });

  componentDidMount() {
    this.props.getAllMaterials('');
    this.props.getAllSuppliers('');
  }

  componentDidUpdate(prevProps) {
    let { materialReceiptNotes, response, type } = this.props.materialReceiptNote;


    // if (storagereport.storagereports[0].idMaterial === this.state.rows[0].materialId) {
    //   if (this.props.storagereport.response === 200) {
    //     this.setState({ notiType: 'success' });
    //   } else {
    //     this.setState({ notiType: 'failure' });
    //   }
    // }

  }

  //on select materiral combobox
  onSelect = (index, selectedMaterial) => {
    //selectedMaterial.quantitydb
    //selectedMaterial.value - _id
    //selectedMaterial.label - name

    this.setState(state => {
      let rows = [...state.rows];

      rows.map(el => {
        if (el._id === index + 1) {
          const newItem = {
            _id: el._id,
            materialId: selectedMaterial.value,
            supplierId: el.supplierId,
            supName: el.supName,
            name: selectedMaterial.label,
            quantitydb: selectedMaterial.quantitydb,
            importqty: el.importqty,
            supplierOptions: this.state.supplierOptions,
            options: this.state.options,
            createAt: new Date()
          };

          rows.splice(index, 1); //xoa 1 phan tu o vi tri index
          rows.splice(index, 0, newItem); //chen newItem vao vi tri thu index   
          return false;
        }
      });

      return {
        rows
      }
    });

  };

  //on select supplier combobox
  onSupplierSelect = (index, selectedSupplier) => {
    //selectedSup.value - _id
    //selectedSup.label - name

    this.setState(state => {
      let rows = [...state.rows];

      rows.map(el => {
        if (el._id === index + 1) {
          const newItem = {
            _id: el._id,
            materialId: el.materialId,
            supplierId: selectedSupplier.value,
            name: el.name,
            supName: selectedSupplier.label,
            price: el.price,
            quantitydb: el.quantitydb,
            importqty: el.importqty,
            options: this.state.options,
            supplierOptions: this.state.supplierOptions,
            createAt: new Date()
          };

          rows.splice(index, 1); //xoa 1 phan tu o vi tri index
          rows.splice(index, 0, newItem); //chen newItem vao vi tri thu index   
          return false;
        }
      });

      return {
        rows
      }
    });

  };

  onMenuOpen = () => {
    this.setState(state => {
      let options = [...state.options];
      options.map((el, index) => {
        if (this.state.rows.some(r => r.materialId === el.value)) {

          options[index].disabled = true;
        }
        else options[index].disabled = false;
      })
      return {
        options
      }
    });
  }


  handleChoosePage = e => {
    this.setState({ currentPage: e }, () => {
      const { select, currentPage, query } = this.state;
      this.props.getMembers(select, currentPage, query);
    });
  };


  blurQty = (e, index) => {

    const val = e.target.textContent;
    this.setState(state => {
      let rows = [...state.rows];

      rows.map(el => {
        if (el._id == index + 1) {
          const newItem = Object.assign(el);
          newItem["importqty"] = val;

          rows.splice(index, 1); //xoa 1 phan tu o vi tri index
          rows.splice(index, 0, newItem); //chen newItem vao vi tri thu index
        }
      });

      return {
        rows
      }
    });
  };

  blurPrice = (e, index) => {
    const val = e.target.textContent;
    this.setState(state => {
      let rows = [...state.rows];

      rows.map(el => {
        if (el._id == index + 1) {
          const newItem = Object.assign(el);
          newItem["price"] = val;
          rows.splice(index, 1); //xoa 1 phan tu o vi tri index
          rows.splice(index, 0, newItem); //chen newItem vao vi tri thu index
        }
      });

      return {
        rows
      }
    });
  };

  render() {
    const { disabled } = this.state;
    const { isLoaded } = this.props;

    return (
      <Fragment>
        {!isLoaded ? (
          <Loader></Loader>
        ) : (
            <React.Fragment>
              {this.state.notiType !== "" ? (
                this.createNotification()
              ) : null}
              <NotificationContainer />
              {/* Content Header (Page header) */}
              <section className="content-header">
                <h1>
                  Material Receipt
                                {/* <small>Preview</small> */}
                </h1>
                <ol className="breadcrumb">
                  <li>
                    <a href="fake_url">
                      <i className="fa fa-dashboard" /> Home
                                        </a>
                  </li>
                  <li>
                    <a href="fake_url">Storage Report</a>
                  </li>
                </ol>
              </section>
              {/* Main content */}
              <section className="content">
                <div className="row">
                  {/* left column */}
                  <div className="col-md-12">
                    <div className="box">
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
                                  <button
                                    type="button"
                                    id="btnAdd"
                                    style={{ float: "left" }}
                                    className="btn btn-primary"
                                    data-toggle="modal"
                                    onClick={this.addRow}
                                  >
                                    + Add
                                                                    </button>
                                </div>
                              </div>
                              <div className="col-sm-6">
                                <div
                                  id="example1_filter"
                                  className="dataTables_filter"
                                >
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
                                    <th style={{ width: "15%" }}>Material</th>
                                    <th style={{ width: "15%" }}>Quantity</th>
                                    <th style={{ width: "15%" }}>Price</th>
                                    <th style={{ width: "15%" }}>Import Quantity</th>
                                    <th style={{ width: "15%" }}>Supplier</th>
                                    <th style={{ width: "5%" }}></th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {this.state.rows.map((el, index) => (
                                    <tr key={index}>
                                      <td>{index + 1}</td>
                                      <td>
                                        <Select
                                          onMenuOpen={() => this.onMenuOpen()}
                                          onChange={(e) => this.onSelect(index, e)}
                                          styles={{
                                            control: (base, state) => ({
                                              ...base,
                                              borderColor: 'transparent',
                                            }),
                                          }}
                                          value={{
                                            value: el.materialId,
                                            label: el.name
                                          }}
                                          options={el.options}
                                          isOptionDisabled={el => el.disabled === true}
                                        />
                                      </td>
                                      <td bgcolor="#f4f4f4">{el.quantitydb}</td>
                                      <td onBlur={e => this.blurPrice(e, index)} id="price" bgcolor='#FFFFFF' style={inputField} contentEditable="true"></td>
                                      <td onBlur={e => this.blurQty(e, index)} id="import-qty" bgcolor='#FFFFFF' style={inputField} contentEditable="true"></td>
                                      <td>
                                        <Select
                                          //onMenuOpen={() => this.onMenuSupplierOpen()}
                                          onChange={(e) => this.onSupplierSelect(index, e)}
                                          styles={{
                                            control: (base, state) => ({
                                              ...base,
                                              borderColor: 'transparent',
                                            }),
                                          }}
                                          value={{
                                            value: el.supplierId,
                                            label: el.supName
                                          }}
                                          options={el.supplierOptions}
                                        />
                                      </td>
                                      <td><a style={{ cursor: 'pointer' }} onClick={() => this.removeItem(index)} className="fa fa-trash-o"></a></td>
                                    </tr >
                                  ))}
                                </tbody>
                                <tfoot>
                                  <tr>
                                    <th>#</th>
                                    <th>Material</th>
                                    <th>Quantity</th>
                                    <th>Price</th>
                                    <th>Import Quantity</th>
                                    <th>Supplier</th>
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
                                Input material quantity at the end of the day
                                                            </div>
                            </div>
                            <div className="col-sm-7">
                              <div
                                className="dataTables_paginate paging_simple_numbers"
                                id="example1_paginate"
                              >
                                <button
                                  type="button"
                                  id="btnSubmit"
                                  style={{ float: "right" }}
                                  className="btn btn-primary"
                                  onClick={this.onSubmit}
                                >
                                  Submit
                                                                </button>
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

DailyCheck.propTypes = {
  addStorageReport: PropTypes.func.isRequired,
  storagereport: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  isLoaded: state.material.isLoaded,
  storagereport: state.storagereport,
  material: state.material,
  supplier: state.supplier,
  user: state.auth.user,
  materialReceiptNote: state.materialReceiptNote
});

export default connect(
  mapStateToProps,
  {
    deleteMember, addStorageReport, updateQtyMaterial,
    getAllMaterials, getAllSuppliers, addMaterialReceiptNote, addMaterialReceiptNoteDet, showNoti
  }
)(DailyCheck);

const inputField = {
  "&:focus": {
    outline: 'none',
  },
};