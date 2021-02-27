import React, { Component, Fragment } from "react";

// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardImg,
  CardImgOverlay,
  FormGroup,
  Form,
  Input,
  Container,
  Row,
  Col
} from "reactstrap";

import noImg from '../../../assets/img/theme/no-img.png'

class AccountSkeleton extends Component {
  render() {

    return (
      <Fragment>
        <Container className="mt--6" fluid>
          <Row>
            <Col className="order-xl-2" xl="4">
              <Card>
                <CardBody>
                  <Row className="align-items-center">
                    <Col className="col-auto">
                     <div className="avatar avatar-xl rounded-circle">
                      <img
                        alt="..."
                        src={noImg}
                      />
                    </div>
                    </Col>
                    <div className="col ml--2">
                      <h4 className="mb-0">
                        <div className="skeleton-line-post-name"></div>
                      </h4>
                        <p className="skeleton-line-post"></p>
                        <p className="skeleton-line-post"></p>
                      <span className="text-muted mr-1">●</span>
                      <small>Active</small>
                    </div>
                  </Row>
                </CardBody>
              </Card>

              {/* Photo background card */}
              <Card className="bg-dark text-white border-0">
                <CardImg
                  alt="..."
                  src={require("assets/img/theme/pattern4.jpg")}
                />
                <CardImgOverlay className="d-flex align-items-center">
                  <div></div>
                </CardImgOverlay>
              </Card>

            </Col>
            <Col className="order-xl-1" xl="8">

            {/*Main profile section*/}
              <Card>
                <CardHeader>
                  <Row className="align-items-center">
                    <Col xs="8">
                      <h3 className="mb-0">Edit profile</h3>
                    </Col>
                    <Col className="text-right" xs="4">
                      <span className="skeleton-delete"></span>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                  <Form>
                    <h6 className="heading-small text-muted mb-4">
                      User information
                    </h6>
                    <div className="pl-lg-4">
                      <Row>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-username"
                            >
                              Username
                            </label>
                            <Input
                              id="input-username"
                              placeholder="Username"
                              type="text"
                              readOnly="readonly"
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-email"
                            >
                              Email address
                            </label>
                            <Input
                              id="input-email"
                              placeholder="you@email.com"
                              type="email"
                              readOnly="readonly"
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      
                    </div>
                    <hr className="my-4" />

                    <h6 className="heading-small text-muted mb-4">
                      Other information
                    </h6>
                    <div className="pl-lg-4">

                      <Row>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-location"
                            >
                              Location
                            </label>
                            <Input
                              id="input-location"
                              placeholder="Location"
                              type="text"
                              name="location"
                              readOnly="readonly"
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-website"
                            >
                              Website
                            </label>
                            <Input
                              id="input-website"
                              placeholder="https://www.example.com"
                              type="text"
                              name="website"
                              readOnly="readonly"
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                    </div>
                    <hr className="my-4" />

                    <h6 className="heading-small text-muted mb-4">Bio</h6>
                    <div className="pl-lg-4">
                      <FormGroup>
                        <label className="form-control-label">About me</label>
                        <Input
                          placeholder="Tell others about yourself in a few words ..."
                          rows="4"
                          type="textarea"
                          name="bio"
                          readOnly="readonly"
                        />
                      </FormGroup>
                    </div>

                    <hr className="my-4" />
                    <h6 className="heading-small text-muted mb-4">Profile Picture</h6>
                    <FormGroup>

                    {/* Image Input*/}
                    <div className="custom-file">
                      <input
                        className="custom-file-input"
                        id="profileImageInputField"
                        type="file"
                        accept="image/*"
                        disabled
                      />
                      <label
                        className="custom-file-label"
                        htmlFor="profileImageInputField"
                      >
                        Choose file
                      </label>
                    </div>
                    </FormGroup>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </Fragment>
    );
  }
}

export default AccountSkeleton;