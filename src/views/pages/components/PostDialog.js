import React , { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

// utitlity to conditionally join class names
import classnames from 'classnames';

// Redux
import { connect } from 'react-redux';
import { likePost, unlikePost } from '../../../redux/actions/dataActions';

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Row,
  Col
} from "reactstrap";

// Comments
import Comments from './Comments';
import PostcardSkeleton from './PostcardSkeleton';

// Post date management
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
//For Dayjs Relative Time plugin to function
dayjs.extend(relativeTime);

class PostDialog extends Component {
  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit = (event) => {
    event.preventDefault();
  }

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

    if(this.props.UI.loading){
      return(
          <PostcardSkeleton index={1} />
        )
    }

    // Post data
    const { body, createdAt, userHandle, likeCount, commentCount, userImage, postId, comments } = this.props.post;

    // Redux mapped  props
    if(this.props.user.loading){
      return null
    }

    const {
      user: { 
        // credentials: { handle },
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

    // Comment Button
    const commentButton = (
      <Button
        className="like engage-button btn-no-ml"
        onClick={e => e.preventDefault()}
      >
        <i className="ni ni-chat-round" />
        <span className="text-muted">
          {commentCount === 0 ? "No": commentCount} 
          {commentCount === 1 ? " comment": " comments"} 
          {commentCount === 0 ? " yet": ""}
        </span>
      </Button>
    )

    // Close post button
    const closePostButton = (
      <button
        aria-label="Close"
        className="close"
        type="button"
        onClick={this.props.toggler}
      >
        <span aria-hidden={true}>×</span>
      </button>
    )

    return(
      <Fragment>
        <Card className="mb-0">
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
            {<div className="text-right ml-auto">
              {closePostButton}
            </div>}
          </CardHeader>
          <CardBody>
            <p className="mb-4">
              {body}
            </p>
            <hr className="thin-rule" />
            <Row className="align-items-center my-3 pb-3 border-bottom">
              <Col sm="6">
                <div className="icon-actions">
                  {likeButton}
                  {commentButton}
                </div>
              </Col>
            </Row>
              <Comments comments={comments} postId={postId} />
          </CardBody>
        </Card>
      </Fragment>
    )
  }
}

const mapStateToProps = (state) => ({
  post: state.data.post,
  user: state.user,
  UI: state.UI
});

const mapActionsToProps = {
  likePost,
  unlikePost
};

PostDialog.propTypes = {
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
  likePost: PropTypes.func.isRequired,
  unlikePost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
}

export default connect(mapStateToProps, mapActionsToProps)(PostDialog);