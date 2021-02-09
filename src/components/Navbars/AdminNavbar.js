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

//Redux
import { connect } from 'react-redux';
import { logoutUser } from '../../redux/actions/userActions';

import {
  Collapse,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Media,
  Navbar,
  NavItem,
  Nav,
  Container
} from "reactstrap";

import Notifications from './NotificationsDropdown';
import NavbarSkeleton from './NavbarSkeleton';

class AdminNavbar extends React.Component {

  handleLogout = () =>{
    const { history, logoutUser } = this.props;
    logoutUser(history);
  }

  render() {
    const { user: { loading } } = this.props;

    if(loading){
      return (<NavbarSkeleton />)
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
