/*!

=========================================================
* Argon Dashboard PRO React - v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-pro-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { Component, Fragment } from "react";
// node.js library that concatenates classes (strings)
import classnames from "classnames";
// javascipt plugin for creating charts
import Chart from "chart.js";
// react plugin used to create charts
import { Line, Bar } from "react-chartjs-2";
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

// core components
// import CardsHeader from "components/Headers/CardsHeader.js";
import SimpleHeader from "components/Headers/SimpleHeader.js";
import PlainHeader from "components/Headers/PlainHeader.js";
import Postcard from '../components/Postcard';
import ProfileCard from '../components/ProfileCard';

import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2
} from "variables/charts.js";

import axios from "axios";

// Redux
import { connect } from 'react-redux';
import { getUserData } from '../../../redux/actions/userActions';
import { SET_AUTHENTICATED } from '../../../redux/types';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeNav: 1,
      chartExample1Data: "data1",
      posts: null
    };
    if (window.Chart) {
      parseOptions(Chart, chartOptions());
    }
  }

  componentDidMount(props){
    axios.get('/posts')
      .then(res => {
        this.setState(prevState =>{
          return { posts: res.data }
        })
      })
      .catch(err => {
        console.log(err); 
      })

      const { user: { authenticated }, dispatch } = this.props;
      if(authenticated){
        axios.defaults.headers.common['Authorization'] = localStorage.FBIdToken;
        dispatch(getUserData());
      }
  }

  toggleNavs = (e, index) => {
    e.preventDefault();
    this.setState({
      activeNav: index,
      chartExample1Data:
        this.state.chartExample1Data === "data1" ? "data2" : "data1"
    });
  };
  render() {
    let recentPostsMarkup = this.state.posts ? (
        this.state.posts.map((post, index) => <Postcard key={post.postId} index={index} post={post} />)
      )
     : <p>Loading...</p>

    return (
      <Fragment>
        <PlainHeader name="Home" parentName="Timeline" />
        <Container className="mt--6" fluid>
          <Row>
            <Col xl="8">
              {recentPostsMarkup}
              
              {/*<Card>
                <CardHeader>
                  <h5 className="h3 mb-0">Activity feed</h5>
                </CardHeader>
                <CardHeader className="d-flex align-items-center">
                  <div className="d-flex align-items-center">
                    <a href="#pablo" onClick={e => e.preventDefault()}>
                      <img
                        alt="..."
                        className="avatar"
                        src={require("assets/img/theme/team-1.jpg")}
                      />
                    </a>
                    <div className="mx-3">
                      <a
                        className="text-dark font-weight-600 text-sm"
                        href="#pablo"
                        onClick={e => e.preventDefault()}
                      >
                        John Snow
                      </a>
                      <small className="d-block text-muted">3 days ago</small>
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
                    Personal profiles are the perfect way for you to grab their
                    attention and persuade recruiters to continue reading your
                    CV because you’re telling them from the off exactly why they
                    should hire you.
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
                          <span className="text-muted">150</span>
                        </a>
                        <a href="#pablo" onClick={e => e.preventDefault()}>
                          <i className="ni ni-chat-round" />
                          <span className="text-muted">36</span>
                        </a>
                        <a href="#pablo" onClick={e => e.preventDefault()}>
                          <i className="ni ni-curved-next" />
                          <span className="text-muted">12</span>
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


              <Card>
                <CardHeader className="d-flex align-items-center">
                  <div className="d-flex align-items-center">
                    <a href="#pablo" onClick={e => e.preventDefault()}>
                      <img
                        alt="..."
                        className="avatar"
                        src={require("assets/img/theme/team-1.jpg")}
                      />
                    </a>
                    <div className="mx-3">
                      <a
                        className="text-dark font-weight-600 text-sm"
                        href="#pablo"
                        onClick={e => e.preventDefault()}
                      >
                        John Snow
                      </a>
                      <small className="d-block text-muted">3 days ago</small>
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
                    Personal profiles are the perfect way for you to grab their
                    attention and persuade recruiters to continue reading your
                    CV because you’re telling them from the off exactly why they
                    should hire you.
                  </p>

                  <Row className="align-items-center my-3 pb-3 border-bottom">
                    <Col sm="6">
                      <div className="icon-actions">
                        <a
                          className="like active"
                          href="#pablo"
                          onClick={e => e.preventDefault()}
                        >
                          <i className="ni ni-like-2" />
                          <span className="text-muted">150</span>
                        </a>
                        <a href="#pablo" onClick={e => e.preventDefault()}>
                          <i className="ni ni-chat-round" />
                          <span className="text-muted">36</span>
                        </a>
                        <a href="#pablo" onClick={e => e.preventDefault()}>
                          <i className="ni ni-curved-next" />
                          <span className="text-muted">12</span>
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
              <Card>
                <CardHeader className="d-flex align-items-center">
                  <div className="d-flex align-items-center">
                    <a href="#pablo" onClick={e => e.preventDefault()}>
                      <img
                        alt="..."
                        className="avatar"
                        src={require("assets/img/theme/team-1.jpg")}
                      />
                    </a>
                    <div className="mx-3">
                      <a
                        className="text-dark font-weight-600 text-sm"
                        href="#pablo"
                        onClick={e => e.preventDefault()}
                      >
                        John Snow
                      </a>
                      <small className="d-block text-muted">3 days ago</small>
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
                    Personal profiles are the perfect way for you to grab their
                    attention and persuade recruiters to continue reading your
                    CV because you’re telling them from the off exactly why they
                    should hire you.
                  </p>

                  <Row className="align-items-center my-3 pb-3 border-bottom">
                    <Col sm="6">
                      <div className="icon-actions">
                        <a
                          className="like active"
                          href="#pablo"
                          onClick={e => e.preventDefault()}
                        >
                          <i className="ni ni-like-2" />
                          <span className="text-muted">150</span>
                        </a>
                        <a href="#pablo" onClick={e => e.preventDefault()}>
                          <i className="ni ni-chat-round" />
                          <span className="text-muted">36</span>
                        </a>
                        <a href="#pablo" onClick={e => e.preventDefault()}>
                          <i className="ni ni-curved-next" />
                          <span className="text-muted">12</span>
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
              </Card>*/}
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

const mapStateToProps = (state) => ({
  user: state.user
});

export default connect(mapStateToProps)(Dashboard);
