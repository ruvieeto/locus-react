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
			notificationsMarkup = null
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
                        		<Fragment>
                        			You have <strong className="text-info">{unreadNotificationCount}</strong> new notification
                        			{unreadNotificationCount === 1 ? null : "s"}
                        		</Fragment>
                        		):(
                        		<span>No unread notifications</span>
                        		)
                        }
                      </h6>
                    </div>}

                    <ListGroup flush>
                    	{notificationsMarkup}
                    </ListGroup>

                    <Link to="/admin/notifications">
	                    <DropdownItem className="text-center text-info font-weight-bold py-3">
	                      View all
	                    </DropdownItem>
                    </Link>
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