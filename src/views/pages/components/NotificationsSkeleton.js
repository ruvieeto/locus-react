import React from 'react';

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

import noImg from '../../../assets/img/theme/no-img.png'

const NotificationsSkeleton = () => {
	
	const singleNotification = (index) => {
		return(
		<ListGroupItem key={index} className="list-group-item-action flex-column align-items-start py-4 px-4">
	      <div className="d-flex w-100 justify-content-between">
	        <div>
	          <div className="d-flex w-100 align-items-center">
	            <img
	              alt="..."
	              className="avatar avatar-xs mr-2"
	              src={noImg}
	            />
	            <h4 className="mb-1">
	        		<div className="skeleton-line-post notif-post-name"></div>
	      		</h4>
	          </div>
	        </div>
	        <small><span className="skeleton-line-p notif-post-date"></span></small>
	      </div>
	      <h4 className="mt-3 mb-1">
	        <div className="skeleton-line-post-name"></div>
	      </h4>
	      <p className="mb-4 skeleton-line-post half-post"></p>
	    </ListGroupItem>)
	}

    const notificationsMarkup = Array.from({ length: 5}, (item, index) => singleNotification(index))

	return(
	        <Container className="mt--6" fluid>
	          <Row className="justify-content-center">
	            <Col className="card-wrapper" lg="8">
	              <Card>
	                <CardHeader>
	                  <h5 className="h3 mb-0">Latest Notifications</h5>
	                </CardHeader>
	                <CardBody className="p-0">
	                  <ListGroup flush>
	                    {notificationsMarkup}
	                  </ListGroup>
	                </CardBody>
	              </Card>
	            </Col>
	          </Row>
	        </Container>
	)
}

export default NotificationsSkeleton;