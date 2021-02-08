import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// Redux
import { connect } from 'react-redux';
import { markNotificationsAsRead } from '../../redux/actions/userActions';

import {
  Badge,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  ListGroupItem,
  ListGroup,
  Row,
  Col
} from "reactstrap";

// Post date management
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
//For Dayjs Relative Time plugin to function
dayjs.extend(relativeTime);

class NotificationsDropdown extends Component{
	state = {
		dropdownOpen: false
	}

	handleOpen = () => {
		let unreadNotificationsIds = this.props.notifications
			.filter(notif => !notif.read)
			.map(notif => notif.notificationId);

			this.props.markNotificationsAsRead(unreadNotificationsIds);
	}

	dropdownToggle = () => {
		this.setState({ dropdownOpen: !this.state.dropdownOpen });
	}

	render(){
		const { notifications } = this.props;

		let notificationIcon;
		let unreadNotificationCount;

		if(notifications && notifications.length > 0){
			unreadNotificationCount = notifications.filter(notification => notification.read === false).length;

			// notificationIcon = (this.state.unreadNotifs) ?
			notificationIcon = (unreadNotificationCount  > 0) ?
			(<Badge color="warning" style={{color: "#ff5252", marginLeft: "2px"}}>
				{unreadNotificationCount}
            </Badge>
            ):(null)
		}

		let notificationsMarkup;
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
						<ListGroupItem
	                        className="list-group-item-action"
	                        style={{ borderBottomWidth: "0px" }}
	                    >
	                        <Row className="align-items-center">
	                          <Col className="col-auto">
	                            <img
	                              alt="..."
	                              className="avatar rounded-circle"
	                              src={senderImg}
	                            />
	                          </Col>
	                          <div className="col ml--2">
	                            <div className="d-flex justify-content-between align-items-center">
	                              <div>
	                                <h4 className="mb-0 text-sm">{sender}</h4>
	                              </div>
	                              <div className="text-right text-muted">
	                                {!read ? (<span className="text-info mr-1">●</span>) : (null) }
	                                <small>{time}</small>
	                              </div>
	                            </div>
	                            <p className="text-sm mb-0">
	                              {type === 'like' ? `${sender} liked your post` : `${sender} commented on your post`}
	                            </p>
	                          </div>
	                        </Row>
	                    </ListGroupItem>
                    </Link>
				)
			})
		} else{
			notificationsMarkup = (
				<ListGroupItem>
                	<Row className="align-items-center">
	                	<div className="px-3 py-3">
	                    	<h6 className="text-sm text-muted m-0">You have no notifications yet!</h6>
                    	</div>
	                </Row>
	              </ListGroupItem>
				)
		}


		return(
			<Fragment>
				<UncontrolledDropdown 
					isOpen={this.state.dropdownOpen}
					toggle={this.dropdownToggle}
					onClick={this.handleOpen}
					nav
				>
                  <DropdownToggle className="nav-link" color="" tag="a">
                    <i className="ni ni-bell-55" /> 
                    {notificationIcon}
                  </DropdownToggle>
                  <DropdownMenu
                    className="dropdown-menu-xl py-0 overflow-hidden"
                    right
                  >
                    {<div className="px-3 py-3">
                      <h6 className="text-sm text-muted m-0">
                        {
                        	unreadNotificationCount > 0 ? (
                        		<Fragment>You have <strong className="text-info">{unreadNotificationCount}</strong> new notifications</Fragment>
                        		):(
                        		<span>No unread notifications</span>
                        		)
                        }
                      </h6>
                    </div>}

                    <ListGroup flush>
                    	{notificationsMarkup}
                    	
                    	{/* Placeholder Notification Start */}
                      {/*<ListGroupItem
                        className="list-group-item-action"
                        onClick={e => e.preventDefault()}
                      >
                      
                        <Row className="align-items-center">
                          <Col className="col-auto">
                            <img
                              alt="..."
                              className="avatar rounded-circle"
                              src={require("assets/img/theme/team-1.jpg")}
                            />
                          </Col>
                          <div className="col ml--2">
                            <div className="d-flex justify-content-between align-items-center">
                              <div>
                                <h4 className="mb-0 text-sm">John Snow</h4>
                              </div>
                              <div className="text-right text-muted">
                                <span className="text-info mr-1">●</span><small>2 hrs ago</small>
                              </div>
                            </div>
                            <p className="text-sm mb-0">
                              Let's meet at Starbucks at 11:30. Wdyt?
                            </p>
                          </div>
                        </Row>
                      </ListGroupItem>
                      <ListGroupItem
                        className="list-group-item-action"
                        href="#pablo"
                        onClick={e => e.preventDefault()}
                        tag="a"
                      >
                        <Row className="align-items-center">
                          <Col className="col-auto">
                            <img
                              alt="..."
                              className="avatar rounded-circle"
                              src={require("assets/img/theme/team-2.jpg")}
                            />
                          </Col>
                          <div className="col ml--2">
                            <div className="d-flex justify-content-between align-items-center">
                              <div>
                                <h4 className="mb-0 text-sm">John Snow</h4>
                              </div>
                              <div className="text-right text-muted">
                                <small>3 hrs ago</small>
                              </div>
                            </div>
                            <p className="text-sm mb-0">
                              A new issue has been reported for Argon.
                            </p>
                          </div>
                        </Row>
                      </ListGroupItem>
                      <ListGroupItem
                        className="list-group-item-action"
                        href="#pablo"
                        onClick={e => e.preventDefault()}
                        tag="a"
                      >
                        <Row className="align-items-center">
                          <Col className="col-auto">
                            <img
                              alt="..."
                              className="avatar rounded-circle"
                              src={require("assets/img/theme/team-3.jpg")}
                            />
                          </Col>
                          <div className="col ml--2">
                            <div className="d-flex justify-content-between align-items-center">
                              <div>
                                <h4 className="mb-0 text-sm">John Snow</h4>
                              </div>
                              <div className="text-right text-muted">
                                <small>5 hrs ago</small>
                              </div>
                            </div>
                            <p className="text-sm mb-0">
                              Your posts have been liked a lot.
                            </p>
                          </div>
                        </Row>
                      </ListGroupItem>
                      <ListGroupItem
                        className="list-group-item-action"
                        href="#pablo"
                        onClick={e => e.preventDefault()}
                        tag="a"
                      >
                        <Row className="align-items-center">
                          <Col className="col-auto">
                            <img
                              alt="..."
                              className="avatar rounded-circle"
                              src={require("assets/img/theme/team-4.jpg")}
                            />
                          </Col>
                          <div className="col ml--2">
                            <div className="d-flex justify-content-between align-items-center">
                              <div>
                                <h4 className="mb-0 text-sm">John Snow</h4>
                              </div>
                              <div className="text-right text-muted">
                                <small>2 hrs ago</small>
                              </div>
                            </div>
                            <p className="text-sm mb-0">
                              Let's meet at Starbucks at 11:30. Wdyt?
                            </p>
                          </div>
                        </Row>
                      </ListGroupItem>
                      <ListGroupItem
                        className="list-group-item-action"
                        href="#pablo"
                        onClick={e => e.preventDefault()}
                        tag="a"
                      >
                        <Row className="align-items-center">
                          <Col className="col-auto">
                            <img
                              alt="..."
                              className="avatar rounded-circle"
                              src={require("assets/img/theme/team-5.jpg")}
                            />
                          </Col>
                          <div className="col ml--2">
                            <div className="d-flex justify-content-between align-items-center">
                              <div>
                                <h4 className="mb-0 text-sm">John Snow</h4>
                              </div>
                              <div className="text-right text-muted">
                                <small>3 hrs ago</small>
                              </div>
                            </div>
                            <p className="text-sm mb-0">
                              A new issue has been reported for Argon.
                            </p>
                          </div>
                        </Row>
                      </ListGroupItem>
                  	*/}
                  	{/* Placeholder Notifications End */}

                    </ListGroup>

                    <DropdownItem
                      className="text-center text-info font-weight-bold py-3"
                      href="#pablo"
                      onClick={e => e.preventDefault()}
                    >
                      View all
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
			</Fragment>
		)
	}
}

const mapStateToProps = (state) => ({
	notifications: state.user.notifications
})

const mapActionsToProps = {
	markNotificationsAsRead
}

NotificationsDropdown.propTypes = {
	markNotificationsAsRead: PropTypes.func.isRequired,
	notifications: PropTypes.array.isRequired
}

export default connect(mapStateToProps, mapActionsToProps)(NotificationsDropdown);