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
import PropTypes from 'prop-types';

// javascipt plugin for creating charts
import Chart from "chart.js";

// reactstrap components
import {
  Container,
  Row,
  Col
} from "reactstrap";

// core components
import PlainHeader from "components/Headers/PlainHeader.js";
import Postcard from '../components/Postcard';
import ProfileCard from '../components/ProfileCard';

import {
  chartOptions,
  parseOptions
} from "variables/charts.js";

// Redux
import { connect } from 'react-redux';
import { getPosts } from '../../../redux/actions/dataActions';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeNav: 1,
      chartExample1Data: "data1",
      posts: null
    };
    if (window.Chart) {
      parseOptions(Chart, chartOptions());
    }
  }

  componentDidMount(props){
      this.props.getPosts();
  }

  toggleNavs = (e, index) => {
    e.preventDefault();
    this.setState({
      activeNav: index,
      chartExample1Data:
        this.state.chartExample1Data === "data1" ? "data2" : "data1"
    });
  };

  render() {
    const { posts, loading } = this.props.data;

    let recentPostsMarkup = loading ? (
      <p>Loading...</p>
      ) : posts === null ? (
      null
      ) : (
        posts.map((post, index) => <Postcard key={post.postId} index={index} post={post} />)
      )

    return (
      <Fragment>
        <PlainHeader name="Home" parentName="Timeline" />
        <Container className="mt--6" fluid>
          <Row>
            <Col xl="8">
              {recentPostsMarkup}
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

const mapStateToProps = (state) => ({
  data: state.data
});

const mapActionsToProps = {
  getPosts
}

Dashboard.propTypes = {
  getPosts: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired
}

export default connect(mapStateToProps, mapActionsToProps)(Dashboard);
