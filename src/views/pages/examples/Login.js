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
import { loginUser } from '../../../redux/actions/userActions';

import logo from '../../../assets/img/brand/locus-logo.png';

class Login extends Component {
  constructor(){
    super();
    this.state = {
      // loading: false,
      email: "",
      password: "",
      errors: {},
      emailInvalid: false,
      passwordInvalid: false
    };
  }

  // UNSAFE_componentWillReceiveProps(nextProps){
  //   if(nextProps.UI.errors){
  //     this.setState({ errors: nextProps.UI.errors });
  //   }
  // }

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({ 
      errors: {},
      emailInvalid: false,
      passwordInvalid: false
    });

    const userData = {
      email: this.state.email,
      password: this.state.password
    }

    this.props.loginUser(userData, this.props.history);
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

  componentWillUnmount(){
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }

  render() {
    // const { errors } = this.state;

    // ************************** Before Redux Start **************************
        // this.setState({
        //   errors: err.response.data,
        //   loading: false
        // })

        // if(err.response.data.email){
        //     this.setState({
        //     emailInvalid: true
        //   });
        // }
        // if(err.response.data.password){
        //   this.setState({
        //     passwordInvalid: true
        //   });
        // }
        // ************************** Before Redux End **************************

        // Change to check emailInvalid and passwordInvalid and store as booleans

    const { UI: { loading, errors } } = this.props;

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
                <CardHeader className="bg-transparent pb-4 auth-form-header">
                  <div>
                    <img src={logo} alt="logo"/>
                  </div>
                </CardHeader>
                <CardBody className="px-lg-5 py-lg-5">
                <div className="text-muted text-center mb-4">
                    <small>Sign in with your credentials:</small>
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

Login.propTypes = {
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
  loginUser: PropTypes.func.isRequired
}

export const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI
})

export const mapActionsToProps = {
  loginUser
}

export default connect(mapStateToProps, mapActionsToProps)(Login);