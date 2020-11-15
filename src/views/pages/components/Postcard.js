import React , { Fragment } from 'react';

// node.js library that concatenates classes (strings)
import classnames from "classnames";
// reactstrap components
import {
  Badge,
  Button,
  Card,
  CardHeader,
  CardImg,
  CardBody,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  UncontrolledDropdown,
  Form,
  Input,
  ListGroupItem,
  ListGroup,
  Media,
  NavItem,
  NavLink,
  Nav,
  Progress,
  Table,
  Container,
  Row,
  Col,
  UncontrolledTooltip
} from "reactstrap";


import { Link } from 'react-router-dom';
// Post date management
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

const Postcard = ({ post, index }) => {
	const { body, createdAt, userHandle, likeCount, commentCount, userImage, postId } = post;
	
	//For Dayjs Relative Time plugin to function
	dayjs.extend(relativeTime)

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
                    <Button
                      className="btn-icon"
                      color="primary"
                      size="sm"
                      type="button"
                    >
                      <span className="btn-inner--icon mr-1">
                        <i className="ni ni-fat-add" />
                      </span>
                      <span className="btn-inner--text">Follow</span>
                    </Button>
                  </div>
                </CardHeader>
                <CardBody>
                  <p className="mb-4">
                    {body}
                  </p>
                  <img
                    alt="..."
                    className="img-fluid rounded"
                    src={require("assets/img/theme/img-1-1000x600.jpg")}
                  />
                  <Row className="align-items-center my-3 pb-3 border-bottom">
                    <Col sm="6">
                      <div className="icon-actions">
                        <a
                          className="like active"
                          href="#pablo"
                          onClick={e => e.preventDefault()}
                        >
                          <i className="ni ni-like-2" />
                          <span className="text-muted">{likeCount} {likeCount == 1 ? "like": "likes"}</span>
                        </a>
                        <a href="#pablo" onClick={e => e.preventDefault()}>
                          <i className="ni ni-chat-round" />
                          <span className="text-muted">{likeCount} {commentCount == 1 ? "comment": "comments"}</span>
                        </a>
                        <a href="#pablo" onClick={e => e.preventDefault()}>
                          <i className="ni ni-curved-next" />
                          <span className="text-muted">{likeCount} {likeCount == 1 ? "share": "shares"}</span>
                        </a>
                      </div>
                    </Col>
                    <Col className="d-none d-sm-block" sm="6">
                      <div className="d-flex align-items-center justify-content-sm-end">
                        <div className="avatar-group">
                          <a
                            className="avatar avatar-xs rounded-circle"
                            href="#pablo"
                            id="tooltip36177092"
                            onClick={e => e.preventDefault()}
                          >
                            <img
                              alt="..."
                              src={require("assets/img/theme/team-1.jpg")}
                            />
                          </a>
                          <UncontrolledTooltip
                            delay={0}
                            target="tooltip36177092"
                          >
                            Jessica Rowland
                          </UncontrolledTooltip>
                          <a
                            className="avatar avatar-xs rounded-circle"
                            href="#pablo"
                            id="tooltip857639221"
                            onClick={e => e.preventDefault()}
                          >
                            <img
                              alt="..."
                              className="rounded-circle"
                              src={require("assets/img/theme/team-2.jpg")}
                            />
                          </a>
                          <UncontrolledTooltip
                            delay={0}
                            target="tooltip857639221"
                          >
                            Audrey Love
                          </UncontrolledTooltip>
                          <a
                            className="avatar avatar-xs rounded-circle"
                            href="#pablo"
                            id="tooltip260223080"
                            onClick={e => e.preventDefault()}
                          >
                            <img
                              alt="..."
                              className="rounded-circle"
                              src={require("assets/img/theme/team-3.jpg")}
                            />
                          </a>
                          <UncontrolledTooltip
                            delay={0}
                            target="tooltip260223080"
                          >
                            Michael Lewis
                          </UncontrolledTooltip>
                        </div>
                        <small className="pl-2 font-weight-bold">
                          and 30+ more
                        </small>
                      </div>
                    </Col>
                  </Row>

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
                          <div className="icon-actions">
                            <a
                              className="like active"
                              href="#pablo"
                              onClick={e => e.preventDefault()}
                            >
                              <i className="ni ni-like-2" />
                              <span className="text-muted">3 likes</span>
                            </a>
                            <a href="#pablo" onClick={e => e.preventDefault()}>
                              <i className="ni ni-curved-next" />
                              <span className="text-muted">2 shares</span>
                            </a>
                          </div>
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
                          <div className="icon-actions">
                            <a
                              className="like active"
                              href="#pablo"
                              onClick={e => e.preventDefault()}
                            >
                              <i className="ni ni-like-2" />
                              <span className="text-muted">10 likes</span>
                            </a>
                            <a href="#pablo" onClick={e => e.preventDefault()}>
                              <i className="ni ni-curved-next" />
                              <span className="text-muted">1 share</span>
                            </a>
                          </div>
                        </div>
                      </Media>
                    </Media>
                    <hr/>
                    <Media className="align-items-center">
                      <img
                        alt="..."
                        className="avatar avatar-lg rounded-circle mr-4"
                        src={require("assets/img/theme/team-3.jpg")}
                      />
                      <Media body>
                        <Form>
                          <Input
                            placeholder="Write your comment"
                            rows="1"
                            type="textarea"
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

export default Postcard;