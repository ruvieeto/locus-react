import React, { Fragment } from 'react';
import { Route, Redirect } from 'react-router-dom';

import tokenValidator from './tokenValidator';

const AuthRoute = ({ component: Component, ...rest }) =>{
	const validToken = tokenValidator();

	return(
		<Fragment>
			<Route 
			{...rest} 
			render={(props) => validToken === true ? <Redirect to="/admin/dashboard" /> : <Component {...props} />}
			/>
		</Fragment>
		)
}

export default AuthRoute;