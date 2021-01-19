import React, { Fragment } from 'react';
import { Route, Redirect } from 'react-router-dom';

import tokenValidator from './tokenValidator';

const HomeRoute = ({ component: Component, ...rest }) =>{
	const validToken = tokenValidator();

	return(
		<Fragment>
			<Route 
			{...rest} 
			render={(props) => validToken === true ? <Component {...props} /> : <Redirect to="/" />}
			/>
		</Fragment>
		)
}

export default HomeRoute;