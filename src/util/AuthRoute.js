import React, { Fragment } from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import axios from 'axios';

import jwtDecode from 'jwt-decode';

import { useDispatch, useSelector } from 'react-redux';
import { SET_AUTHENTICATED, SET_UNAUTHENTICATED, SET_USER } from '../redux/types';
import { logoutUser, getUserData } from '../redux/actions/userActions';

const AuthRoute = ({ component: Component, ...rest }) =>{
	const dispatch = useDispatch();

	const token = localStorage.FBIdToken;
	if(token){
	  	  const decodedToken = jwtDecode(token);
		  if(decodedToken.exp * 1000 < Date.now()){
		    dispatch(logoutUser());

		    // if(window.location.href !== 'http://localhost:3000/auth/login'){
		    //   window.location.href = '/auth/login';
		    // }
		  } else {
		  	axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
		    dispatch(getUserData());
		    dispatch({ type: SET_AUTHENTICATED });
		  }
	} else{
		dispatch({ type: SET_UNAUTHENTICATED });
	}

	const authenticated = useSelector(state => state.user.authenticated);

	return(
		<Fragment>
			<Route 
			{...rest} 
			render={(props) => authenticated === true ? <Redirect to="/admin/dashboard" /> : <Component {...props} />}
			/>
		</Fragment>
		)
}

// AuthRoute.propTypes = {
//   user: PropTypes.object.isRequired,
//   loginUser: PropTypes.func.isRequired,
//   getUserData: PropTypes.func.isRequired
// }

export default AuthRoute;