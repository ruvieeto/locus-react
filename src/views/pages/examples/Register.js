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
import React, { Fragment, Component } from "react";
import PropTypes from 'prop-types';
// nodejs library that concatenates classes
import classnames from "classnames";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col
} from "reactstrap";
// core components
import AuthHeader from "components/Headers/AuthHeader.js";
import { Link } from 'react-router-dom';

// Redux
import { connect } from 'react-redux';
import { signupUser } from '../../../redux/actions/userActions';

class Register extends Component {
  constructor(){
    super();
    this.state = {
      loading: false,
      email: "",
      handle: "",
      password: "",
      confirmPassword: "",
      passwordStrength: "weak",
      errors: {},
      emailInvalid: false,
      passwordInvalid: false,
      confirmPasswordInvalid: false,
      handleInvalid: false
    }
  }

  handleChange = (event) => {
    const { value, name } = event.target;
    this.setState({
      [name]: value,
      errors: {},
      emailInvalid: false,
      passwordInvalid: false,
      confirmPasswordInvalid: false,
      handleInvalid: false
    });
  }

  checkPasswordStrength = (event) => {
    const strong = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&amp;*])(?=.{8,})");
    const medium = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})");

    const password = event.target.value;
    
    this.setState({ passwordStrength: "weak" })
    if(password.match(medium)){
     this.setState({ passwordStrength: "medium" }) 
    }
    if(password.match(strong)){
      this.setState({ passwordStrength: "strong" })
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({ 
      errors: {},
      emailInvalid: false,
      passwordInvalid: false,
      confirmPasswordInvalid: false,
      handleInvalid: false
    });

    const newUserData = {
      email: this.state.email,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword,
      handle: this.state.handle
    }

    this.props.signupUser(newUserData, this.props.history);
  }

  render() {
    const { passwordStrength } = this.state;
    const { UI: { loading, errors } } = this.props;

    // ************************** Before Redux Start **************************
      // if(err.response.data.email){
      //       this.setState({
      //       emailInvalid: true
      //     });
      //   }
      //   if(err.response.data.password){
      //     this.setState({
      //       passwordInvalid: true
      //     });
      //   }
      //   if(err.response.data.confirmPassword){
      //     this.setState({
      //       confirmPasswordInvalid: true,
      //       passwordInvalid: true // For both input fields have warning border
      //     });
      //   }
      //   if(err.response.data.handle){
      //     this.setState({
      //       handleInvalid: true
      //     });
      //   }
    // ************************** Before Redux End **************************

    return (
      <Fragment>
        <AuthHeader
          title="Create an account"
          lead="Connect with your fellow techies and science geeks."
        />
        <Container className="mt--8 pb-5">
          <Row className="justify-content-center">
            <Col lg="6" md="8">
              <Card className="bg-secondary border-0">
                <CardHeader className="bg-transparent pb-5">
                  <div className="text-muted text-center mt-2 mb-4">
                    <small>Sign up with</small>
                  </div>
                  <div className="text-center">
                    <Button
                      className="btn-neutral btn-icon mr-4"
                      color="default"
                      href="#pablo"
                      onClick={e => e.preventDefault()}
                    >
                      <span className="btn-inner--icon mr-1">
                        <img
                          alt="..."
                          src={require("assets/img/icons/common/github.svg")}
                        />
                      </span>
                      <span className="btn-inner--text">Github</span>
                    </Button>
                    <Button
                      className="btn-neutral btn-icon"
                      color="default"
                      href="#pablo"
                      onClick={e => e.preventDefault()}
                    >
                      <span className="btn-inner--icon mr-1">
                        <img
                          alt="..."
                          src={require("assets/img/icons/common/google.svg")}
                        />
                      </span>
                      <span className="btn-inner--text">Google</span>
                    </Button>
                  </div>
                </CardHeader>
                <CardBody className="px-lg-5 py-lg-5">
                  <div className="text-center text-muted mb-4">
                    <small>Or sign up with credentials</small>
                  </div>
                  <Form role="form" onSubmit={this.handleSubmit} noValidate>
                    <FormGroup
                      className={classnames({
                        focused: this.state.focusedName
                      })}
                    >
                      <InputGroup className={classnames("input-group-merge input-group-alternative mb-3", {
                        "is-invalid-input": this.state.handleInvalid
                      })}>
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="ni ni-circle-08" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          placeholder="Username"
                          type="text"
                          name="handle"
                          id="handle"
                          onChange={this.handleChange}
                          onFocus={() => this.setState({ focusedName: true })}
                          onBlur={() => this.setState({ focusedName: false })}
                        />
                      </InputGroup>
                      {errors.handle &&
                      <div className="invalid-form-input-message">
                          {errors.handle}
                      </div>
                      }
                    </FormGroup>
                    <FormGroup
                      className={classnames({
                        focused: this.state.focusedEmail
                      })}
                    >
                      <InputGroup className={classnames("input-group-merge input-group-alternative mb-3", {
                        "is-invalid-input": this.state.emailInvalid
                      })}>
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="ni ni-email-83" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          placeholder="Email"
                          type="email"
                          name="email"
                          id="email"
                          onChange={this.handleChange}
                          onFocus={() => this.setState({ focusedEmail: true })}
                          onBlur={() => this.setState({ focusedEmail: false })}
                        />
                      </InputGroup>
                      {errors.email &&
                      <div className="invalid-form-input-message">
                          {errors.email}
                      </div>
                      }
                    </FormGroup>
                    <FormGroup
                      className={classnames({
                        focused: this.state.focusedPassword
                      })}
                    >
                      <InputGroup className={classnames("input-group-merge input-group-alternative", {
                        "is-invalid-input": this.state.passwordInvalid
                      })}>
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="ni ni-lock-circle-open" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          placeholder="Password"
                          type="password"
                          name="password"
                          id="password"
                          onChange={(event)=>{this.handleChange(event); this.checkPasswordStrength(event)}}
                          onFocus={() =>
                            this.setState({ focusedPassword: true })
                          }
                          onBlur={() =>
                            this.setState({ focusedPassword: false })
                          }
                        />
                      </InputGroup>
                      {errors.password &&
                      <div className="invalid-form-input-message">
                          {errors.password}
                      </div>
                      }
                      {errors.confirmPassword &&
                      <div className="invalid-form-input-message">
                          {errors.confirmPassword}
                      </div>
                      }
                    </FormGroup>
                    <FormGroup
                      className={classnames({
                        focused: this.state.focusedConfirmPassword
                      })}
                    >
                      <InputGroup className={classnames("input-group-merge input-group-alternative", {
                        "is-invalid-input": this.state.confirmPasswordInvalid
                      })}>
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="ni ni-check-bold" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          placeholder="Confirm Password"
                          type="password"
                          name="confirmPassword"
                          id="confirmPassword"
                          onChange={this.handleChange}
                          onFocus={() =>
                            this.setState({ focusedConfirmPassword: true })
                          }
                          onBlur={() =>
                            this.setState({ focusedConfirmPassword: false })
                          }
                        />
                      </InputGroup>
                      {errors.confirmPassword &&
                      <div className="invalid-form-input-message">
                          {errors.confirmPassword}
                      </div>
                      }
                    </FormGroup>
                    <div className="text-muted font-italic">
                      <small>
                        password strength:{" "}
                        <span className={`
                          font-weight-700 
                          ${passwordStrength === "strong"? "text-success":""} 
                          ${passwordStrength === "medium"? "text-warning":""} 
                          ${passwordStrength === "weak"? "text-danger":""}
                          `}>
                          {passwordStrength}
                        </span>
                      </small>
                    </div>
                    <Row className="my-4">
                      <Col xs="12">
                        <div className="custom-control custom-control-alternative custom-checkbox">
                          <input
                            className="custom-control-input"
                            id="customCheckRegister"
                            type="checkbox"
                          />
                          <label
                            className="custom-control-label"
                            htmlFor="customCheckRegister"
                          >
                            <span className="text-muted">
                              I agree with the{" "}
                              <a
                                href="#pablo"
                                onClick={e => e.preventDefault()}
                              >
                                Privacy Policy
                              </a>
                            </span>
                          </label>
                        </div>
                      </Col>
                    </Row>
                    <div className="text-center">
                      <Button 
                        className="mt-4"
                        color="info"
                        type="submit"
                        disabled={loading}
                      >
                      {loading ?
                         <div className="html-spinner"></div>
                          :
                          "Create account"
                        }
                      </Button>
                    </div>
                  </Form>
                </CardBody>
              </Card>
              <Row className="mt-3">
                <Col xs="6">
                  <Link
                    className="text-light"
                    to="/auth/login"
                  >
                    <small>Already have an account? Log in</small>
                  </Link>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </Fragment>
    );
  }
}

Register.propTypes = {
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
  signupUser: PropTypes.func.isRequired
}

export const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI
})

export const mapActionsToProps = {
  signupUser
}

export default connect(mapStateToProps, mapActionsToProps)(Register);
