import {
	SET_POSTS,
	SET_POST,
	LOADING_DATA,
	LIKE_POST,
	UNLIKE_POST,
	DELETE_POST,
	ADD_POST,
	NEW_POST_CLICK,
	COMMENT_CLICK,
	SUMBIT_COMMENT,
	DELETE_COMMENT,
	NOTIFY_POST_SUCCESS,
	RESET_POST_SUCCESS,
	NOTIFY_DELETE_SUCCESS,
	RESET_DELETE_SUCCESS,
	NOTIFY_DELETE_COMMENT_SUCCESS,
	RESET_DELETE_COMMENT_SUCCESS
} from "../types";

const initialState = {
	posts: [],
	post: {},
	loading: false,
	newPostClick: false,
	postSuccess: false,
	deleteSuccess: false,
	commentDeleteSuccess: false
};

let index;
let postIndex;
let commentIndex;

export default function(state = initialState, action){
	switch(action.type){
		case LOADING_DATA:
			return {
				...state,
				loading: true
			};
		case SET_POSTS:
			return {
				...state,
				posts: action.payload,
				loading: false
			};
		case SET_POST:
			return {
				...state,
				post: action.payload,
				loading: false
			};
		case NEW_POST_CLICK:
			return {
				...state,
				newPostClick: true
			};
		case COMMENT_CLICK:
			return {
				...state,
				newPostClick: false
			};
		case LIKE_POST:
		case UNLIKE_POST:
			index = state.posts.findIndex((post) => post.postId === action.payload.postId);
			state.posts[index] = action.payload;

			// For open post to show correct likeCount
			if(state.post.postId === action.payload.postId){
				const comments = state.post.comments;
				state.post = {...action.payload, comments};
			}
			return {
				...state
			};
		case DELETE_POST:
			index = state.posts.findIndex((post) => post.postId === action.payload);
			state.posts.splice(index, 1);
			return {
				...state
			};
		case ADD_POST:
			return {
				...state,
				posts: [action.payload, ...state.posts]
			};
		case NOTIFY_POST_SUCCESS:
			return{
				...state,
				postSuccess: true
			};
		case RESET_POST_SUCCESS:
			return{
				...state,
				postSuccess: false
			};
		case NOTIFY_DELETE_SUCCESS:
			return{
				...state,
				deleteSuccess: true
			};
		case RESET_DELETE_SUCCESS:
			return{
				...state,
				deleteSuccess: false
			};
		case NOTIFY_DELETE_COMMENT_SUCCESS:
			return{
				...state,
				commentDeleteSuccess: true
			};
		case RESET_DELETE_COMMENT_SUCCESS:
			return{
				...state,
				commentDeleteSuccess: false
			};
		case SUMBIT_COMMENT:
			index = state.posts.findIndex((post) => post.postId === action.payload.postId);
			state.posts[index].commentCount++;

			state.post.commentCount++;
			return {
				...state,
				post: {
					...state.post,
					comments: [action.payload, ...state.post.comments]
				}
			};
		case DELETE_COMMENT:
			postIndex = state.posts.findIndex((post) => post.postId === state.post.postId);
			state.posts[postIndex].commentCount--;

			commentIndex = state.post.comments.findIndex((comment) => comment.commentId === action.payload);
			state.post.comments.splice(commentIndex, 1);
			state.post.commentCount--;

			return {
				...state,
				post: {
					...state.post,
					comments: [...state.post.comments]	
				}
			};
		default:
			return {
				...state
			}
	}
}