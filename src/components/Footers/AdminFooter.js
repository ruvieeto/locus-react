import React, { Fragment, Component } from "react";

// reactstrap components
import { NavItem, NavLink, Nav, Container, Row, Col } from "reactstrap";

class AdminFooter extends Component {
  render() {
    return (
      <Fragment>
        <Container fluid>
          <footer className="footer pt-0">
            <Row className="align-items-center justify-content-lg-between">
              <Col lg="6">
                <div className="copyright text-center text-lg-left text-muted">
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
              <Col lg="6">
                <Nav className="nav-footer justify-content-center justify-content-lg-end">
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
          </footer>
        </Container>
      </Fragment>
    );
  }
}

export default AdminFooter;