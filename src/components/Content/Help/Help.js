import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import "./Help.css";

import add1 from "./img/add1.png";
import add2 from "./img/add2.png";
import add3 from "./img/add3.png";
import add4 from "./img/add4.png";
import add5 from "./img/add5.png";
import add6 from "./img/add6.png";
import add7 from "./img/add7.png";
import add8 from "./img/add8.png";
import add9 from "./img/add9.png";
import add10 from "./img/add10.png";
import add11 from "./img/add11.png";
import add12 from "./img/add12.png";
import add13 from "./img/add13.png";
import add14 from "./img/add14.png";
import add15 from "./img/add15.png";
import add16 from "./img/add16.png";
import add17 from "./img/add17.png";
import add18 from "./img/add18.png";
import add19 from "./img/add19.png";
import add20 from "./img/add20.png";
import add21 from "./img/add21.png";
import add22 from "./img/add22.png";
import add23 from "./img/add23.png";
import add24 from "./img/add24.png";
import add25 from "./img/add25.png";

import update1 from "./img/update1.png";
import update2 from "./img/update2.png";
import update3 from "./img/update3.png";
import update4 from "./img/update4.png";
import update5 from "./img/update5.png";
import update6 from "./img/update6.png";
import update7 from "./img/update7.png";
import update8 from "./img/update8.png";
import update9 from "./img/update9.png";
import update10 from "./img/update10.png";
import update11 from "./img/update11.png";
import update12 from "./img/update12.png";
import update13 from "./img/update13.png";
import update14 from "./img/update14.png";
import update15 from "./img/update15.png";
import update16 from "./img/update16.png";
import update17 from "./img/update17.png";
import update18 from "./img/update18.png";
import update19 from "./img/update19.png";
import update20 from "./img/update20.png";
import update21 from "./img/update21.png";
import update22 from "./img/update22.png";
import update23 from "./img/update23.png";
import update24 from "./img/update24.png";
import update25 from "./img/update25.png";
import update26 from "./img/update26.png";

import delete1 from "./img/delete1.png";
import delete2 from "./img/delete2.png";
import delete3 from "./img/delete3.png";
import delete4 from "./img/delete4.png";
import delete5 from "./img/delete5.png";
import delete6 from "./img/delete6.png";
import delete7 from "./img/delete7.png";
import delete8 from "./img/delete8.png";

import order from "./img/order.png";
import dailycheck1 from "./img/dailycheck1.png";
import dailycheck2 from "./img/dailycheck2.png";
import storagereport1 from "./img/storagereport1.png";
import salereport1 from "./img/salereport1.png";

