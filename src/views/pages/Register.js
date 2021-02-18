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
import { signupUser, clearUserErrors } from '../../redux/actions/userActions';

import logo from '../../assets/img/brand/locus-logo.png';

import resetSidebar from "../../util/resetSidebar";

class Register extends Component {
  constructor(){
    super();
    this.state = {
      loading: false,
      email: "",
      handle: "",
      password: "",
      confirmPassword: "",
      passwordStrength: "weak"
    }
  }

  handleChange = (event) => {
    const { value, name } = event.target;
    this.setState({ [name]: value });

    if(this.props.UI.errors){
      this.props.clearUserErrors();
    }
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

    const newUserData = {
      email: this.state.email,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword,
      handle: this.state.handle
    }

    this.props.signupUser(newUserData, this.props.history);
  }
  
  componentDidMount(){
    resetSidebar();
  }

  componentWillUnmount(){
    this.props.clearUserErrors();
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }

  render() {
    const { passwordStrength } = this.state;
    const { UI: { loading, errors } } = this.props;

    return (
      <Fragment>
        <AuthHeader
          title="Create an account"
          lead="Explore your interests and connect with fascinating people around the world."
        />
        <Container className="mt--8 pb-5">
          <Row className="justify-content-center">
            <Col lg="6" md="8">
              <Card className="bg-secondary border-0">
                <CardHeader className="bg-transparent pb-4 auth-form-header">
                  <div>
                    <img src={logo} alt="logo"/>
                  </div>
                </CardHeader>
                <CardBody className="px-lg-5 py-lg-5">
                  <div className="text-center text-muted mb-4">
                    <small>Sign up with credentials</small>
                  </div>
                  <Form role="form" onSubmit={this.handleSubmit} noValidate>
                    <FormGroup
                      className={classnames({
                        focused: this.state.focusedName
                      })}
                    >
                      <InputGroup className={classnames("input-group-merge input-group-alternative mb-3", {
                        "is-invalid-input": errors.handle
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
                        "is-invalid-input": errors.email
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
                        "is-invalid-input": errors.confirmPassword || errors.password
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
                        "is-invalid-input": errors.confirmPassword
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
  signupUser: PropTypes.func.isRequired,
  clearUserErrors: PropTypes.func.isRequired
}

export const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI
})

export const mapActionsToProps = {
  signupUser,
  clearUserErrors
}

export default connect(mapStateToProps, mapActionsToProps)(Register);
