/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import _ from 'lodash';
import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import LoadingOverlay from 'react-loading-overlay';
import { useSelector } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { GlobalStyle } from 'styles/global-styles';
import Navbar from './components/Navbar';
import { NotFoundPage } from './components/NotFoundPage/Loadable';
import PrivateRoute from './components/PrivateRoutes';

import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import ViewListCategory from './pages/Administrator/Category/ViewListCategory';
import AddEditCategory from './pages/Administrator/Category/AddEditCategory/AddEditCategory';
import ViewListStates from './pages/Administrator/State/ListStates';
import AddEditStates from './pages/Administrator/State/AddEditStates/AddEditStates';
import ViewListDistrict from './pages/Administrator/Districts/ViewListDistrict';
import ViewListCity from './pages/Administrator/City/ViewListCity';
import AddEditCity from './pages/Administrator/City/AddEditCity/AddEditCity';
import AddEditDistrict from './pages/Administrator/Districts/AddEditDistricts/AddEditDistrict';
import ViewAllVendors from './pages/Vendors/ListAllVendors/ListAllVendors';
import ViewVerifiedVendors from './pages/Vendors/ListVerifiedVendors/ListVerifiedVendors';
import ViewPendingVendors from './pages/Vendors/ListPendingVendors/ListPendingVendors';
import ViewRejectedVendors from './pages/Vendors/ListRejectedVendors/ListRejectedVendors';
import AddAdminSignUp from './pages/Administrator/AdminSignUp/AddAdminSignUp';
import ViewOfferTags from './pages/Tags/OfferTags/ViewOfferTags';
import AddEditOfferTags from './pages/Tags/OfferTags/AddEditOfferTag/AddEditOfferTags';
import ViewProductTags from './pages/Tags/ProductTags/ViewProductTags';
import AddEditProductTags from './pages/Tags/ProductTags/AddEditProductTags/AddEditProductTags';


export function App() {
  const { i18n } = useTranslation();
  const isLoading = useSelector(state => _.get(state, 'session.isLoading'));
  let isSelfSigned = process.env.REACT_APP_SELF;

  return (
    <BrowserRouter basename="/admin">
      <Helmet
        titleTemplate="%s - SDS OFFER"
        defaultTitle="SDS OFFER"
        htmlAttributes={{ lang: i18n.language }}
      >
        <meta name="description" content="SDS OFFER admin panel" />
      </Helmet>
      <LoadingOverlay active={isLoading} spinner text="Loading ...">
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <Switch>
          <Route exact path="/" component={Login} />
          <PrivateRoute path="/navbar" component={Navbar} />
          <PrivateRoute path="/dashboard" component={Dashboard} />
          <PrivateRoute path="/AdminSignUp" component={AddAdminSignUp} />

          {/*----------- CATEGORY ------------*/}

          <PrivateRoute
            path="/ListCategory"
            component={ViewListCategory}
          />
          <PrivateRoute
            path="/AddCategory"
            component={AddEditCategory}
            pageMode="add"
          />
          <PrivateRoute
            path="/EditCategory"
            component={AddEditCategory}
            pageMode="edit"
          />

          {/*----------- STATES ------------*/}

          <PrivateRoute
            path="/ListStates"
            component={ViewListStates}
          />
          <PrivateRoute
            path="/AddStates"
            component={AddEditStates}
            pageMode="add"
          />
          <PrivateRoute
            path="/EditStates"
            component={AddEditStates}
            pageMode="edit"
          />

          {/*----------- DISTRICT ------------*/}

          <PrivateRoute
            path="/ListDistrict"
            component={ViewListDistrict}
          />
          <PrivateRoute
            path="/AddDistrict"
            component={AddEditDistrict}
            pageMode="add"
          />
          <PrivateRoute
            path="/EditDistrict"
            component={AddEditDistrict}
            pageMode="edit"
          />

          {/*----------- CITY ------------*/}

          <PrivateRoute
            path="/ListCity"
            component={ViewListCity}
          />
          <PrivateRoute
            path="/AddCity"
            component={AddEditCity}
            pageMode="add"
          />
          <PrivateRoute
            path="/EditCity"
            component={AddEditCity}
            pageMode="edit"
          />

          {/*----------- VENDORS ------------*/}

          <PrivateRoute
            path="/ListAllVendors"
            component={ViewAllVendors}
          />

          <PrivateRoute
            path="/ListVerifiedVendors"
            component={ViewVerifiedVendors}
          />

          <PrivateRoute
            path="/ListPendingVendors"
            component={ViewPendingVendors}
          />

          <PrivateRoute
            path="/ListRejectedVendors"
            component={ViewRejectedVendors}
          />

          {/*----------- OFFER TAGS ------------*/}

          <PrivateRoute
            path="/ViewOfferTags"
            component={ViewOfferTags}
          />
          <PrivateRoute
            path="/AddOfferTags"
            component={AddEditOfferTags}
            pageMode="add"
          />
          <PrivateRoute
            path="/EditOfferTags"
            component={AddEditOfferTags}
            pageMode="edit"
          />

          {/*----------- PRODUCT TAGS ------------*/}

          <PrivateRoute
            path="/ViewProductTags"
            component={ViewProductTags}
          />
          <PrivateRoute
            path="/AddProductTags"
            component={AddEditProductTags}
            pageMode="add"
          />
          <PrivateRoute
            path="/EditProductTags"
            component={AddEditProductTags}
            pageMode="edit"
          />



          <Route component={NotFoundPage} />
        </Switch>
      </LoadingOverlay>

      <GlobalStyle />
    </BrowserRouter>
  );
}
