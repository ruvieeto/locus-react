import React, { Component, Fragment } from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// reactstrap components
import {
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