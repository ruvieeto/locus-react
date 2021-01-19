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
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// import dayjs from 'dayjs';

// Redux
import { connect } from 'react-redux';
import { uploadImage, editUserDetails } from '../../../redux/actions/userActions';

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardImg,
  CardImgOverlay,
  CardTitle,
  CardText,
  FormGroup,
  Form,
  Input,
  ListGroupItem,
  ListGroup,
  Container,
  Row,
  Col
} from "reactstrap";
// core components
import ProfileHeader from "components/Headers/ProfileHeader.js";

class Profile extends Component {
  constructor(){
    super();

    this.state = {
      imageFile: null,
      emptyImage: true,
      previewImage: null,
      bio: "",
      location: "",
      website: ""
    }
  }

  handleImageChange = (event) => {
    const inputField = event.target;
    const image = inputField.files[0];

    // Creating preview image
    if(image){
      this.setState({
          emptyImage: false,
          previewImage: URL.createObjectURL(image),
          imageFile: image
        });
    }
    else{
      this.setState({ 
        emptyImage: true,
        previewImage: null,
        imageFile: null
      });
    }
  }

  handleInputChange = (event) =>{
    const { value, name } = event.target;

    this.setState({
      [name]: value
    })
  }

  handleSubmit = () => {
    const { imageFile, bio, website, location } = this.state;

    // Preparing image file for upload 
    if(imageFile){
      const formData = new FormData();
      formData.append('image', imageFile, imageFile.name);

      // send image to server
      this.props.uploadImage(formData);
      this.setState({ 
        emptyImage: true,
        previewImage: null,
        imageFile: null
      });
    }

    // Update other user details
    this.props.editUserDetails({
      bio, 
      website, 
      location
    });
  }

  render() {
    const { user: { loading } } = this.props;

    if(loading){
      return (<p>loading</p>)
    }

    const {
      user: { 
        credentials: { handle, website, bio, imgUrl, location, email }
      }
    } = this.props;

    return (
      <Fragment>
        <ProfileHeader />
        <Container className="mt--6" fluid>
          <Row>
            <Col className="order-xl-2" xl="4">

            {/*Working Remotely card*/}
              <Card>
                <CardBody>
                  <Row className="align-items-center">
                    <Col className="col-auto">
                      <Link 
                        to={`/users/${handle}`}
                        className="avatar avatar-xl rounded-circle"
                      >
                        <img
                          alt="..."
                          src={imgUrl}
                        />
                      </Link>
                    </Col>
                    <div className="col ml--2">
                      <h4 className="mb-0">
                        <Link 
                        to={`/users/${handle}`}>
                          @{handle}
                        </Link>
                      </h4>
                      <p className="text-sm text-muted mb-0">
                        {bio}
                      </p>
                      <span className="text-success mr-1">●</span>
                      <small>Active</small>
                    </div>
                  </Row>
                </CardBody>
              </Card>

              {/* Photo background card */}
              <Card className="bg-dark text-white border-0">
                <CardImg
                  alt="..."
                  src={require("assets/img/theme/img-1-1000x600.jpg")}
                />
                <CardImgOverlay className="d-flex align-items-center">
                  <div>
                    <CardTitle className="h2 text-white mb-2">
                      Glad you're here!
                    </CardTitle>
                    <CardText>
                      It's awesome having you as part of the Locus family!
                      Add as little or as much information
                      so others can connect with you.
                    </CardText>
                    <CardText className="text-sm font-weight-bold">
                      &hearts; The Locus Team
                    </CardText>
                  </div>
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
                      <Button
                        color="primary"
                        onClick={this.handleSubmit}
                        size="sm"
                      >
                        Save
                      </Button>
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
                              defaultValue={handle}
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
                              defaultValue={email}
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
                              defaultValue={location}
                              id="input-location"
                              placeholder="Location"
                              type="text"
                              name="location"
                              onChange={this.handleInputChange}
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
                              defaultValue={website}
                              id="input-website"
                              placeholder="https://www.example.com"
                              type="text"
                              name="website"
                              onChange={this.handleInputChange}
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
                          defaultValue={bio}
                          name="bio"
                          onChange={this.handleInputChange}
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
                        onChange={this.handleImageChange}
                        accept="image/*"
                      />
                      <label
                        className="custom-file-label"
                        htmlFor="profileImageInputField"
                      >
                        Choose file
                      </label>
                    </div>

                  {
                    !this.state.emptyImage ?
                    (<ListGroup
                        className=" dz-preview dz-preview-multiple list-group-lg"
                        flush
                      >
                        <ListGroupItem className=" px-0">
                          <Row className=" align-items-center">
                            {/*Useless columns*/}
                             <Col className=" col-auto">
                              <div className=" avatar" id="previewImageContainer">
                                <img
                                  alt="..."
                                  className=" avatar-img rounded"
                                  data-dz-thumbnail
                                  src={this.state.previewImage}
                                />
                              </div>
                            </Col>
                            <div className=" col ml--3">
                              <h4 className=" mb-1" data-dz-name>
                                ...
                              </h4>
                              <p
                                className=" small text-muted mb-0"
                                data-dz-size
                              >
                                ...
                              </p>
                            </div>
                          {/*Useless columns end*/}

                            <Col className=" col-auto">
                              <Button size="sm" color="danger" data-dz-remove onClick={()=>{}}>
                                <i className="fas fa-trash" />
                                {` Clear`}
                              </Button>
                            </Col>
                          </Row>
                        </ListGroupItem>
                      </ListGroup>)
                    :
                    (null)
                  }

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

const mapStateToProps = (state) => ({
  user: state.user
});

const mapActionsToProps = {
  uploadImage,
  editUserDetails
};

Profile.propTypes = {
  user: PropTypes.object.isRequired,
  uploadImage: PropTypes.func.isRequired,
  editUserDetails: PropTypes.func.isRequired
}

export default connect(mapStateToProps, mapActionsToProps)(Profile);