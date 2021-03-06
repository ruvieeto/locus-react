import {
	SET_POSTS,
	LOADING_DATA,
	LIKE_POST,
	UNLIKE_POST,
	DELETE_POST,
	ADD_POST,
	SET_POST,
	LOADING_UI,
	STOP_LOADING_UI,
	SET_ERRORS,
	CLEAR_ERRORS,
	COMMENT_CLICK,
	NEW_POST_CLICK,
	SUMBIT_COMMENT,
	DELETE_COMMENT,
	NOTIFY_POST_SUCCESS,
	RESET_POST_SUCCESS,
	NOTIFY_DELETE_SUCCESS,
	RESET_DELETE_SUCCESS,
	NOTIFY_DELETE_COMMENT_SUCCESS,
	RESET_DELETE_COMMENT_SUCCESS
} from "../types";

import axios from 'axios';

// Get all posts
export const getPosts = () => (dispatch) => {
	dispatch({ type: LOADING_DATA });
	axios.get('/posts')
		.then(res => {
			dispatch({
				type: SET_POSTS,
				payload: res.data
			})
		})
		.catch(err =>{
			dispatch({
				type: SET_POSTS,
				payload: []
			})
		})
}

// Like a post
export const likePost = (postId) => (dispatch) => {
	axios.get(`/post/${postId}/like`)
		.then(res =>{
			dispatch({
				type: LIKE_POST,
				payload: res.data
			})
		})
		.catch(err => console.log(err));
}

// Unlike a post
export const unlikePost = (postId) => (dispatch) => {
	axios.get(`/post/${postId}/unlike`)
		.then(res =>{
			dispatch({
				type: UNLIKE_POST,
				payload: res.data
			})
		})
		.catch(err => console.log(err));
}

// Delete a post
export const deletePost = (postId) => (dispatch) =>{
	axios.delete(`/post/${postId}`)
		.then(() => {
			dispatch({
				type: DELETE_POST,
				payload: postId
			})
		})
		.then(() => {
			dispatch({ type: NOTIFY_DELETE_SUCCESS });
		})
		.catch(err => console.log(err))
}

// New post click check
export const newPostClick = () => (dispatch) =>{
	dispatch({ type: NEW_POST_CLICK });
}
// Comment click check
export const clearPostClick = () => (dispatch) =>{
	dispatch({ type: COMMENT_CLICK });
}

//  Add a new post
export const addNewPost = (newPost) => (dispatch) =>{
	dispatch({ type: LOADING_UI });

	axios.post('/post', newPost)
		.then(res => {
			dispatch({ 
				type: ADD_POST,
				payload: res.data
			});
			dispatch(clearErrors());
		})
		.then(() => {
			dispatch({ type: NOTIFY_POST_SUCCESS });
		})
		.catch(err => {
			dispatch({
				type: SET_ERRORS,
				payload: err.response.data
			})
		})
}

// Reset post success notification
export const resetSuccessNotification = () => (dispatch) =>{
	dispatch({ type: RESET_POST_SUCCESS });
}

// Reset post delete success notification
export const resetDeleteNotification = () => (dispatch) =>{
	dispatch({ type: RESET_DELETE_SUCCESS });
}

// Reset comment delete success notification
export const resetCommentDeleteNotification = () => (dispatch) =>{
	dispatch({ type: RESET_DELETE_COMMENT_SUCCESS });
}

// Clear Errors
export const clearErrors = () => (dispatch) => {
	dispatch({ type: CLEAR_ERRORS });
}

// Retrieve individual post
export const getPost = (postId) => (dispatch) => {
	dispatch({ type: LOADING_UI });

	axios.get(`/post/${postId}`)
		.then(res => {
			dispatch({ 
				type: SET_POST,
				payload: res.data
			});
			dispatch({ type: STOP_LOADING_UI });
		})
		.catch(err => console.log(err));
}

// Submit comment
export const submitComment = (postId, commentData) => (dispatch) => {
	axios.post(`/post/${postId}/comment`, commentData)
		.then(res => {
			dispatch({ 
				type: SUMBIT_COMMENT,
				payload: res.data
			});
			dispatch(clearErrors());
		})
		.catch(err => {
			dispatch({
				type: SET_ERRORS,
				payload: err.response.data
			});
		});
}

// Delete a comment
export const deleteComment = (commentId) => (dispatch) =>{
	axios.delete(`/comment/${commentId}`)
		.then(() => {
			dispatch({
				type: DELETE_COMMENT,
				payload: commentId
			})
		})
		.then(() => {
			dispatch({ type: NOTIFY_DELETE_COMMENT_SUCCESS });
		})
		.catch(err => console.log(err))
}

// Gets user data for user page navigated to
export const getUserData = (userHandle) => (dispatch) => {
	dispatch({ type: LOADING_DATA });

	axios.get(`/user/${userHandle}`)
		.then(res => {
			dispatch({ 
				type: SET_POSTS, 
				payload: res.data.posts
			});
		})
		.catch((err) => {
			console.log(err);
			dispatch({ 
				type: SET_POSTS,
				payload: null
			});
		})
}