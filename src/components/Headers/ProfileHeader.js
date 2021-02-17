import React, { Fragment, Component } from "react";

// reactstrap components
import { Container, Row, Col } from "reactstrap";

class ProfileHeader extends Component {
  render() {
    return (
      <Fragment>
        <div
          className="header pb-6 d-flex align-items-center"
          style={{
            minHeight: "500px",
            backgroundImage:
              'url("' + require("assets/img/theme/pthe-crop2.jpg") + '")',
            backgroundSize: "cover",
            backgroundPosition: "center top",
            filter: "brightness(1.05)"
          }}
        >
          <span className="mask bg-gradient-info opacity-8" />

          <Container className="d-flex align-items-center" fluid>
            <Row>
              <Col lg="7" md="10">
                <h1 className="display-2 text-white">Hello {this.props.handle}</h1>
                <p className="text-white mt-0 mb-5">
                  This is your account page. You can easily update the information
                  that you would like others in the Locus family to know about you.
                </p>
              </Col>
            </Row>
          </Container>
        </div>
      </Fragment>
    );
  }
}

export default ProfileHeader;
