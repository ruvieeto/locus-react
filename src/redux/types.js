// User reducer types
export const SET_AUTHENTICATED = 'SET_AUTHENTICATED';
export const SET_UNAUTHENTICATED = 'SET_UNAUTHENTICATED';
export const SET_USER = 'SET_USER';
export const LOADING_USER = 'LOADING_USER';
export const MARK_NOTIFICATIONS_READ = 'MARK_NOTIFICATIONS_READ';

// UI reducer types
export const SET_ERRORS = 'SET_ERRORS';
export const LOADING_UI = 'LOADING_UI';
export const STOP_LOADING_UI = 'STOP_LOADING_UI';
export const CLEAR_ERRORS = 'CLEAR_ERRORS';
export const LOADING_DATA = 'LOADING_DATA';

// Data reducer types
export const SET_POSTS = 'SET_POSTS'; // retrieve all posts
export const SET_POST = 'SET_POST'; // single post
export const LIKE_POST = 'LIKE_POST';
export const UNLIKE_POST = 'UNLIKE_POST';
export const DELETE_POST = 'DELETE_POST';
export const ADD_POST = 'ADD_POST';
export const NEW_POST_CLICK = 'NEW_POST_CLICK';
export const COMMENT_CLICK = 'COMMENT_CLICK';
export const SUMBIT_COMMENT = 'SUMBIT_COMMENT';
export const NOTIFY_POST_SUCCESS = 'NOTIFY_POST_SUCCESS';
export const RESET_POST_SUCCESS = 'RESET_POST_SUCCESS';
export const NOTIFY_DELETE_SUCCESS = 'NOTIFY_DELETE_SUCCESS';
export const RESET_DELETE_SUCCESS = 'RESET_DELETE_SUCCESS';