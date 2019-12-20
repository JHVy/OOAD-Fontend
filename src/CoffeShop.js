import React, { Component, Fragment } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Menu from "./components/Menu";
import Category from "./components/Content/Category/Category";
import CategoryEdit from "./components/Content/Category/CategoryEdit";
import Member from "./components/Content/Member/Member";
import MemberEdit from "./components/Content/Member/MemberEdit";
import Product from "./components/Content/Product/Product";
import ProductEdit from "./components/Content/Product/ProductEdit";
import PaySlip from "./components/Content/PaySlip/PaySlip";
import PaySlipEdit from "./components/Content/PaySlip/PaySlipEdit";
import MaterialReceiptNoteAdd from "./components/Content/MaterialReceiptNote//MaterialReceiptNoteAdd";
import MaterialReceiptNote from "./components/Content/MaterialReceiptNote//MaterialReceiptNote";
import MaterialReceiptNoteDetail from "./components/Content/MaterialReceiptNote/MaterialReceiptNoteDetail";
import Invoice from "./components/Content/OrderAndInvoices/Invoice";
import StorageReport from "./components/Content/Report/StorageReport";
import SaleReport from "./components/Content/Report/SaleReport";
import DailyCheck from "./components/Content/Report/DailyCheck";
import InvoiceEdit from "./components/Content/OrderAndInvoices/InvoiceEdit";
import OrderScreen from "./components/Content/OrderAndInvoices/OrderScreen";
import Supplier from "./components/Content/Supplier/Supplier";
import SupplierEdit from "./components/Content/Supplier/SupplierEdit";
import ErrorPage from "./components/Content/ErrorPage/ErrorPage";
import Login from "./components/Content/Auth/Login";
import Home from "./components/Content/Home/Home";
import { loadUser } from "./actions/authActions";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Loader from "react-loader";
import { Route, Switch, Redirect } from "react-router-dom";
import Role from "./components/Content/Role/Role";
import RoleEdit from "./components/Content/Role/RoleEdit";
import Material from "./components/Content/Material/Material";
import MaterialEdit from "./components/Content/Material/MaterialEdit";
import User from "./components/Content/User/User";
import UserEdit from "./components/Content/User/UserEdit";
import { PrivateRoute } from "./components/PrivateRoute";
import NoPermissionPage from "./components/Content/ErrorPage/NoPermissionPage";

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  isLoading: state.auth.isLoading,
  history: state.history,
  isLoaded: state.auth.isLoaded,
  user: state.auth.user,
  token: state.auth.token
});
const roles = {
  category: "categoryManagement",
  role: "roleManagement",
  member: "memberManagement",
  product: "productManagement",
  user: "userManagement",
  invoice: "invoiceManagement",
  supplier: "supplierManagement",
  payslip: "payslipManagement",
  material: "materialManagement",
  materialReceiptNote: "materialReceiptNoteManagement"
};
class CoffeShop extends Component {
  state = {
    firstPathname: "/"
  };
  componentDidMount() {
    this.setState({
      firstPathname: this.props.history.history.location.pathname
    });
    this.props.loadUser();
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  render() {
    const { token, isAuthenticated } = this.props;
    return (
      <Fragment>
        {!this.props.isLoaded ? (
          <Loader></Loader>
        ) : (
          <Switch>
            <Route
              exact
              path="/"
              render={() => {
                return !isAuthenticated ? (
                  <Redirect to="/login" />
                ) : (
                  <Redirect to="/home" />
                );
              }}
            />

            <Route
              exact
              path="/login"
              render={() => {
                return !isAuthenticated ? <Login /> : <Redirect to="/home" />;
              }}
            />
            {isAuthenticated && (
              <Fragment>
                <Header />
                <Menu />

                <div className="content-wrapper">
                  <Switch>
                    <Route exact path="/home">
                      <Home />
                    </Route>
                    <Route path="/404">
                      <ErrorPage />
                    </Route>
                    <Route path="/403">
                      <NoPermissionPage />
                    </Route>
                    <PrivateRoute
                      exact
                      path="/category"
                      component={Category}
                      role={roles.category}
                      token={token}
                    ></PrivateRoute>
                    <PrivateRoute
                      exact
                      path="/role"
                      component={Role}
                      role={roles.role}
                      token={token}
                    ></PrivateRoute>
                    <PrivateRoute
                      exact
                      path="/supplier"
                      component={Supplier}
                      role={roles.supplier}
                      token={token}
                    ></PrivateRoute>

                    <PrivateRoute
                      exact
                      path="/member"
                      component={Member}
                      role={roles.member}
                      token={token}
                    ></PrivateRoute>

                    <PrivateRoute
                      exact
                      path="/payslip"
                      component={PaySlip}
                      role={roles.payslip}
                      token={token}
                    ></PrivateRoute>
                    <PrivateRoute
                      exact
                      path="/user"
                      component={User}
                      role={roles.user}
                      token={token}
                    />

                    <PrivateRoute
                      exact
                      path="/invoice"
                      component={Invoice}
                      role={roles.invoice}
                      token={token}
                    ></PrivateRoute>
                    <PrivateRoute
                      exact
                      path="/user/edit/:id"
                      component={UserEdit}
                      role={roles.user}
                      token={token}
                    />

                    <PrivateRoute
                      exact
                      path="/role/edit/:id"
                      component={RoleEdit}
                      role={roles.role}
                      token={token}
                    ></PrivateRoute>
                    <PrivateRoute
                      exact
                      path="/category/edit/:id"
                      component={CategoryEdit}
                      role={roles.category}
                      token={token}
                    ></PrivateRoute>
                    <PrivateRoute
                      exact
                      path="/supplier/edit/:id"
                      component={SupplierEdit}
                      role={roles.supplier}
                      token={token}
                    ></PrivateRoute>
                    <PrivateRoute
                      exact
                      path="/member/edit/:id"
                      component={MemberEdit}
                      role={roles.member}
                      token={token}
                    ></PrivateRoute>
                    <PrivateRoute
                      exact
                      path="/payslip/edit/:id"
                      component={PaySlipEdit}
                      role={roles.payslip}
                      token={token}
                    ></PrivateRoute>
                    <PrivateRoute
                      exact
                      path="/invoice/edit/:id"
                      component={InvoiceEdit}
                      role={roles.invoice}
                      token={token}
                    ></PrivateRoute>

                    <PrivateRoute
                      exact
                      path="/dailycheck"
                      component={DailyCheck}
                      role={roles.material}
                      token={token}
                    />
                    <PrivateRoute
                      exact
                      path="/storageReport"
                      component={StorageReport}
                      role={roles.material}
                      token={token}
                    />
                    <PrivateRoute
                      exact
                      role={roles.material}
                      token={token}
                      path="/material"
                      component={Material}
                    ></PrivateRoute>
                    <PrivateRoute
                      role={roles.material}
                      token={token}
                      exact
                      path="/material/edit/:id"
                      component={MaterialEdit}
                    />
                    <PrivateRoute
                      exact
                      path="/product"
                      role={roles.product}
                      token={token}
                      component={Product}
                    ></PrivateRoute>
                    <PrivateRoute
                      role={roles.product}
                      token={token}
                      exact
                      path="/product/edit/:id"
                      component={ProductEdit}
                    />
                    <PrivateRoute
                      exact
                      path="/materialReceiptNoteAdd"
                      role={roles.materialReceiptNote}
                      token={token}
                      component={MaterialReceiptNoteAdd}
                    ></PrivateRoute>
                    <PrivateRoute
                      exact
                      path="/materialReceiptNote"
                      role={roles.materialReceiptNote}
                      token={token}
                      component={MaterialReceiptNote}
                    ></PrivateRoute>
                    <PrivateRoute
                      role={roles.materialReceiptNote}
                      token={token}
                      exact
                      path="/materialReceiptNote/details/:id"
                      component={MaterialReceiptNoteDetail}
                    />
                    <Route
                      exact
                      path="/orderScreen"
                      component={OrderScreen}
                    ></Route>
                    <Route
                      exact
                      path="/saleReport"
                      component={SaleReport}
                    ></Route>
                    <Route path="*" render={() => <Redirect to="/404" />} />
                  </Switch>
                </div>
                <Footer />
              </Fragment>
            )}
            <Route path="*" render={() => <Redirect to="/login" />} />
          </Switch>
        )}
      </Fragment>
    );
  }
}

Category.propTypes = {
  isAuthenticated: PropTypes.bool,
  isLoading: PropTypes.bool,
  isLoaded: PropTypes.bool,
  user: PropTypes.object
};

export default connect(mapStateToProps, { loadUser })(CoffeShop);
