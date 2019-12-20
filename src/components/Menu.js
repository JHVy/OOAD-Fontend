import React, { Component } from "react";
import { Link } from "react-router-dom";

import { connect } from "react-redux";

class Menu extends Component {
  render() {
    const { username } = this.props.user;
    return (
      <div>
        {/* Left side column. contains the logo and sidebar */}
        <aside className="main-sidebar">
          {/* sidebar: style can be found in sidebar.less */}
          <section className="sidebar">
            {/* Sidebar user panel */}
            <div className="user-panel">
              <div className="pull-left image">
                <img
                  src="dist/img/user2-160x160.jpg"
                  className="img-circle"
                  alt="User"
                />
              </div>
              <div className="pull-left info">
                <p>{username}</p>
                <a href="fake_url">
                  <i className="fa fa-circle text-success" /> Online
                </a>
              </div>
            </div>

            {/* sidebar menu: : style can be found in sidebar.less */}
            <ul className="sidebar-menu" data-widget="tree">
              <li className="header">MAIN NAVIGATION</li>

              <li>
                <Link to="/category">
                  <i className="fa fa-th" /> <span>Category</span>
                </Link>
              </li>
              <li>
                <Link to="/role">
                  <i className="fa fa-th" /> <span>Role</span>
                </Link>
              </li>
              <li>
                <Link to="/member">
                  <i className="fa fa-th" /> <span>Member</span>
                </Link>
              </li>
              <li>
                <Link to="/supplier">
                  <i className="fa fa-th" /> <span>Supplier</span>
                </Link>
              </li>
              <li>
                <Link to="/product">
                  <i className="fa fa-th" /> <span>Product</span>
                  <span className="pull-right-container">
                    <small className="label pull-right bg-green">new</small>
                  </span>
                </Link>
              </li>
              <li>
                <Link to="/material">
                  <i className="fa fa-th" /> <span>Material</span>
                  <span className="pull-right-container">
                    <small className="label pull-right bg-green">new</small>
                  </span>
                </Link>
              </li>
              <li>
                <Link to="/materialReceiptNoteAdd">
                  <i className="fa fa-th" /> <span>Material Receipt Board</span>
                  <span className="pull-right-container">
                    <small className="label pull-right bg-green">new</small>
                  </span>
                </Link>
              </li>
              <li>
                <Link to="/materialReceiptNote">
                  <i className="fa fa-th" /> <span>Material Receipt</span>
                  <span className="pull-right-container">
                    <small className="label pull-right bg-green">new</small>
                  </span>
                </Link>
              </li>
              <li>
                <Link to="/orderScreen">
                  <i className="fa fa-th" /> <span>Order</span>
                </Link>
              </li>
              <li>
                <Link to="/dailycheck">
                  <i className="fa fa-th" /> <span>Daily Check</span>
                </Link>
              </li>
              <li>
                <Link to="/storageReport">
                  <i className="fa fa-th" /> <span>Storage Report</span>
                </Link>
              </li>
              <li>
                <Link to="/saleReport">
                  <i className="fa fa-th" /> <span>Sale Report</span>
                </Link>
              </li>
              <li>
                <Link to="/invoice">
                  <i className="fa fa-th" /> <span>Invoice</span>
                </Link>
              </li>
              <li>
                <Link to="/user">
                  <i className="fa fa-th" /> <span>User</span>
                </Link>
              </li>
              <li>
                <Link to="/payslip">
                  <i className="fa fa-th" /> <span>Payslip</span>
                </Link>
              </li>
              <li>
                <Link to="/help">
                  <i className="fa fa-th" /> <span>Help</span>
                  <span className="pull-right-container">
                    <small className="label pull-right bg-green">new</small>
                  </span>
                </Link>
              </li>
            </ul>
          </section>
          {/* /.sidebar */}
        </aside>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user
});

export default connect(mapStateToProps, null)(Menu);
