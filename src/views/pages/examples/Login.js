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

import axios from 'axios';

class Login extends Component {
  constructor(){
    super();
    this.state = {
      loading: false,
      email: "",
      password: "",
      errors: {},
      emailInvalid: false,
      passwordInvalid: false
    };
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({ 
      loading: true,
      errors: {},
      emailInvalid: false,
      passwordInvalid: false
    });

    const userData = {
      email: this.state.email,
      password: this.state.password
    }

    axios.post('/login', userData)
      .then(res => {
        localStorage.setItem('FBIdToken', `Bearer ${res.data.token}`);
        this.setState({ loading: false });

        //redirect to home feed
        this.props.history.push('/admin/dashboard');
      })
      .catch(err => {
        this.setState({
          errors: err.response.data,
          loading: false
        })

        if(err.response.data.email){
            this.setState({
            emailInvalid: true
          });
        }
        if(err.response.data.password){
          this.setState({
            passwordInvalid: true
          });
        }
      })
  }

  handleChange = (event) => {
    const { value, name } = event.target;
    this.setState({
      [name]: value,
      errors: {},
      emailInvalid: false,
      passwordInvalid: false
    });
  }

  render() {
    const { errors, loading } = this.state;

    return (
      <Fragment>
        <AuthHeader
          title="Welcome back!"
          lead="Pick up right where you left off."
        />
        <Container className="mt--8 pb-5">
          <Row className="justify-content-center">
            <Col lg="5" md="7">
              <Card className="bg-secondary border-0 mb-0">
                <CardHeader className="bg-transparent pb-5">
                  <div className="text-muted text-center mt-2 mb-3">
                    <small>Sign in with</small>
                  </div>
                  <div className="btn-wrapper text-center">
                    <Button
                      className="btn-neutral btn-icon"
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
                    <small>Or sign in with credentials</small>
                  </div>
                  <Form role="form" onSubmit={this.handleSubmit} noValidate>
                    <FormGroup
                      className={classnames("mb-3", {
                        focused: this.state.focusedEmail
                      })}
                    >
                      <InputGroup className={classnames("input-group-merge input-group-alternative", {
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
                          name="password"
                          type="password"
                          id="password"
                          onChange={this.handleChange}
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
                    </FormGroup>
                    {/*<div className="custom-control custom-control-alternative custom-checkbox">
                      <input
                        className="custom-control-input"
                        id=" customCheckLogin"
                        type="checkbox"
                      />
                      <label
                        className="custom-control-label"
                        htmlFor=" customCheckLogin"
                      >
                        <span className="text-muted">Remember me</span>
                      </label>
                    </div>*/}
                    <div className="text-center">
                      {errors.general &&
                      <div className="invalid-form-input-message">
                          {errors.general}
                      </div>
                      }
                      <Button 
                        className="my-4" 
                        color="info" 
                        type="submit"
                        disabled={loading}
                      >                        
                        {loading ?
                         <div className="html-spinner"></div>
                          :
                          "Sign in"
                        }
                      </Button>
                    </div>
                  </Form>
                </CardBody>
              </Card>
              <Row className="mt-3">
                <Col xs="6">
                  <a
                    className="text-light"
                    href="#pablo"
                    onClick={e => e.preventDefault()}
                  >
                    <small>Forgot password?</small>
                  </a>
                </Col>
                <Col className="text-right" xs="6">
                  <Link
                    className="text-light"
                    to="/auth/register"
                  >
                    <small>Create new account</small>
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

export default Login;
