import React, { Fragment, Component } from "react";

// reactstrap components
import { NavItem, NavLink, Nav, Container, Row, Col } from "reactstrap";

class AuthFooter extends Component {
  render() {
    return (
      <Fragment>
        <footer className="py-5" id="footer-main">
          <Container>
            <Row className="align-items-center justify-content-xl-between">
              <Col xl="6">
                <div className="copyright text-center text-xl-left text-muted">
                  © {new Date().getFullYear()}{" "}
                  <a
                    className="font-weight-bold ml-1"
                    href="https://www.ruvieeto.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Ruvie Eto
                  </a>
                </div>
              </Col>
              <Col xl="6">
                <Nav className="nav-footer justify-content-center justify-content-xl-end">
                  <NavItem>
                    <NavLink
                      href="https://www.ruvieeto.com"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Locus Technologies, Inc
                    </NavLink>
                  </NavItem>
                </Nav>
              </Col>
            </Row>
          </Container>
        </footer>
      </Fragment>
    );
  }
}

export default AuthFooter;
