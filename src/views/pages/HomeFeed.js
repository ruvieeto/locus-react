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
import RecentPosts from './components/RecentPosts';
import ProfileCard from './components/ProfileCard';

// react plugin for creating alert notifications
import NotificationAlert from "react-notification-alert";

// Redux
import { connect } from 'react-redux';
import { clearPostClick, resetDeleteNotification } from '../../redux/actions/dataActions';

class HomeFeed extends Component {
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
      icon: "ni ni-fat-delete",
      autoDismiss: 3
    };
    this.refs.notificationAlert.notificationAlert(options);

    // Reset Success Notification
    this.props.resetDeleteNotification();
  }

  componentWillUnmount(props){
    this.props.clearPostClick();
  }

  UNSAFE_componentWillReceiveProps(nextProps){
    if(nextProps.data.deleteSuccess){
       this.deleteNotification();
    }
  }

  render() {
    return (
      <Fragment>
        <div className="rna-wrapper">
            <NotificationAlert ref="notificationAlert" />
        </div>
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

HomeFeed.propTypes = {
  clearPostClick: PropTypes.func.isRequired,
  resetDeleteNotification: PropTypes.func.isRequired
}

const mapStateToProps = (state) =>({
  data: state.data
})

const mapActionsToProps = {
  clearPostClick,
  resetDeleteNotification
}

export default connect(mapStateToProps, mapActionsToProps)(HomeFeed);
