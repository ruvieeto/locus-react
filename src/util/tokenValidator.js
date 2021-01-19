// Axios
import axios from 'axios';
// JWT
import jwtDecode from 'jwt-decode';

// Redux Import Store and Dispatch
import store from '../redux/store';
import { SET_AUTHENTICATED, SET_UNAUTHENTICATED } from '../redux/types';
import { getUserData, logoutUser } from '../redux/actions/userActions';

const tokenValidator = (history) =>{
	const token = localStorage.FBIdToken;

	if(token){
	  	  const decodedToken = jwtDecode(token);
		  if(decodedToken.exp * 1000 < Date.now()){
		  	// Log user out if expired
		    store.dispatch(logoutUser(history));
		    return false;
		  } else {
		  	axios.defaults.headers.common['Authorization'] = token;
		    store.dispatch(getUserData());
		    store.dispatch({ type: SET_AUTHENTICATED });
		    return true;
		  }
	} else{
		store.dispatch({ type: SET_UNAUTHENTICATED });
		return false;
	}
}

export default tokenValidator;