class Help extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openCrudPanel: false,
      openCategoryPanel: false,
      openRolePanel: false,
      openMemberPanel: false,
      openSupplierPanel: false,
      openProductPanel: false,
      openMaterialPanel: false,
      openPayslipPanel: false,
      openUserPanel: false,
      openOrderPanel: false,
      openDailyCheckPanel: false,
      openStorageReportPanel: false,
      openSaleReportPanel: false
    };
  }

  toggleCrudPanel(e) {
    this.setState({ openCrudPanel: !this.state.openCrudPanel });
  }

  toggleCategoryPanel(e) {
    this.setState({ openCategoryPanel: !this.state.openCategoryPanel });
  }

  toggleRolePanel(e) {
    this.setState({ openRolePanel: !this.state.openRolePanel });
  }

  toggleMemberPanel(e) {
    this.setState({ openMemberPanel: !this.state.openMemberPanel });
  }

  toggleProductPanel(e) {
    this.setState({ openProductPanel: !this.state.openProductPanel });
  }

  toggleSupplierPanel(e) {
    this.setState({ openSupplierPanel: !this.state.openSupplierPanel });
  }

  toggleMaterialPanel(e) {
    this.setState({ openMaterialPanel: !this.state.openMaterialPanel });
  }

  togglePayslipPanel(e) {
    this.setState({ openPayslipPanel: !this.state.openPayslipPanel });
  }

  toggleUserPanel(e) {
    this.setState({ openUserPanel: !this.state.openUserPanel });
  }

  toggleOrderPanel(e) {
    this.setState({ openOrderPanel: !this.state.openOrderPanel });
  }

  toggleDailyCheckPanel(e) {
    this.setState({ openDailyCheckPanel: !this.state.openDailyCheckPanel });
  }

  toggleStorageReportPanel(e) {
    this.setState({
      openStorageReportPanel: !this.state.openStorageReportPanel
    });
  }

  toggleSaleReportPanel(e) {
    this.setState({ openSaleReportPanel: !this.state.openSaleReportPanel });
  }

  render() {
    return (
      <Fragment>
        <div>
          {/* Content Header (Page header) */}
          <section className="content-header">
            <h1>Help Center</h1>
            <ol className="breadcrumb">
              <li>
                <Link to="/home">
                  <i className="fa fa-dashboard" /> Home
                </Link>
              </li>
              <li className="active">Help</li>
            </ol>
          </section>

          {/* Main content */}

          {/* CRUD Panel */}
          <div>
            <div onClick={e => this.toggleCrudPanel(e)} className="header">
              Add, change and delete a component
            </div>
            {this.state.openCrudPanel ? (
              <div className="content">
                {/* Category */}
                <div
                  onClick={e => this.toggleCategoryPanel(e)}
                  className="smallheader"
                >
                  Category
                </div>
                {this.state.openCategoryPanel ? (
                  <div>
                    <div className="content">
                      {/* Add */}
                      <h4>Add new category</h4>
                      <h5>
                        - To add new category click add new category button at
                        top-right of your page, it will show you add modal
                      </h5>
                      <img
                        src={add1}
                        style={{ width: 350, height: 300, marginRight: 20 }}
                      ></img>
                      <img
                        src={add2}
                        style={{ maxWidth: 450, maxHeight: 300 }}
                      ></img>
                      <h5>- Fill all the text field then click add</h5>
                      <img
                        src={add3}
                        style={{ maxWidth: 450, maxHeight: 300 }}
                      ></img>
                      <h5>
                        - And now you will have new category added to your data
                        table
                      </h5>
                      <img
                        src={add4}
                        style={{ maxWidth: 450, maxHeight: 400 }}
                      ></img>

                      {/* Update */}
                      <h4 style={{ marginTop: 50 }}>Change a category</h4>
                      <h5>
                        - To change info of a category, click edit button in the
                        action column of the data table and it will bring you to
                        edit page
                      </h5>
                      <img
                        src={update1}
                        style={{
                          maxWidth: 450,
                          maxHeight: 300,
                          marginRight: 20
                        }}
                      ></img>
                      <img
                        src={update2}
                        style={{ maxWidth: 450, maxHeight: 300 }}
                      ></img>
                      <h5>- Change the info you want to then click save </h5>
                      <img
                        src={update3}
                        style={{ maxWidth: 450, maxHeight: 300 }}
                      ></img>
                      <h5>- And now your new info has been saved</h5>
                      <img
                        src={update4}
                        style={{ maxWidth: 450, maxHeight: 400 }}
                      ></img>

                      {/* Delete */}
                      <h4 style={{ marginTop: 50 }}>Delete a category</h4>
                      <h5>
                        - To delete a category, click delete button in the
                        action column of the data table and it will delete for
                        you
                      </h5>
                      <img
                        src={delete1}
                        style={{
                          maxWidth: 450,
                          maxHeight: 300,
                          marginRight: 20
                        }}
                      ></img>
                    </div>
                  </div>
                ) : null}
                {/* End Category */}

                {/* Role */}
                <div
                  onClick={e => this.toggleRolePanel(e)}
                  className="smallheader"
                >
                  Role
                </div>
                {this.state.openRolePanel ? (
                  <div>
                    <div className="content">
                      {/* Add */}
                      <h4>Add new role</h4>
                      <h5>
                        - To add new role click add new role button at top-right
                        of your page, it will show you add modal
                      </h5>
                      <img
                        src={add5}
                        style={{
                          maxWidth: 450,
                          maxHeight: 300,
                          marginRight: 20
                        }}
                      ></img>
                      <img
                        src={add6}
                        style={{ maxWidth: 450, maxHeight: 300 }}
                      ></img>
                      <h5>- Then follow these steps: </h5>
                      <img
                        src={add7}
                        style={{ maxWidth: 650, maxHeight: 400 }}
                      ></img>

                      {/* Update */}
                      <h4 style={{ marginTop: 50 }}>Change a role</h4>
                      <h5>
                        - To change info of a role, click edit button in the
                        action column of the data table and it will bring you to
                        edit page
                      </h5>
                      <img
                        src={update5}
                        style={{
                          maxWidth: 450,
                          maxHeight: 300,
                          marginRight: 20
                        }}
                      ></img>
                      <img
                        src={update6}
                        style={{ maxWidth: 450, maxHeight: 300 }}
                      ></img>
                      <h5>- Change the info you want to then click Save </h5>
                      <img
                        src={update7}
                        style={{ maxWidth: 650, maxHeight: 400 }}
                      ></img>

                      {/* Delete */}
                      <h4 style={{ marginTop: 50 }}>Delete a role</h4>
                      <h5>
                        - To delete a role, click delete button in the action
                        column of the data table and it will delete for you
                      </h5>
                      <img
                        src={delete2}
                        style={{
                          maxWidth: 450,
                          maxHeight: 300,
                          marginRight: 20
                        }}
                      ></img>
                    </div>
                  </div>
                ) : null}
                {/* End role */}

                {/* Member */}
                <div
                  onClick={e => this.toggleMemberPanel(e)}
                  className="smallheader"
                >
                  Member
                </div>
                {this.state.openMemberPanel ? (
                  <div>
                    <div className="content">
                      {/* Add */}
                      <h4>Add new member</h4>
                      <h5>
                        - To add new member click add new member button at
                        top-right of your page, it will show you add modal
                      </h5>
                      <img
                        src={add8}
                        style={{
                          maxWidth: 450,
                          maxHeight: 300,
                          marginRight: 20
                        }}
                      ></img>
                      <img
                        src={add9}
                        style={{ maxWidth: 450, maxHeight: 300 }}
                      ></img>
                      <h5>- Then follow these steps: </h5>
                      <img
                        src={add10}
                        style={{ maxWidth: 650, maxHeight: 400 }}
                      ></img>

                      {/* Update */}
                      <h4 style={{ marginTop: 50 }}>Change a member</h4>
                      <h5>
                        - To change info of a member, click edit button in the
                        action column of the data table and it will bring you to
                        edit page
                      </h5>
                      <img
                        src={update8}
                        style={{
                          maxWidth: 450,
                          maxHeight: 300,
                          marginRight: 20
                        }}
                      ></img>
                      <img
                        src={update9}
                        style={{ maxWidth: 450, maxHeight: 300 }}
                      ></img>
                      <h5>- Change the info you want to then click Save </h5>
                      <img
                        src={update10}
                        style={{ maxWidth: 650, maxHeight: 400 }}
                      ></img>

                      {/* Delete */}
                      <h4 style={{ marginTop: 50 }}>Delete a member</h4>
                      <h5>
                        - To delete a member, click delete button in the action
                        column of the data table and it will delete for you
                      </h5>
                      <img
                        src={delete3}
                        style={{
                          maxWidth: 450,
                          maxHeight: 300,
                          marginRight: 20
                        }}
                      ></img>
                    </div>
                  </div>
                ) : null}
                {/* End Member */}

                {/* Supplier */}
                <div
                  onClick={e => this.toggleSupplierPanel(e)}
                  className="smallheader"
                >
                  Supplier
                </div>
                {this.state.openSupplierPanel ? (
                  <div>
                    <div className="content">
                      {/* Add */}
                      <h4>Add new supplier</h4>
                      <h5>
                        - To add new supplier, click add new supplier button at
                        top-right of your page, it will show you add modal
                      </h5>
                      <img
                        src={add11}
                        style={{
                          maxWidth: 450,
                          maxHeight: 300,
                          marginRight: 20
                        }}
                      ></img>
                      <img
                        src={add12}
                        style={{ maxWidth: 450, maxHeight: 300 }}
                      ></img>
                      <h5>- Then follow these steps: </h5>
                      <img
                        src={add13}
                        style={{ maxWidth: 650, maxHeight: 400 }}
                      ></img>

                      {/* Update */}
                      <h4 style={{ marginTop: 50 }}>Change a supplier</h4>
                      <h5>
                        - To change info of a supplier, click edit button in the
                        action column of the data table and it will bring you to
                        edit page
                      </h5>
                      <img
                        src={update11}
                        style={{
                          maxWidth: 450,
                          maxHeight: 300,
                          marginRight: 20
                        }}
                      ></img>
                      <img
                        src={update12}
                        style={{ maxWidth: 450, maxHeight: 300 }}
                      ></img>
                      <h5>- Change the info you want to then click Save </h5>
                      <img
                        src={update13}
                        style={{ maxWidth: 650, maxHeight: 400 }}
                      ></img>

                      {/* Delete */}
                      <h4 style={{ marginTop: 50 }}>Delete a supplier</h4>
                      <h5>
                        - To delete a supplier, click delete button in the
                        action column of the data table and it will delete for
                        you
                      </h5>
                      <img
                        src={delete4}
                        style={{
                          maxWidth: 450,
                          maxHeight: 300,
                          marginRight: 20
                        }}
                      ></img>
                    </div>
                  </div>
                ) : null}
                {/* End Supplier */}

                {/* Product */}
                <div
                  onClick={e => this.toggleProductPanel(e)}
                  className="smallheader"
                >
                  Product
                </div>
                {this.state.openProductPanel ? (
                  <div>
                    <div className="content">
                      {/* Add */}
                      <h4>Add new product</h4>
                      <h5>
                        - To add new product, click add new product button at
                        top-right of your page, it will show you add modal
                      </h5>
                      <img
                        src={add14}
                        style={{
                          maxWidth: 450,
                          maxHeight: 300,
                          marginRight: 20
                        }}
                      ></img>
                      <img
                        src={add15}
                        style={{ maxWidth: 450, maxHeight: 300 }}
                      ></img>
                      <h5>- Then follow these steps: </h5>
                      <img
                        src={add16}
                        style={{ maxWidth: 650, maxHeight: 400 }}
                      ></img>

                      {/* Update */}
                      <h4 style={{ marginTop: 50 }}>Change a product</h4>
                      <h5>
                        - To change info of a product, click edit button in the
                        action column of the data table and it will bring you to
                        edit page
                      </h5>
                      <img
                        src={update14}
                        style={{
                          maxWidth: 450,
                          maxHeight: 300,
                          marginRight: 20
                        }}
                      ></img>
                      <img
                        src={update15}
                        style={{ maxWidth: 450, maxHeight: 300 }}
                      ></img>
                      <h5>- Change the info you want to then click Save </h5>
                      <img
                        src={update16}
                        style={{ maxWidth: 650, maxHeight: 400 }}
                      ></img>

                      {/* Delete */}
                      <h4 style={{ marginTop: 50 }}>Delete a product</h4>
                      <h5>
                        - To delete a product, click delete button in the action
                        column of the data table and it will delete for you
                      </h5>
                      <img
                        src={delete5}
                        style={{
                          maxWidth: 450,
                          maxHeight: 300,
                          marginRight: 20
                        }}
                      ></img>
                    </div>
                  </div>
                ) : null}
                {/* End Product */}

                {/* Material */}
                <div
                  onClick={e => this.toggleMaterialPanel(e)}
                  className="smallheader"
                >
                  Material
                </div>
                {this.state.openMaterialPanel ? (
                  <div>
                    <div className="content">
                      {/* Add */}
                      <h4>Add new material</h4>
                      <h5>
                        - To add new material, click add new material button at
                        top-right of your page, it will show you add modal
                      </h5>
                      <img
                        src={add17}
                        style={{
                          maxWidth: 450,
                          maxHeight: 300,
                          marginRight: 20
                        }}
                      ></img>
                      <img
                        src={add18}
                        style={{ maxWidth: 450, maxHeight: 300 }}
                      ></img>
                      <h5>- Then follow these steps: </h5>
                      <img
                        src={add19}
                        style={{ maxWidth: 650, maxHeight: 400 }}
                      ></img>

                      {/* Update */}
                      <h4 style={{ marginTop: 50 }}>Change a material</h4>
                      <h5>
                        - To change info of a material, click edit button in the
                        action column of the data table and it will bring you to
                        edit page
                      </h5>
                      <img
                        src={update17}
                        style={{
                          maxWidth: 450,
                          maxHeight: 300,
                          marginRight: 20
                        }}
                      ></img>
                      <img
                        src={update18}
                        style={{ maxWidth: 450, maxHeight: 300 }}
                      ></img>
                      <h5>- Change the info you want to then click Save </h5>
                      <img
                        src={update19}
                        style={{ maxWidth: 650, maxHeight: 400 }}
                      ></img>

                      {/* Delete */}
                      <h4 style={{ marginTop: 50 }}>Delete a material</h4>
                      <h5>
                        - To delete a material, click delete button in the
                        action column of the data table and it will delete for
                        you
                      </h5>
                      <img
                        src={delete6}
                        style={{
                          maxWidth: 450,
                          maxHeight: 300,
                          marginRight: 20
                        }}
                      ></img>
                    </div>
                  </div>
                ) : null}
                {/* End Material */}

                {/* Pay Slip */}
                <div
                  onClick={e => this.togglePayslipPanel(e)}
                  className="smallheader"
                >
                  Pay Slip
                </div>
                {this.state.openPayslipPanel ? (
                  <div>
                    <div className="content">
                      {/* Add */}
                      <h4>Add new payslip</h4>
                      <h5>
                        - To add new payslip, click add new payslip button at
                        top-right of your page, it will show you add modal
                      </h5>
                      <img
                        src={add20}
                        style={{
                          maxWidth: 450,
                          maxHeight: 300,
                          marginRight: 20
                        }}
                      ></img>
                      <img
                        src={add21}
                        style={{ maxWidth: 450, maxHeight: 300 }}
                      ></img>
                      <h5>- Then follow these steps: </h5>
                      <img
                        src={add22}
                        style={{ maxWidth: 650, maxHeight: 400 }}
                      ></img>

                      {/* Update */}
                      <h4 style={{ marginTop: 50 }}>Change a payslip</h4>
                      <h5>
                        - To change info of a payslip, click edit button in the
                        action column of the data table and it will bring you to
                        edit page
                      </h5>
                      <img
                        src={update20}
                        style={{
                          maxWidth: 450,
                          maxHeight: 300,
                          marginRight: 20
                        }}
                      ></img>
                      <img
                        src={update21}
                        style={{ maxWidth: 450, maxHeight: 300 }}
                      ></img>
                      <h5>- Change the info you want to then click Save </h5>
                      <img
                        src={update22}
                        style={{ maxWidth: 650, maxHeight: 400 }}
                      ></img>

                      {/* Delete */}
                      <h4 style={{ marginTop: 50 }}>Delete a payslip</h4>
                      <h5>
                        - To delete a payslip, click delete button in the action
                        column of the data table and it will delete for you
                      </h5>
                      <img
                        src={delete7}
                        style={{
                          maxWidth: 450,
                          maxHeight: 300,
                          marginRight: 20
                        }}
                      ></img>
                    </div>
                  </div>
                ) : null}
                {/* End PaySlip */}

                {/* User */}
                <div
                  onClick={e => this.toggleUserPanel(e)}
                  className="smallheader"
                >
                  User
                </div>
                {this.state.openUserPanel ? (
                  <div>
                    <div className="content">
                      {/* Add */}
                      <h4>Add new user</h4>
                      <h5>
                        - To add new user, click add new user button at
                        top-right of your page, it will show you add modal
                      </h5>
                      <img
                        src={add23}
                        style={{
                          maxWidth: 450,
                          maxHeight: 300,
                          marginRight: 20
                        }}
                      ></img>
                      <img
                        src={add24}
                        style={{ maxWidth: 450, maxHeight: 300 }}
                      ></img>
                      <h5>
                        - Then follow these steps: (Note: the default password
                        will be "user"){" "}
                      </h5>
                      <img
                        src={add25}
                        style={{ maxWidth: 650, maxHeight: 400 }}
                      ></img>

                      {/* Update */}
                      <h4 style={{ marginTop: 50 }}>Change a user</h4>
                      <h5>
                        - To change info of a user, click edit button in the
                        action column of the data table and it will bring you to
                        edit page
                      </h5>
                      <img
                        src={update23}
                        style={{
                          maxWidth: 450,
                          maxHeight: 300,
                          marginRight: 20
                        }}
                      ></img>
                      <img
                        src={update24}
                        style={{ maxWidth: 450, maxHeight: 300 }}
                      ></img>
                      <h5>- Change the info you want to then click Save </h5>
                      <img
                        src={update25}
                        style={{ maxWidth: 650, maxHeight: 400 }}
                      ></img>
                      <h5>
                        - (Optional) Change the password you want to then click
                        Change and Close and after that click Save{" "}
                      </h5>
                      <img
                        src={update26}
                        style={{ maxWidth: 650, maxHeight: 400 }}
                      ></img>

                      {/* Delete */}
                      <h4 style={{ marginTop: 50 }}>Delete a user</h4>
                      <h5>
                        - To delete a user, click delete button in the action
                        column of the data table and it will delete for you
                      </h5>
                      <img
                        src={delete8}
                        style={{
                          maxWidth: 450,
                          maxHeight: 300,
                          marginRight: 20
                        }}
                      ></img>
                    </div>
                  </div>
                ) : null}
                {/* End User */}
              </div>
            ) : null}
          </div>

          {}

          {/* Order a product */}
          <div>
            <div onClick={e => this.toggleOrderPanel(e)} className="header">
              Order a product
            </div>
            {this.state.openOrderPanel ? (
              <div className="content">
                <h4>Order a product</h4>
                <h5>
                  - To order a product, you should follow these steps:
                  <h5 style={{ paddingLeft: 30 }}>
                    1. Choose a staff or enter name,phone of that staff for
                    faster search.
                  </h5>
                  <h5 style={{ paddingLeft: 30 }}>
                    2. Choose a customer or enter name,phone of that customer
                    for faster search.
                  </h5>
                  <h5 style={{ paddingLeft: 30 }}>
                    3. Write notes. If you don't have any, just leave a blank
                    space
                  </h5>
                  <h5 style={{ paddingLeft: 30 }}>
                    4. Choose a product and click Add to order
                  </h5>
                  <h5 style={{ paddingLeft: 30 }}>
                    5. When you done, click Order to save an Invoice{" "}
                  </h5>
                </h5>
                <img
                  src={order}
                  style={{ maxWidth: 700, maxHeight: 500 }}
                ></img>
              </div>
            ) : null}
          </div>

          {/* Do a Daily Check */}
          <div>
            <div
              onClick={e => this.toggleDailyCheckPanel(e)}
              className="header"
            >
              Do a Daily Check
            </div>
            {this.state.openDailyCheckPanel ? (
              <div className="content">
                <h4>Do a Daily Check</h4>
                <h5>
                  - After a day, you have to do a Daily Check to update your
                  storage and it helps to make storage report
                </h5>
                <h5>- And to make it, first click add to add a material</h5>
                <img
                  src={dailycheck1}
                  style={{ maxWidth: 650, maxHeight: 400, marginRight: 20 }}
                ></img>
                <h5>
                  - Then follow these steps:
                  <h5 style={{ paddingLeft: 30 }}>
                    1. Choose a material or enter name of that material for
                    faster search.
                  </h5>
                  <h5 style={{ paddingLeft: 30 }}>
                    2. Enter the quantity of that material that we have used.
                  </h5>
                  <h5 style={{ paddingLeft: 30 }}>
                    3. When you done, click Submit to save your storage.
                  </h5>
                </h5>
                <img
                  src={dailycheck2}
                  style={{ maxWidth: 650, maxHeight: 400, marginRight: 20 }}
                ></img>
              </div>
            ) : null}
          </div>

          {/* StorageReport Panel  */}
          <div>
            <div
              onClick={e => this.toggleStorageReportPanel(e)}
              className="header"
            >
              Make a Storage Report
            </div>
            {this.state.openStorageReportPanel ? (
              <div className="content">
                <h4>Make a Storage Report</h4>
                <h5>
                  - To make a storage report, you should follow these steps:
                  <h5 style={{ paddingLeft: 30 }}>
                    1. Choose a material or enter name of that material for
                    faster search.
                  </h5>
                  <h5 style={{ paddingLeft: 30 }}>
                    2. Choose a timeline (note that chart only shows 7 days
                    lastest).
                  </h5>
                </h5>
                <img
                  src={storagereport1}
                  style={{ maxWidth: 650, maxHeight: 400 }}
                ></img>
                <h5>- And now chart will show data in the last 7 days</h5>
              </div>
            ) : null}
          </div>

          {/* SaleReport Panel */}
          <div>
            <div
              onClick={e => this.toggleSaleReportPanel(e)}
              className="header"
            >
              Make a Sale Report
            </div>
            {this.state.openSaleReportPanel ? (
              <div className="content">
                <h4>Make a Sale Report</h4>
                <h5>
                  - To make a sale report, you should follow these steps:
                  <h5 style={{ paddingLeft: 30 }}>
                    1. Choose a material or enter name of that material for
                    faster search.
                  </h5>
                  <h5 style={{ paddingLeft: 30 }}>
                    2. Choose a timeline (note that chart only shows 7 days
                    lastest).
                  </h5>
                </h5>
                <img
                  src={salereport1}
                  style={{ maxWidth: 650, maxHeight: 400 }}
                ></img>
                <h5>- And now chart will show data in the last 7 days</h5>
              </div>
            ) : null}
          </div>

          {/* /.content */}
        </div>
      </Fragment>
    );
  }
}

export default Help;
