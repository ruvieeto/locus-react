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
import UserProfileCard from '../components/UserProfileCard';

import {
  chartOptions,
  parseOptions
} from "variables/charts.js";

// Redux
import { connect } from 'react-redux';
import { getUserData } from '../../../redux/actions/dataActions';

class User extends Component {
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
    this.props.getUserData(this.props.match.params.handle);
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
    const { handle } = this.props.match.params;
    
    let userPostsMarkup;
    if(loading){
      userPostsMarkup = [<p key={handle}>Loading...</p>]
    } else if (posts === null){
      // Check if user exists
      userPostsMarkup = [<p key={handle}>@{handle} doesn't exist</p>]
    } else if (posts.length === 0){
      // Check if there are are any posts
      userPostsMarkup = [<p key={handle}>@{handle} has no posts yet</p>]
    } else {
      userPostsMarkup = posts.map((post, index) => <Postcard key={post.postId} index={index} post={post} />)
    }

    return (
      <Fragment>
        <PlainHeader name="User Page" parentName="Timeline" />
        <Container className="mt--6" fluid>
          <Row>
            <Col xl="8">
              {userPostsMarkup}
            </Col>
            <Col className="order-xl-2" xl="4">
                {posts !== null ? (<UserProfileCard handle={handle}/>) : null}
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
  getUserData
}

User.propTypes = {
  getUserData: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired
}

export default connect(mapStateToProps, mapActionsToProps)(User);
