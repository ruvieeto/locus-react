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
import React, { Fragment, Component } from "react";
// react library for routing
import { Route, Switch, Redirect } from "react-router-dom";
// core components
import AdminNavbar from "components/Navbars/AdminNavbar.js";
import AdminFooter from "components/Footers/AdminFooter.js";
import Sidebar from "components/Sidebar/Sidebar.js";

import Dashboard from "views/pages/dashboards/Dashboard.js";
import Notifications from "views/pages/components/Notifications.js";
import Profile from "views/pages/examples/Profile.js";

// User Pages Route
import User from "../views/pages/dashboards/User.js";

import routes from "routes.js";

class Admin extends Component {
  state = {
    sidenavOpen: true
  };

  componentDidUpdate(e) {
    if (e.history.location.pathname === e.location.pathname) {
      this.scrollToTop(750);
    }else{
      document.documentElement.scrollTop = 0;
      document.scrollingElement.scrollTop = 0;
      this.refs.mainContent.scrollTop = 0;
    }
  }

  scrollToTop = (duration) => {
    // cancel if already on top
    if (document.scrollingElement.scrollTop === 0) return;

    const cosParameter = document.scrollingElement.scrollTop / 2;
    let scrollCount = 0, oldTimestamp = null;

    const step = (newTimestamp) => {
      if (oldTimestamp !== null) {
        // if duration is 0 scrollCount will be Infinity
        scrollCount += Math.PI * (newTimestamp - oldTimestamp) / duration;
        if (scrollCount >= Math.PI) return document.scrollingElement.scrollTop = 0;
        document.scrollingElement.scrollTop = cosParameter + cosParameter * Math.cos(scrollCount);
      }
      oldTimestamp = newTimestamp;
      window.requestAnimationFrame(step);
    }
    window.requestAnimationFrame(step);
  }

  getBrandText = path => {
    for (let i = 0; i < routes.length; i++) {
      if (
        this.props.location.pathname.indexOf(
          routes[i].layout + routes[i].path
        ) !== -1
      ) {
        return routes[i].name;
      }
    }
    return "Brand";
  };

  // toggles collapse between mini sidenav and normal
  toggleSidenav = e => {
    if (document.body.classList.contains("g-sidenav-pinned")) {
      document.body.classList.remove("g-sidenav-pinned");
      document.body.classList.add("g-sidenav-hidden");
    } else {
      document.body.classList.add("g-sidenav-pinned");
      document.body.classList.remove("g-sidenav-hidden");
    }
    this.setState({
      sidenavOpen: !this.state.sidenavOpen
    });
  };

  render() {
    return (
      <Fragment>
        <Sidebar
          {...this.props}
          routes={routes}
          toggleSidenav={this.toggleSidenav}
          sidenavOpen={this.state.sidenavOpen}
          logo={{
            innerLink: "/admin/dashboard",
            // innerLink: "/",
            imgSrc: require("assets/img/brand/locus-logo.png"),
            imgAlt: "Locus Logo"
          }}
        />
        <div
          className="main-content main-content-top-margin"
          ref="mainContent"
          onClick={this.closeSidenav}
        >
          <AdminNavbar
            {...this.props}
            theme="dark"
            toggleSidenav={this.toggleSidenav}
            sidenavOpen={this.state.sidenavOpen}
            brandText={this.getBrandText(this.props.location.pathname)}
          />
          <Switch>
            <Route exact path="/admin/dashboard" render={(props) => <Dashboard {...props} key={Date.now()} />} />
            <Route exact path="/admin/notifications" render={(props) => <Notifications {...props} key={Date.now()} />} />
            <Route exact path="/admin/profile" render={(props) => <Profile {...props} key={Date.now()} />} />
            <Route exact path="/users/:handle" render={(props) => <User {...props} key={Date.now()} />} />
            <Route exact path="/users/:handle/post/:postId" render={(props) => <User {...props} key={Date.now()} />} />
            {/* Keys needs passed in so component is unmounted and remounted 
            when navigating from the one component to the same component */}
            <Redirect from="*" to="/admin/dashboard" />
          </Switch>
          <AdminFooter />
        </div>
        {this.state.sidenavOpen ? (
          <div className="backdrop d-xl-none" onClick={this.toggleSidenav} />
        ) : null}
      </Fragment>
    );
  }
}

export default Admin;
