import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// Redux
import { connect } from 'react-redux';
import { markNotificationsAsRead } from '../../redux/actions/userActions';
import { clearPostClick } from '../../redux/actions/dataActions';

import {
  Card,
  CardHeader,
  CardBody,
  ListGroup,
  ListGroupItem,
  Container,
  Row,
  Col
} from "reactstrap";
// core components
import PlainHeader from "components/Headers/PlainHeader.js";
import NotificationsSkeleton from "./components/NotificationsSkeleton";

// Post date management
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
//For Dayjs Relative Time plugin to function
dayjs.extend(relativeTime);

class Notifications extends Component {
  componentDidMount(props){
    this.props.clearPostClick();
  }

  componentWillUnmount(props){
    if(this.props.user.notifications.length > 0){
      let unreadNotificationsIds = this.props.user.notifications
      .filter(notif => !notif.read)
      .map(notif => notif.notificationId);

      this.props.markNotificationsAsRead(unreadNotificationsIds);
    }

    this.props.clearPostClick();
  }

  render() {
    const { notifications, loading } = this.props.user;

    if(loading){
      return(
        <Fragment>
          <PlainHeader name="Notifications" parentName="" />
          <NotificationsSkeleton />
        </Fragment>
      )
    }

    let notificationsMarkup;
    let unreadNotificationCount;

    if(notifications && notifications.length > 0){
      unreadNotificationCount = notifications.filter(notification => notification.read === false).length;
    }

    if(notifications && notifications.length > 0){
      notificationsMarkup = notifications.map(notif => {
        const { 
          sender, 
          senderImg, 
          read, 
          createdAt, 
          type, 
          postId, 
          recipient 
        } = notif;

        const time = dayjs(createdAt).fromNow();

        return(
          <Link 
            to={`/users/${recipient}/post/${postId}`} 
            className="list-group-item-action" 
            key={createdAt}
          >
            <ListGroupItem className="list-group-item-action flex-column align-items-start py-4 px-4">
              <div className="d-flex w-100 justify-content-between">
                <div>
                  <div className="d-flex w-100 align-items-center">
                    <img
                      alt="..."
                      className="avatar avatar-xs mr-2"
                      src={senderImg}
                    />
                    <h5 className="mb-1">{sender}</h5>
                  </div>
                </div>
                <small>{time}</small>
              </div>
              <h4 className="mt-3 mb-1">
                {!read ? (<span className="text-info mr-1">●</span>) : (null) }
                New {type}
              </h4>
              <p className="text-sm mb-0">
                You are getting some engagement on your post!
                <strong>{` ${sender} `}</strong>
                {type === "like" ? "liked your post" : "commented on your post"}
              </p>
            </ListGroupItem>
          </Link>
        )
      })
    } else{
      notificationsMarkup = null
    }

    return (
      <Fragment>
        <PlainHeader name="Notifications" parentName="" />
        <Container className="mt--6" fluid>
          <Row className="justify-content-center">
            <Col className="card-wrapper" lg="8">
              <Card>
                <CardHeader>
                  <h5 className="h3 mb-0">Latest Notifications</h5>
                </CardHeader>
                <CardBody className="p-0">
                  <ListGroup flush>
                    {
                      unreadNotificationCount > 0 &&  
                      <div className="px-3 py-3 border-bottom">
                        <h6 className="text-sm text-muted m-0">
                            You have <strong className="text-info">{unreadNotificationCount}</strong> new notification
                            {unreadNotificationCount === 1 ? null : "s"}
                        </h6>
                      </div>
                    }
                    {notificationsMarkup}
                  </ListGroup>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user
  // notifications: state.user.notifications
})

const mapActionsToProps = {
  markNotificationsAsRead,
  clearPostClick
}

Notifications.propTypes = {
  markNotificationsAsRead: PropTypes.func.isRequired,
  clearPostClick: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
}

export default connect(mapStateToProps, mapActionsToProps)(Notifications);