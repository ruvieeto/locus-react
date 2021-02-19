import React, { Component, Fragment } from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";

class UserHeader extends Component {
  render() {
    return (
      <Fragment>
        <div className="header pb-6 d-flex align-items-center user-header-image">
          {/*<span className="mask bg-gradient-info opacity-8" />*/}
          <div className="separator separator-bottom separator-skew">
            <svg x="0" y="0" viewBox="0 0 2560 100" preserveAspectRatio="none" version="1.1" xmlns="http://www.w3.org/2000/svg">
              <polygon className="fill-user" points="2560 0 2560 100 0 100"></polygon>
            </svg>
          </div>
        </div>
      </Fragment>
    );
  }
}

UserHeader.propTypes = {
  name: PropTypes.string,
  parentName: PropTypes.string
};

export default UserHeader;