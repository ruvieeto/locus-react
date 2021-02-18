import { 
	SET_USER, 
	SET_ERRORS, 
	CLEAR_ERRORS, 
	LOADING_UI, 
	SET_UNAUTHENTICATED,
	LOADING_USER,
	MARK_NOTIFICATIONS_READ
} from '../types';

import axios from 'axios';

export const loginUser = (user, history) => (dispatch) => {
	dispatch({ type: LOADING_UI })

	axios.post('/login', user)
      .then(res => {
       	setAuthorizationHeader(res.data.token);

        dispatch(getUserData());
        dispatch({ type: CLEAR_ERRORS });

        //redirect to home feed
        history.push('/home/feed');
      })
      .catch(err => {
      	dispatch({
      		type: SET_ERRORS,
      		payload: err.response.data
      	})
      })
}

export const signupUser = (newUserData, history) => (dispatch) => {
	dispatch({ type: LOADING_UI })

	axios.post('/signup', newUserData)
      .then(res => {
      	setAuthorizationHeader(res.data.token);

        dispatch(getUserData());
        dispatch({ type: CLEAR_ERRORS });

        //redirect to home feed
        history.push('/home/feed');
      })
      .catch(err => {
      	dispatch({
      		type: SET_ERRORS,
      		payload: err.response.data
      	})
      })
}

export const logoutUser = (history) => (dispatch) => {
	localStorage.removeItem('FBIdToken');
	delete axios.defaults.headers.common['Authorization'];
	dispatch({ type: SET_UNAUTHENTICATED });

	//redirect to Locus landing page
	if(history){
		history.push('/');
	}
}

export const getUserData = () => (dispatch) => {
	dispatch({ type: LOADING_USER });

	axios.get('/user')
		.then(res => {
			dispatch({ 
				type: SET_USER,
				payload: res.data 
			})
		})
		.catch(err => {
			console.log(err);
		})
}

export const uploadImage = (formData) => (dispatch) =>{
	dispatch({ type: LOADING_USER });
	axios.post('/user/image', formData)
		.then(() => {
			dispatch(getUserData());
		})
		.catch(err => console.log(err));
}

export const editUserDetails = (userDetails) => (dispatch) => {
	dispatch({ type: LOADING_USER });
	axios.post('/user', userDetails)
		.then(()=>{
			dispatch(getUserData());
		})
		.catch(err => {
			console.log(err);
		});
}

export const markNotificationsAsRead = (notificationIds) => (dispatch) => {
	axios.post('/notifications', notificationIds)
		.then(res => {
			dispatch({ type: MARK_NOTIFICATIONS_READ });
		})
		.catch(err => console.log(err))
}

export const clearUserErrors = () => (dispatch) => {
	dispatch({ type: CLEAR_ERRORS });
}

const setAuthorizationHeader = (token) => {
	const FBIdToken = `Bearer ${token}`;
    localStorage.setItem('FBIdToken', FBIdToken);
    axios.defaults.headers.common['Authorization'] = FBIdToken;
}