import React , { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

// utitlity to conditionally join class names
import classnames from 'classnames';

import { connect } from 'react-redux';
import { likePost, unlikePost } from '../../../redux/actions/dataActions';

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Form,
  Input,
  Media,
  Row,
  Col
} from "reactstrap";

import DeletePost from './DeletePost';

// Post date management
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
//For Dayjs Relative Time plugin to function
dayjs.extend(relativeTime);

class Postcard extends Component {
  // Checks if post is liked by user
  likedPost = (likes) => {
    if(
      likes && 
      likes.find(
        like => like.postId === this.props.post.postId
        )
      ){
      return true
    } else{
      return false
    }
  }

  // Likes post
  likePost = () => {
    this.props.likePost(this.props.post.postId);
  }

  // Unlikes post
  unlikePost = () => {
    this.props.unlikePost(this.props.post.postId);
  }

  render(){
    // Post data
    const { body, createdAt, userHandle, likeCount, commentCount, userImage, postId } = this.props.post;
    const { index } = this.props;

    // Redux mapped  props
    if(this.props.user.loading){
      return null
    }

    const {
      user: { 
        credentials: { imgUrl, handle },
        authenticated,
        likes
      }
    } = this.props;

    const isPostLiked = this.likedPost(likes);

    // Like button. Redirects you to home page if no longer authenticated
    const likeButton = !authenticated ? (
      <Link
        className="like"
        to="/auth/login"
      >
        <i className="ni ni-like-2" />
        <span className="text-muted">
          {likeCount === 0 ? "No": likeCount}
          {likeCount === 1 ? " like": " likes"}
          {likeCount === 0 ? " yet": ""}
        </span>
      </Link>
      ) : ( 
      <Button
        className={classnames("like engage-button", { active: isPostLiked })}
        onClick={isPostLiked ? this.unlikePost : this.likePost}
      >
        <i className="ni ni-like-2" />
        <span className="text-muted">
          {likeCount === 0 ? "No": likeCount}
          {likeCount === 1 ? " like": " likes"}
          {likeCount === 0 ? " yet": ""}
        </span>
      </Button>
    ) 

    // Delete post button
    const deleteButton = authenticated && userHandle === handle ? (
      <DeletePost postId={postId} />
      ) : (null)

    return(
      <Fragment>
        <Card>
          {index<1&&
            <CardHeader>
                <h5 className="h3 mb-0">Activity feed</h5>
            </CardHeader>
          }
          <CardHeader className="d-flex align-items-center">
            <div className="d-flex align-items-center">
              <Link to={`/users/${userHandle}`}>
                <img
                  alt="..."
                  className="avatar"
                  src={userImage || require("assets/img/theme/team-1.jpg")}
                />
              </Link>
              <div className="mx-3">
                <Link
                  className="text-dark font-weight-600 text-sm"
                  to={`/users/${userHandle}`}
                >
                  @{userHandle}
                </Link>
                <small className="d-block text-muted">{dayjs(createdAt.toString()).fromNow()}</small>
              </div>
            </div>
            <div className="text-right ml-auto">
              {deleteButton}
              
            </div>
          </CardHeader>
          <CardBody>
            <p className="mb-4">
              {body}
            </p>
            {/*<img
              alt="..."
              className="img-fluid rounded"
              src={require("assets/img/theme/img-1-1000x600.jpg")}
            />
            <hr/>
            */}

            <Row className="align-items-center my-3 pb-3 border-bottom">
              <Col sm="6">
                <div className="icon-actions">
                  {likeButton}
                  <a href="#pablo" onClick={e => e.preventDefault()}>
                    <i className="ni ni-chat-round" />
                    <span className="text-muted">
                    {commentCount === 0 ? "No": commentCount} 
                    {commentCount === 1 ? " comment": " comments"} 
                    {commentCount === 0 ? " yet": ""}
                    </span>
                  </a>
                </div>
              </Col>
            </Row>

            {/* Comments start */}
            <div className="mb-1">
              <Media className="media-comment">
                <img
                  alt="..."
                  className="avatar avatar-lg media-comment-avatar rounded-circle"
                  src={require("assets/img/theme/team-1.jpg")}
                />
                <Media>
                  <div className="media-comment-text">
                    <h6 className="h5 mt-0">Michael Lewis</h6>
                    <p className="text-sm lh-160">
                      Cras sit amet nibh libero nulla vel metus
                      scelerisque ante sollicitudin. Cras purus odio
                      vestibulum in vulputate viverra turpis.
                    </p>
                  </div>
                </Media>
              </Media>
              <Media className="media-comment">
                <img
                  alt="..."
                  className="avatar avatar-lg media-comment-avatar rounded-circle"
                  src={require("assets/img/theme/team-2.jpg")}
                />
                <Media>
                  <div className="media-comment-text">
                    <h6 className="h5 mt-0">Jessica Stones</h6>
                    <p className="text-sm lh-160">
                      Cras sit amet nibh libero, in gravida nulla. Nulla
                      vel metus scelerisque ante sollicitudin. Cras purus
                      odio, vestibulum in vulputate at, tempus viverra
                      turpis.
                    </p>
                  </div>
                </Media>
              </Media>
              <hr/>
              <Media className="align-items-center">
                <img
                  alt="..."
                  className="avatar avatar-lg rounded-circle mr-4"
                  src={imgUrl}
                />
                <Media body>
                  <Form>
                    <Input
                      placeholder="Write your comment..."
                      rows="1"
                      type="textarea"
                      resize="none"
                    />
                  </Form>
                </Media>
              </Media>
            </div>
          </CardBody>
        </Card>
      </Fragment>
    )
  }
}

const mapStateToProps = (state) => ({
  user: state.user
});

const mapActionsToProps = {
  likePost,
  unlikePost
};

Postcard.propTypes = {
  user: PropTypes.object.isRequired,
  likePost: PropTypes.func.isRequired,
  unlikePost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired
}

export default connect(mapStateToProps, mapActionsToProps)(Postcard);

// export default Postcard;