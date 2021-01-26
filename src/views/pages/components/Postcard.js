import React , { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

// utitlity to conditionally join class names
import classnames from 'classnames';

// Redux
import { connect } from 'react-redux';
import { likePost, unlikePost, getPost, clearPostClick } from '../../../redux/actions/dataActions';

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Modal,
  Row,
  Col
} from "reactstrap";

// Delete post button and confirmation dialog
import DeletePost from './DeletePost';

// Post details and commenting modal
import PostDialog from './PostDialog';

// Post date management
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
//For Dayjs Relative Time plugin to function
dayjs.extend(relativeTime);

class Postcard extends Component {
  constructor(){
    super();
    this.state = {
      // defaultModal: false,
      postModal: false,
      body: "",
      errors: {}
    };
  }

    // Modal Stuff Start
  togglePostModal = () => {
    // this.props.clearErrors();
    this.setState({
      postModal: !this.state.postModal,
    });
  };

  handleOpen = () => {
    this.props.getPost(this.props.post.postId);

    this.setState({
      postModal: true,
    });
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
    // Post data
    const { body, createdAt, userHandle, likeCount, commentCount, userImage, postId } = this.props.post;
    const { index } = this.props;

    // Redux mapped props
    if(this.props.user.loading){
      return null
    }

    const {
      user: { 
        credentials: { handle },
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
            <hr className="thin-rule" />
            {/* <Row className="align-items-center my-3 pb-3 border-bottom"> */}
            <Row className="align-items-center">
              <Col sm="6" className="engagement-bar">
                <div className="icon-actions">
                  {likeButton}
                  <Button
                    className="like engage-button"
                    onClick={()=>{this.handleOpen(); this.props.clearPostClick()}}
                  >
                    <i className="ni ni-chat-round" />
                    <span className="text-muted">
                      {commentCount === 0 ? "No": commentCount} 
                      {commentCount === 1 ? " comment": " comments"} 
                      {commentCount === 0 ? " yet": ""}
                    </span>
                  </Button>
                </div>
              </Col>
            </Row>
            <Modal
              // className="modal-dialog-centered"
              size="lg"
              style={{maxHeight: "90vh", overflowY: "auto"}}
              isOpen={this.state.postModal}
              toggle={this.togglePostModal}
            >
              <PostDialog />
            {/*<PostDialog postId={postId} post={this.props.post} userHandle={userHandle} />*/}
            </Modal>
          
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
  unlikePost,
  getPost,
  clearPostClick
};

Postcard.propTypes = {
  user: PropTypes.object.isRequired,
  likePost: PropTypes.func.isRequired,
  unlikePost: PropTypes.func.isRequired,
  getPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired
}

export default connect(mapStateToProps, mapActionsToProps)(Postcard);

// export default Postcard;