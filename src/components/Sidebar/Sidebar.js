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

import { connect } from 'react-redux';

class Sidebar extends React.Component {
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

      if (prop.sidebar) {
        return (
          <NavItem
            className={this.activeRoute(prop.layout + prop.path)}
            key={key}
          >
            <NavLink
              to={prop.layout + prop.path}
              activeClassName=""
              onClick={this.closeSidenav}
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
    // Determining if on a page where user should post from
    let postablePage = false;

    if(this.props.location.pathname.includes("/admin")){
      postablePage = true;
    }

    if(this.props.location.pathname.includes("/home/feed")){
      postablePage = true;
    }

    if(this.props.user.credentials){
      if(
        window.location.pathname.includes(`/users/${this.props.user.credentials.handle}/`) || 
        this.props.location.pathname === `/users/${this.props.user.credentials.handle}`
      ){postablePage = true;}
    }

    // Custom Routes
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
              role="img"
              aria-label="menu toggler"
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
            {
              postablePage ? (
                <Fragment>
                  <hr className="my-3" />
                  <Nav className="mb-md-3" navbar>
                    <NavItem>
                      <NavLink>
                        <AddPost />
                      </NavLink>
                    </NavItem>
                  </Nav>
                </Fragment>
              ):(null)
            }
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
  sidenavOpen: false
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
    // innerLink links within the app with <Link to="...">...</Link> tag
    innerLink: PropTypes.string,
    // outterLink links outside the app with <a href="...">...</a> tag
    outterLink: PropTypes.string,
    // the image src of the logo
    imgSrc: PropTypes.string.isRequired,
    // the alt for the img
    imgAlt: PropTypes.string.isRequired
  })
};

const mapStateToProps = (state) =>({
  user: state.user
})

export default connect(mapStateToProps, null)(Sidebar);
