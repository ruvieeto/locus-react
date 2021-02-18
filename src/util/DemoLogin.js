import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

// reactstrap components
import { Button, NavLink } from "reactstrap";

import { loginUser, logoutUser } from '../redux/actions/userActions';
import tokenValidator from './tokenValidator';

class DemoLogin extends Component {
	handleLogin = (props) =>{
		// logs out user if already logged in
		if(tokenValidator()){
			this.props.logoutUser();
		}

		const userData = {
      		email: "new@email.co.uk",
	    	password: "123456"
	    }

    	this.props.loginUser(userData, this.props.history);
	}
	render(){
		if(this.props.type === "navlink"){
			return(
				<NavLink onClick={this.handleLogin}>
                    <span className="btn-inner--icon ml-2">
                      <i className="ni ni ni-spaceship mr-2" />
                    </span>
                    <span className="nav-link-inner--text">Try Demo</span>
                </NavLink>
			)
		}

		if(this.props.type === "nav-button"){
			return(
				<Button
                    className="btn-neutral btn-icon"
                    color="default"
                    onClick={this.handleLogin}
                >
                    <span className="btn-inner--icon">
                      <i className="ni ni ni-spaceship mr-2" />
                    </span>
                    <span className="nav-link-inner--text">Try Demo</span>
                </Button>
			)
		}
		
		return(
			<Button
		        className="btn btn-neutral my-2"
		        color="default"
		        onClick={this.handleLogin}
		    >
		        <span className="btn-inner--icon">
		          <i className="ni ni ni-spaceship mr-2" />
		        </span>
		        <span>Try Demo</span>
		    </Button>
		)
	}
}

DemoLogin.propTypes = {
  loginUser: PropTypes.func.isRequired,
  logoutUser: PropTypes.func.isRequired
}

export const mapActionsToProps = {
  loginUser,
  logoutUser
}

export default connect(null, mapActionsToProps)(withRouter(DemoLogin));