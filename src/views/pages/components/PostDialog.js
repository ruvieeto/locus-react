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
  Form,
  Input,
  Media,
  // ModalHeader,
  // ModalBody,
  // ModalFooter,
  Row,
  Col
} from "reactstrap";

// Delete post button and confirmation dialog
import DeletePost from './DeletePost';

// Post date management
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
//For Dayjs Relative Time plugin to function
dayjs.extend(relativeTime);

class PostDialog extends Component {
  // state = {
  //   defaultModal: false,
  //   body: "",
  //   errors: {}
  //   };

  //   // Modal Stuff Start
  // toggleModal = () => {
  //   // this.props.clearErrors();
  //   this.setState({
  //     defaultModal: !this.state.defaultModal,
  //   });
  // };

  // handleOpen = () => {
  //   this.setState({
  //     defaultModal: true,
  //   });

  //   this.props.getPost(this.props.postId);
  // }

  // // Modal Stuff End

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

    if(!this.props.post.body){
      return(<div className="html-spinner"></div>)
    }

    // Post data
    // const { UI: { loading } } = this.props;
    const { body, createdAt, userHandle, likeCount, commentCount, userImage, postId } = this.props.post;

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
            <Row className="align-items-center my-3 pb-3 border-bottom">
            {/*<Row className="align-items-center"> */}
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
            {/*Comments start*/}
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
              {/* Field to add your comment start*/}
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
            {/* Field to add your comment end*/}
            </div>
          {/*Comments End*/}

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
  // getPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  // postId: PropTypes.string.isRequired,
  // userHandle: PropTypes.string.isRequired
}

export default connect(mapStateToProps, mapActionsToProps)(PostDialog);