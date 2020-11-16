import React from "react";
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
import "assets/css/argon-dashboard-pro-react.css";

import HomeLayout from "layouts/Admin.js";
// import RTLLayout from "layouts/RTL.js";
import AuthLayout from "layouts/Auth.js";
import IndexView from "views/Index.js";

// Handling Web Tokens and Auth
import AuthRoute from "util/AuthRoute";
import jwtDecode from 'jwt-decode';

let authenticated;
const token = localStorage.FBIdToken;
if(token){
  const decodedToken = jwtDecode(token);
  if(decodedToken.exp * 1000 < Date.now()){
    authenticated = false;
    // if(window.location.href !== 'http://localhost:3000/auth/login'){
    //   window.location.href = '/auth/login';
    // }
  } else {
    authenticated = true;
  }
}

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/admin" render={props => <HomeLayout {...props} />} />
        <AuthRoute path="/auth" component={AuthLayout} authenticated={authenticated}/>
        <Route exact path="/" render={props => <IndexView {...props} />} />
        <Redirect from="*" to="/" />
      </Switch>
    </Router>
  )
}

export default App;