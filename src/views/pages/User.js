import React, { Component, Fragment } from "react";
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// reactstrap components
import {
  Button,
  Card,
  CardBody,
  CardText,
  CardTitle,
  Container,
  Row,
  Col
} from "reactstrap";

// react plugin for creating alert notifications
import NotificationAlert from "react-notification-alert";

// core components
import UserHeader from "components/Headers/UserHeader.js";
import Postcard from './components/Postcard';
import UserProfileCard from './components/UserProfileCard';
import PostcardSkeleton from './components/PostcardSkeleton';

// Redux
import { connect } from 'react-redux';
import { getUserData, clearPostClick, resetDeleteNotification } from '../../redux/actions/dataActions';

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: null,
      postIdParam: null
    };
  }

  deleteNotification = () =>{
    // Delete Notification
    let options = {
      place: "bc",
      message: (
        <div className="alert-text">
          <span data-notify="message">
            {" "}
            Post deleted
          </span>
        </div>
      ),
      type: "danger",
      icon: "fas fa-trash",
      autoDismiss: 3
    };
    this.refs.notificationAlert.notificationAlert(options);

    // Reset Success Notification
    this.props.resetDeleteNotification();
  }

  componentDidMount(props){
    this.props.clearPostClick();
    this.props.getUserData(this.props.match.params.handle);

    const postId = this.props.match.params.postId;
    if(postId){
      this.setState({ postIdParam: postId })
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps){
    if(nextProps.data.deleteSuccess){
       this.deleteNotification();
    }
  }

  componentWillUnmount(props){
    this.props.clearPostClick();
  }

  render() {
    const { posts, loading } = this.props.data;
    const { loading: userLoading } = this.props.user;

    const { handle } = this.props.match.params;
    const { postIdParam } = this.state;

    const loadingPosts = Array.from({ length: 4 }).map((item, index) => {
        return <PostcardSkeleton index={index} key={index}/>
      })

    const noUserCard = (
      <Card key={handle}>
        <CardBody>
          <CardTitle className="mb-3" tag="h3">
            Uh-oh
          </CardTitle>
          <CardText className="mb-4">
            <strong>@{handle}</strong> doesn't exist
          </CardText>
          <Button
            color="primary"
            tag={Link}
            to="/home/feed"
          >
            Go back home
          </Button>
        </CardBody>
      </Card>
    )

    const noPosts = (
      <Card key={handle}>
        <CardBody>
          <CardTitle className="mb-3" tag="h3">
            No posts to show
          </CardTitle>
          <CardText className="mb-4">
          {
            handle === this.props.user.credentials.handle ? 
            (
              <Fragment>
                You have not posted yet! <br />When you do post, you'll be able to see all your posts here.
              </Fragment>
            ):(
            <Fragment>
              <strong>@{handle}</strong> has not posted yet! <br />When they do, you'll be able to find their posts here.
            </Fragment>
            )
          }
          </CardText>
        </CardBody>
      </Card>
    )

    let userPostsMarkup;
    if(loading || userLoading){
        userPostsMarkup = loadingPosts;
    } else if (posts === null){
        // Check if user exists
        userPostsMarkup = noUserCard;
    } else if (posts.length === 0){
        // Check if there are are any posts
        userPostsMarkup = noPosts;
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
        <div className="rna-wrapper">
          <NotificationAlert ref="notificationAlert" />
        </div>
        <UserHeader name="User Page" />
        <Container className="mt--8" fluid>
          <Row className="justify-content-center">
            <Col xl="8">
            {posts !== null ? (<UserProfileCard handle={handle}/>) : null}
            {userPostsMarkup}
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
  clearPostClick,
  resetDeleteNotification
}

User.propTypes = {
  getUserData: PropTypes.func.isRequired,
  clearPostClick: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  resetDeleteNotification: PropTypes.func.isRequired
}

export default connect(mapStateToProps, mapActionsToProps)(User);