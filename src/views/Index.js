import React, { Component, Fragment } from "react";

// core components
import IndexNavbar from "components/Navbars/IndexNavbar.js";
import IndexHeader from "components/Headers/IndexHeader.js";
import AuthFooter from "components/Footers/AuthFooter.js";

class Index extends Component {
  render() {
    return (
      <Fragment>
        <div className="home-overlay"></div>
        <div className="home-container">
          <IndexNavbar />
          <div className="main-content">
            <IndexHeader />
          </div>
          <div className="landing-page-footer">
            <AuthFooter />
          </div>
        </div>
      </Fragment>
    );
  }
}

export default Index;
