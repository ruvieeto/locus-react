import React, { Component, Fragment } from "react";

// reactstrap components
import {
  Container,
  Row,
  Col
} from "reactstrap";

// core components
import PlainHeader from "components/Headers/PlainHeader.js";
import RecentPosts from './RecentPosts';
import ProfileCard from '../components/ProfileCard';

class Dashboard extends Component {
  render() {
    return (
      <Fragment>
        <PlainHeader name="Home" parentName="Timeline" />
        <Container className="mt--6" fluid>
          <Row>
            <Col xl="8">
              <RecentPosts />
            </Col>
            <Col className="order-xl-2" xl="4">
              <ProfileCard />
            </Col>
          </Row>
        </Container>
      </Fragment>
    );
  }
}

export default Dashboard;
