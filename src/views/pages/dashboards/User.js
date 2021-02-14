import React, { Component, Fragment } from "react";
import PropTypes from 'prop-types';

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
import PostcardSkeleton from '../components/PostcardSkeleton';

// Redux
import { connect } from 'react-redux';
import { getUserData, clearPostClick } from '../../../redux/actions/dataActions';

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: null,
      postIdParam: null
    };
  }

  componentDidMount(props){
    this.props.clearPostClick();
    this.props.getUserData(this.props.match.params.handle);

    const postId = this.props.match.params.postId;
    if(postId){
      this.setState({ postIdParam: postId })
    }
  }

  render() {
    const { posts, loading } = this.props.data;
    const { loading: userLoading } = this.props.user;

    const { handle } = this.props.match.params;
    const { postIdParam } = this.state;

    const loadingPosts = Array.from({ length: 4 }).map((item, index) => {
        return <PostcardSkeleton index={index} key={index}/>
      })

    let userPostsMarkup;
    if(loading || userLoading){
        userPostsMarkup = loadingPosts;
    } else if (posts === null){
        // Check if user exists
        userPostsMarkup = [<p key={handle}>@{handle} doesn't exist</p>]
    } else if (posts.length === 0){
        // Check if there are are any posts
        userPostsMarkup = [<p key={handle}>@{handle} has no posts yet</p>]
    } else if (!postIdParam){
      // Checks that route isn't to an individual/specific post
        userPostsMarkup = posts.map((post, index) => <Postcard key={post.postId} index={index} post={post} />)
    } else {
        userPostsMarkup = posts.map((post, index) => {
          if(post.postId !== postIdParam){
            return (<Postcard key={post.postId} index={index} post={post} />)
          } else{
            return (<Postcard key={post.postId} index={index} post={post} openModal />)
          }
        })
    }

    return (
      <Fragment>
        <PlainHeader name="User Page" parentName="Profile" />
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
  data: state.data,
  user: state.user
});

const mapActionsToProps = {
  getUserData,
  clearPostClick
}

User.propTypes = {
  getUserData: PropTypes.func.isRequired,
  clearPostClick: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
}

export default connect(mapStateToProps, mapActionsToProps)(User);