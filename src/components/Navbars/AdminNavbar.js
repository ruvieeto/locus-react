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
// nodejs library that concatenates classes
import classnames from "classnames";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// reactstrap components
import '../../assets/css/argon-overrides.css';
//overrides to design system

import { Link } from 'react-router-dom';
// import dayjs from 'dayjs';

//Redux
import { connect } from 'react-redux';
import { logoutUser } from '../../redux/actions/userActions';

import {
  Collapse,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Media,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container
} from "reactstrap";

import Notifications from './NotificationsDropdown';

class AdminNavbar extends React.Component {
  // function that on mobile devices makes the search open
  openSearch = () => {
    document.body.classList.add("g-navbar-search-showing");
    setTimeout(function() {
      document.body.classList.remove("g-navbar-search-showing");
      document.body.classList.add("g-navbar-search-show");
    }, 150);
    setTimeout(function() {
      document.body.classList.add("g-navbar-search-shown");
    }, 300);
  };
  // function that on mobile devices makes the search close
  closeSearch = () => {
    document.body.classList.remove("g-navbar-search-shown");
    setTimeout(function() {
      document.body.classList.remove("g-navbar-search-show");
      document.body.classList.add("g-navbar-search-hiding");
    }, 150);
    setTimeout(function() {
      document.body.classList.remove("g-navbar-search-hiding");
      document.body.classList.add("g-navbar-search-hidden");
    }, 300);
    setTimeout(function() {
      document.body.classList.remove("g-navbar-search-hidden");
    }, 500);
  };

  handleLogout = () =>{
    const { history, logoutUser } = this.props;
    logoutUser(history);
  }

  render() {
    const { user: { loading } } = this.props;

    if(loading){
      return (<p>loading</p>)
    }

    const {
      user: { 
        credentials: { handle, imgUrl }
      }
    } = this.props;

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
              {/* Search bar end*/}
              <Form
                className={classnames(
                  "navbar-search form-inline mr-sm-3",
                  { "navbar-search-light": this.props.theme === "dark" },
                  { "navbar-search-dark": this.props.theme === "light" }
                )}
              >
                <FormGroup className="mb-0">
                  <InputGroup className="input-group-alternative input-group-merge">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="fas fa-search" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="Search" type="text" />
                  </InputGroup>
                </FormGroup>
                <button
                  aria-label="Close"
                  className="close"
                  type="button"
                  onClick={this.closeSearch}
                >
                  <span aria-hidden={true}>×</span>
                </button>
              </Form>
              {/* Search bar end*/}

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
                <NavItem className="d-sm-none">
                  <NavLink onClick={this.openSearch}>
                    <i className="ni ni-zoom-split-in" />
                  </NavLink>
                </NavItem>
                {/*Notifications  Dropdown */}
                <Notifications />
              </Nav>

              {/*Options dropdown start*/}
              <Nav className="align-items-center ml-auto ml-md-0" navbar>
                <UncontrolledDropdown nav>
                  <DropdownToggle className="nav-link pr-0" color="" tag="a">
                    <Media className="align-items-center">
                      <span className="avatar avatar-sm rounded-circle">
                        <img
                          alt="..."
                          src={imgUrl}
                        />
                      </span>
                      <Media className="ml-2 d-none d-lg-block">
                        <span className="mb-0 text-sm font-weight-bold">
                          {handle}
                        </span>
                      </Media>
                    </Media>
                  </DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem className="noti-title" header tag="div">
                      <h6 className="text-overflow m-0">Welcome!</h6>
                    </DropdownItem>
                    <Link to={`/users/${handle}`}>
                      <DropdownItem>
                        <i className="ni ni-single-02" />
                        <span>My profile</span>
                      </DropdownItem>
                    </Link>
                    <Link to={`/admin/profile`}>
                      <DropdownItem>
                        <i className="ni ni-settings-gear-65" />
                        <span>Edit account</span>
                      </DropdownItem>
                    </Link>
                    <Link to={`/`}>
                      <DropdownItem>
                        <i className="ni ni-support-16" />
                        <span>Support</span>
                      </DropdownItem>
                    </Link>
                    <DropdownItem divider />
                    <DropdownItem
                      onClick={this.handleLogout}
                    >
                      <i className="ni ni-user-run" />
                      <span>Logout</span>
                    </DropdownItem>
                  </DropdownMenu>
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
const mapStateToProps = (state) => ({
  user: state.user
});

const mapActionsToProps = {
  logoutUser
};

AdminNavbar.defaultProps = {
  toggleSidenav: () => {},
  sidenavOpen: false,
  theme: "dark"
};
AdminNavbar.propTypes = {
  toggleSidenav: PropTypes.func,
  sidenavOpen: PropTypes.bool,
  theme: PropTypes.oneOf(["dark", "light"]),
  user: PropTypes.object.isRequired,
  logoutUser: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapActionsToProps)(AdminNavbar);
