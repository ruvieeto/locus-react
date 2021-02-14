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
import { Link } from "react-router-dom";
// reactstrap components
import {
  UncontrolledCollapse,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col,
  Button
} from "reactstrap";

class IndexNavbar extends Component {
  render() {
    return (
      <Fragment>
        <Navbar
          className="navbar-horizontal navbar-main navbar-dark bg-info"
          expand="lg"
          id="navbar-main"
        >
          <Container>
            <NavbarBrand to="/" tag={Link}>
              <img
                alt="..."
                src={require("assets/img/brand/locus-logo-white.png")}
              />
            </NavbarBrand>
            <button
              aria-controls="navbar-collapse"
              aria-expanded={false}
              aria-label="Toggle navigation"
              className="navbar-toggler"
              data-target="#navbar-collapse"
              data-toggle="collapse"
              id="navbar-collapse"
              type="button"
            >
              <span className="navbar-toggler-icon" />
            </button>
            <UncontrolledCollapse
              className="navbar-custom-collapse"
              navbar
              toggler="#navbar-collapse"
            >
              <div className="navbar-collapse-header">
                <Row>
                  <Col className="collapse-brand" xs="6">
                    <Link to="/admin/dashboard">
                      <img
                        alt="..."
                        src={require("assets/img/brand/locus-logo.png")}
                      />
                    </Link>
                  </Col>
                  <Col className="collapse-close" xs="6">
                    <button
                      aria-controls="navbar-collapse"
                      aria-expanded={false}
                      aria-label="Toggle navigation"
                      className="navbar-toggler"
                      data-target="#navbar-collapse"
                      data-toggle="collapse"
                      id="navbar-collapse"
                      type="button"
                    >
                      <span />
                      <span />
                    </button>
                  </Col>
                </Row>
              </div>
              <Nav className="align-items-lg-center ml-lg-auto" navbar>
                <NavItem>
                  <NavLink to="/auth/login" tag={Link}>
                    <span className="nav-link-inner--text">Login</span>
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink to="/auth/register" tag={Link}>
                    <span className="nav-link-inner--text">Sign Up</span>
                  </NavLink>
                </NavItem>
                <hr className="d-none d-small" />
                <NavItem className="d-none d-small-block">
                  <NavLink onClick={()=>alert("Trying it")}>
                    <span className="btn-inner--icon ml-2">
                      <i className="ni ni ni-spaceship mr-2" />
                    </span>
                    <span className="nav-link-inner--text">Try Demo</span>
                  </NavLink>
                </NavItem>
                <NavItem className="d-none d-lg-block ml-lg-4">
                  <Button
                    className="btn-neutral btn-icon"
                    color="default"
                    onClick={(e) => e.preventDefault()}
                  >
                    <span className="btn-inner--icon">
                      <i className="ni ni ni-spaceship mr-2" />
                    </span>
                    <span className="nav-link-inner--text">Try Demo</span>
                  </Button>
                </NavItem>
              </Nav>
            </UncontrolledCollapse>
          </Container>
        </Navbar>
      </Fragment>
    );
  }
}

export default IndexNavbar;
