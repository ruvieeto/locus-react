import React, { Fragment, Component } from "react";
// nodejs library that concatenates classes
import classnames from "classnames";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// reactstrap components
import '../../assets/css/argon-overrides.css';
//overrides to design system

import {
  Collapse,
  UncontrolledDropdown,
  DropdownToggle,
  Media,
  Navbar,
  NavItem,
  Nav,
  Container
} from "reactstrap";

import noImg from '../../assets/img/theme/no-img.png'

class NavbarSkeleton extends Component {

  render() {

    return (
      <Fragment>
        <Navbar
          className={classnames(
            "navbar-top navbar-expand border-bottom",
            { "navbar-dark bg-gradient-info": this.props.theme === "dark" },
            { "navbar-light bg-secondary": this.props.theme === "light" }
          )}
        >
          <Container fluid>
            <Collapse navbar isOpen={true}>
              <Nav className="align-items-center ml-md-auto" navbar>
                <NavItem className="d-xl-none">
                  <div
                    className={classnames(
                      "pr-3 sidenav-toggler",
                      { active: this.props.sidenavOpen },
                      { "sidenav-toggler-dark": this.props.theme === "dark" }
                    )}
                    onClick={this.props.toggleSidenav}
                  >
                    <div className="sidenav-toggler-inner">
                      <i className="sidenav-toggler-line" />
                      <i className="sidenav-toggler-line" />
                      <i className="sidenav-toggler-line" />
                    </div>
                  </div>
                </NavItem>

                {/*Notifications  Dropdown Start */}
                <UncontrolledDropdown nav>
                  <DropdownToggle className="nav-link" color="" tag="a">
                    <i className="ni ni-bell-55" /> 
                  </DropdownToggle>
                </UncontrolledDropdown>
                {/*Notifications  Dropdown End */}

              </Nav>

              {/*Options dropdown start*/}
              <Nav className="align-items-center ml-auto ml-md-0" navbar>
                <UncontrolledDropdown nav>
                  <DropdownToggle className="nav-link pr-0" color="" tag="a">
                    <Media className="align-items-center">
                      <span className="avatar avatar-sm rounded-circle">
                        <img
                          alt="..."
                          src={noImg}
                        />
                      </span>
                      <Media className="ml-2 d-none d-lg-block">
                        <span className="mb-0 text-sm font-weight-bold">
                          <div className="skeleton-line"></div>
                        </span>
                      </Media>
                    </Media>
                  </DropdownToggle>
                </UncontrolledDropdown>
              </Nav>
              {/*Options dropdown start*/}

            </Collapse>
          </Container>
        </Navbar>
      </Fragment>
    );
  }
}

NavbarSkeleton.defaultProps = {
  toggleSidenav: () => {},
  sidenavOpen: false,
  theme: "dark"
};
NavbarSkeleton.propTypes = {
  toggleSidenav: PropTypes.func,
  sidenavOpen: PropTypes.bool,
  theme: PropTypes.oneOf(["dark", "light"])
};

export default NavbarSkeleton;
