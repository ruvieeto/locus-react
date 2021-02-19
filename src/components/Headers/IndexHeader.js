import React, { Component, Fragment } from "react";
// react library for routing
// import { Link } from "react-router-dom";
// reactstrap components
import { Container, Row, Col } from "reactstrap";

import DemoLogin from '../../util/DemoLogin';

class IndexHeader extends Component {
  render() {
    return (
      <Fragment>
        <div className="header pt-8 pb-7">
          <Container>
            <div className="header-body">
              <Row className="align-items-center">
                <Col lg="6">
                  <div className="pr-5">
                    <h1 className="display-2 text-white font-weight-bold mb-0">
                      Join Locus today 
                    </h1>
                    <h2 className="display-4 text-white font-weight-light">
                      Connect with fellow techies and science geeks from around the world.
                    </h2>
                    <div className="mt-5">
                      <DemoLogin />
                      {/*
                      <Button
                        className="my-2"
                        color="default"
                        to="/auth/login"
                        tag={Link}
                      >
                        Login
                      </Button>
                      */}
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
          </Container>
        </div>
      </Fragment>
    );
  }
}

export default IndexHeader;