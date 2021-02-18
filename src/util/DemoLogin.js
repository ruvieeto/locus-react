import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

// reactstrap components
import { Button, NavLink } from "reactstrap";

import { loginUser, logoutUser } from '../redux/actions/userActions';

class DemoLogin extends Component {
	constructor(){
		super();
		this.state={
			loading: false
		}
	}
	
	asyncLogin = (data) => {
		return new Promise((resolve, reject) => {
	      this.props.loginUser(data, this.props.history);
	    })
	    .catch(()=>{
			this.setState({ loading: false });
		})
	}

	handleLogin = (props) =>{
		const userData = {
      		email: "new@email.co.uk",
	    	password: "123456"
	    }

		this.setState({ 
			loading: true 
		}, () => {
			this.asyncLogin(userData)
				.then(()=>{
					this.setState({ loading: false });
				})
				.catch(()=>{
					this.setState({ loading: false });
				})
		});
	}
	render(){
		if(this.props.type === "navlink"){
			return(
				<NavLink onClick={this.handleLogin}>
                    <span className="btn-inner--icon ml-2">
                      {
			          	this.state.loading ? (
			          	<div className="html-spinner html-spinner-home"></div>
			          	):(
			          	<i className="ni ni ni-spaceship mr-2" />
			          	)
			        }
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
                    {
			          	this.state.loading ? (
			          	<div className="html-spinner html-spinner-home"></div>
			          	):(
			          	<i className="ni ni ni-spaceship mr-2" />
			          	)
			        }
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
		          {
		          	this.state.loading ? (
		          	<div className="html-spinner html-spinner-home"></div>
		          	):(
		          	<i className="ni ni ni-spaceship mr-2" />
		          	)
		          }
		        </span>
		        <span>Try Demo
		        </span>
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