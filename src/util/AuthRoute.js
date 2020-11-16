import React, { Fragment } from 'react';
import { Route, Redirect } from 'react-router-dom';

const AuthRoute = ({ component: Component, authenticated, ...rest }) =>{
	return(
		<Fragment>
			<Route 
			{...rest} 
			render={(props) => authenticated === true ? <Redirect to="/admin/dashboard" /> : <Component {...props} />}
			/>
		</Fragment>
		)
}

export default AuthRoute;