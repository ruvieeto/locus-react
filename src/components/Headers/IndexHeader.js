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
import React, { Component, Fragment } from "react";
// react library for routing
import { Link } from "react-router-dom";
// reactstrap components
import { Button, Card, CardImg, Container, Row, Col } from "reactstrap";

import landingImg from '../../assets/img/theme/landing.jpg';

class IndexHeader extends Component {
  render() {
    return (
      <Fragment>
        <div className="header bg-info pt-5 pb-7">
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
                      <Button
                        className="btn btn-neutral my-2"
                        color="default"
                        to="/admin/dashboard"
                        tag={Link}
                      >
                        <span className="btn-inner--icon">
                          <i className="ni ni ni-spaceship mr-2" />
                        </span>
                        <span>Try Demo</span>
                      </Button>
                      <Button
                        className="my-2"
                        color="default"
                        to="/auth/login"
                        tag={Link}
                      >
                        Login
                      </Button>
                    </div>
                  </div>
                </Col>
                <Col className="mb-lg-auto col-lg-5">
                  <div className="transform-perspective-right">
                    <Card>
                    <CardImg
                      alt="female face in the stars"
                      src={landingImg}
                    />
                    </Card>
                  </div>
                </Col>
                {/*<Col lg="6">
                  <Row className="pt-5">
                    <Col md="6">
                      <Card>
                        <CardBody>
                          <div className="icon icon-shape bg-gradient-red text-white rounded-circle shadow mb-4">
                            <i className="ni ni-active-40" />
                          </div>
                          <h5 className="h3">Components</h5>
                          <p>
                            Argon comes with over 70 handcrafted components.
                          </p>
                        </CardBody>
                      </Card>
                      <Card>
                        <CardBody>
                          <div className="icon icon-shape bg-gradient-info text-white rounded-circle shadow mb-4">
                            <i className="ni ni-active-40" />
                          </div>
                          <h5 className="h3">Plugins</h5>
                          <p>
                            Fully integrated and extendable third-party plugins
                            that you will love.
                          </p>
                        </CardBody>
                      </Card>
                    </Col>
                    <Col className="pt-lg-5 pt-4" md="6">
                      <Card className="mb-4">
                        <CardBody>
                          <div className="icon icon-shape bg-gradient-success text-white rounded-circle shadow mb-4">
                            <i className="ni ni-active-40" />
                          </div>
                          <h5 className="h3">Pages</h5>
                          <p>
                            From simple to complex, you get a beautiful set of
                            15+ page examples.
                          </p>
                        </CardBody>
                      </Card>
                      <Card className="mb-4">
                        <CardBody>
                          <div className="icon icon-shape bg-gradient-warning text-white rounded-circle shadow mb-4">
                            <i className="ni ni-active-40" />
                          </div>
                          <h5 className="h3">Documentation</h5>
                          <p>
                            You will love how easy is to to work with Argon.
                          </p>
                        </CardBody>
                      </Card>
                    </Col>
                  </Row>
                </Col>*/}
              </Row>
            </div>
          </Container>
          {/*<div className="separator separator-bottom separator-skew zindex-100">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x="0"
              y="0"
            >
              <polygon
                className="fill-default"
                points="2560 0 2560 100 0 100"
              />
            </svg>
          </div>*/}
        </div>
      </Fragment>
    );
  }
}

export default IndexHeader;
