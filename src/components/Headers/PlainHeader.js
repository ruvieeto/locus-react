import React, { Component, Fragment } from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// reactstrap components
import {
  Breadcrumb,
  BreadcrumbItem,
  Container,
  Row,
  Col
} from "reactstrap";

class PlainHeader extends Component {
  render() {
    return (
      <Fragment>
        <div className="header header-dark bg-gradient-info pb-6 drop-margin content__title content__title--calendar">
          <Container fluid>
            <div className="header-body">
              <Row className="align-items-center py-4">
                <Col lg="6" xs="7">
                  <h6 className="fullcalendar-title h2 text-white d-inline-block mb-0">
                    {this.props.name}
                  </h6>{" "}
                  <Breadcrumb
                    className="d-none d-md-inline-block ml-lg-4"
                    listClassName="breadcrumb-links breadcrumb-dark"
                  >
                    <BreadcrumbItem>
                      <a href="#pablo" onClick={e => e.preventDefault()}>
                        <i className="fas fa-home" />
                      </a>
                    </BreadcrumbItem>
                    <BreadcrumbItem>
                      <a href="#pablo" onClick={e => e.preventDefault()}>
                        {this.props.parentName}
                      </a>
                    </BreadcrumbItem>
                  </Breadcrumb>
                </Col>
              </Row>
            </div>
          </Container>
        </div>
      </Fragment>
    );
  }
}

PlainHeader.propTypes = {
  name: PropTypes.string,
  parentName: PropTypes.string
};

export default PlainHeader;
