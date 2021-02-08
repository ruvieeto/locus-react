import React, { useEffect } from "react";

// react library for routing
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";

// bootstrap rtl for rtl support page
// import "assets/vendor/bootstrap-rtl/bootstrap-rtl.scss";

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
import AuthLayout from "layouts/Auth.js";
import IndexView from "views/Index.js";

// Handling Auth and Page Redirects
import AuthRoute from "util/AuthRoute";
import HomeRoute from "util/HomeRoute";

import tokenValidator from './util/tokenValidator';

const App = () => {
  useEffect(()=>{
    tokenValidator();
  }, []);

  return (
    <Router>
      <Switch>
        <HomeRoute path="/admin" component={HomeLayout} />
        <HomeRoute path="/users/:handle" component={HomeLayout} />
        <AuthRoute path="/auth" component={AuthLayout} />
        <Route exact path="/" render={props => <IndexView {...props} />} />
        <Redirect from="*" to="/" />
      </Switch>
    </Router>
  )
}

export default App;