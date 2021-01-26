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
import React, { Fragment } from "react";
// react library for routing
import { NavLink as NavLinkRRD, Link } from "react-router-dom";
// nodejs library that concatenates classes
import classnames from "classnames";
// nodejs library to set properties for components
import { PropTypes } from "prop-types";
// react library that creates nice scrollbar on windows devices
import PerfectScrollbar from "react-perfect-scrollbar";
// reactstrap components
import {
  Collapse,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav
} from "reactstrap";

import AddPost from '../../views/pages/components/AddPost';

import { clearPostClick } from '../../redux/actions/dataActions';
import { connect } from 'react-redux';

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapseOpen: false,
      ...this.getCollapseStates(props.routes)
    };
  }
  // verifies if routeName is the one active (in browser input)
  activeRoute = routeName => {
    return this.props.location.pathname.indexOf(routeName) > -1 ? "active" : "";
  };
  // makes the sidenav normal on mouseenter
  onMouseEnterSidenav = () => {
    if (!document.body.classList.contains("g-sidenav-pinned")) {
      document.body.classList.add("g-sidenav-show");
      // Post button
      document.getElementById("navbar-post-button").classList.remove("hide-navbar-button-text");
    }
  };
  // makes the sidenav mini on mouseleave
  onMouseLeaveSidenav = () => {
    if (!document.body.classList.contains("g-sidenav-pinned")) {
      document.body.classList.remove("g-sidenav-show");
      // Post button
      document.getElementById("navbar-post-button").classList.add("hide-navbar-button-text");

    }
  };
  // toggles collapse between opened and closed (true/false)
  toggleCollapse = () => {
    this.setState({
      collapseOpen: !this.state.collapseOpen
    });
  };
  // closes the collapse
  closeCollapse = () => {
    this.setState({
      collapseOpen: false
    });
  };
  // this creates the intial state of this component based on the collapse routes
  // that it gets through this.props.routes
  getCollapseStates = routes => {
    let initialState = {};
    routes.map((prop, key) => {
      if (prop.collapse) {
        initialState = {
          [prop.state]: this.getCollapseInitialState(prop.views),
          ...this.getCollapseStates(prop.views),
          ...initialState
        };
      }
      return null;
    });
    return initialState;
  };
  // this verifies if any of the collapses should be default opened on a rerender of this component
  // for example, on the refresh of the page,
  // while on the src/views/forms/RegularForms.js - route /admin/regular-forms
  getCollapseInitialState(routes) {
    for (let i = 0; i < routes.length; i++) {
      if (routes[i].collapse && this.getCollapseInitialState(routes[i].views)) {
        return true;
      } else if (window.location.href.indexOf(routes[i].path) !== -1) {
        return true;
      }
    }
    return false;
  }
  // this is used on mobile devices, when a user navigates
  // the sidebar will autoclose
  closeSidenav = () => {
    if (window.innerWidth < 1200) {
      this.props.toggleSidenav();
    }
  };
  // this function creates the links and collapses that appear in the sidebar (left menu)
  createLinks = routes => {
    return routes.map((prop, key) => {
      if (prop.redirect) {
        return null;
      }
      // *********** No collapsed options anymore so this isn't really needed. Keeping in case needed later.
      // if (prop.collapse) {
      //   var st = {};
      //   st[prop["state"]] = !this.state[prop.state];
      //   return (
      //     <NavItem key={key}>
      //       <NavLink
      //         href="#pablo"
      //         data-toggle="collapse"
      //         aria-expanded={this.state[prop.state]}
      //         className={classnames({
      //           active: this.getCollapseInitialState(prop.views)
      //         })}
      //         onClick={e => {
      //           e.preventDefault();
      //           this.setState(st);
      //         }}
      //       >
      //         {prop.icon ? (
      //           <Fragment>
      //             <i className={prop.icon} />
      //             <span className="nav-link-text">{prop.name}</span>
      //           </Fragment>
      //         ) : prop.miniName ? (
      //           <Fragment>
      //             <span className="sidenav-mini-icon"> {prop.miniName} </span>
      //             <span className="sidenav-normal"> {prop.name} </span>
      //           </Fragment>
      //         ) : null}
      //       </NavLink>
      //       <Collapse isOpen={this.state[prop.state]}>
      //         <Nav className="nav-sm flex-column">
      //           {this.createLinks(prop.views)}
      //         </Nav>
      //       </Collapse>
      //     </NavItem>
      //   );
      // }
      if (prop.sidebar) {
        return (
          <NavItem
            className={this.activeRoute(prop.layout + prop.path)}
            key={key}
          >
            <NavLink
              to={prop.layout + prop.path}
              activeClassName=""
              onClick={()=>{this.closeSidenav(); this.props.clearPostClick(); }}
              tag={NavLinkRRD}
            >
              {prop.icon !== undefined ? (
                <Fragment>
                  <i className={prop.icon} />
                  <span className="nav-link-text">{prop.name}</span>
                </Fragment>
              ) : prop.miniName !== undefined ? (
                <Fragment>
                  <span className="sidenav-mini-icon"> {prop.miniName} </span>
                  <span className="sidenav-normal"> {prop.name} </span>
                </Fragment>
              ) : (
                prop.name
              )}
            </NavLink>
          </NavItem>
        );
      }

      return null;
    });
  };

  render() {
    const { routes, logo } = this.props;
    let navbarBrandProps;
    if (logo && logo.innerLink) {
      navbarBrandProps = {
        to: logo.innerLink,
        tag: Link
      };
    } else if (logo && logo.outterLink) {
      navbarBrandProps = {
        href: logo.outterLink,
        target: "_blank"
      };
    }
    const scrollBarInner = (
      <div className="scrollbar-inner">
        <div className="sidenav-header d-flex align-items-center">
          {logo &&
            <NavbarBrand {...navbarBrandProps}>
              <img
                alt={logo.imgAlt}
                className="navbar-brand-img"
                src={logo.imgSrc}
              />
            </NavbarBrand>
          }
          <div className="ml-auto">
            <div
              className={classnames("sidenav-toggler d-none d-xl-block", {
                active: this.props.sidenavOpen
              })}
              onClick={this.props.toggleSidenav}
            >
              <div className="sidenav-toggler-inner">
                <i className="sidenav-toggler-line" />
                <i className="sidenav-toggler-line" />
                <i className="sidenav-toggler-line" />
              </div>
            </div>
          </div>
        </div>
        <div className="navbar-inner">
          <Collapse navbar isOpen={true}>
            <Nav navbar>{this.createLinks(routes)}</Nav>
            
            {/*Break before new post button*/}
            <hr className="my-3" />
            <Nav className="mb-md-3" navbar>
              <NavItem>
                <NavLink>
                  <AddPost />
                </NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </div>
      </div>
    );
    return (
      <Navbar
        className={
          "sidenav navbar-vertical navbar-expand-xs navbar-light bg-white fixed-left"
        }
        onMouseEnter={this.onMouseEnterSidenav}
        onMouseLeave={this.onMouseLeaveSidenav}
      >
        {navigator.platform.indexOf("Win") > -1 ? (
          <PerfectScrollbar>{scrollBarInner}</PerfectScrollbar>
        ) : (
          scrollBarInner
        )}
      </Navbar>
    );
  }
}

Sidebar.defaultProps = {
  routes: [{}],
  toggleSidenav: () => {},
  sidenavOpen: false,
  rtlActive: false
};

Sidebar.propTypes = {
  // function used to make sidenav mini or normal
  toggleSidenav: PropTypes.func,
  // prop to know if the sidenav is mini or normal
  sidenavOpen: PropTypes.bool,
  // links that will be displayed inside the component
  routes: PropTypes.arrayOf(PropTypes.object),
  // logo
  logo: PropTypes.shape({
    // innerLink is for links that will direct the user within the app
    // it will be rendered as <Link to="...">...</Link> tag
    innerLink: PropTypes.string,
    // outterLink is for links that will direct the user outside the app
    // it will be rendered as simple <a href="...">...</a> tag
    outterLink: PropTypes.string,
    // the image src of the logo
    imgSrc: PropTypes.string.isRequired,
    // the alt for the img
    imgAlt: PropTypes.string.isRequired
  }),
  // rtl active, this will make the sidebar to stay on the right side
  rtlActive: PropTypes.bool
};

const mapActionsToProps = {
  clearPostClick
}
export default connect(null, mapActionsToProps)(Sidebar);
