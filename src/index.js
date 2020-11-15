/*!

=========================================================
* Argon Dashboard PRO React - v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-pro-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import ReactDOM from "react-dom";
// react library for routing
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";

// bootstrap rtl for rtl support page
import "assets/vendor/bootstrap-rtl/bootstrap-rtl.scss";
// plugins styles from node_modules
import "react-notification-alert/dist/animate.css";
import "react-perfect-scrollbar/dist/css/styles.css";
// plugins styles downloaded
import "assets/vendor/fullcalendar/dist/fullcalendar.min.css";
import "assets/vendor/sweetalert2/dist/sweetalert2.min.css";
import "assets/vendor/select2/dist/css/select2.min.css";
import "assets/vendor/quill/dist/quill.core.css";
import "assets/vendor/nucleo/css/nucleo.css";
import "assets/vendor/@fortawesome/fontawesome-free/css/all.min.css";
// core styles
// Using CSS instead of SCSS import "assets/scss/argon-dashboard-pro-react.scss?v1.1.0";
import "assets/css/argon-dashboard-pro-react.css";

import HomeLayout from "layouts/Admin.js";
// import RTLLayout from "layouts/RTL.js";
import AuthLayout from "layouts/Auth.js";
import IndexView from "views/Index.js";

// Handling Web Tokens and Auth
import AuthRoute from 'src/util/AuthRoute';
import jwtDecode from 'jwt-decode';

let authenticated;
const token = localStorage.FBIdToken;
if(token){
  const decodedToken = jwtDecode(token);
  if(decodedToken.exp * 1000 < Date.now()){
    window.location.href = '/login';
    authenticated = false;
  } else {
    authenticated = true;
  }
}

ReactDOM.render(
  <Router>
    <Switch>
      <Route path="/admin" render={props => <HomeLayout {...props} />} />
      <Route path="/auth" render={props => <AuthLayout {...props} />} />
      <Route path="/" render={props => <IndexView {...props} />} />
      <Redirect from="*" to="/" />
    </Switch>
  </Router>,
  document.getElementById("root")
);
