import {
	SET_POSTS,
	SET_POST,
	LOADING_DATA,
	LIKE_POST,
	UNLIKE_POST,
	DELETE_POST,
	ADD_POST,
	NEW_POST_CLICK,
	COMMENT_CLICK
} from "../types";

const initialState = {
	posts: [],
	post: {},
	loading: false,
	newPostClick: false
};

let index;

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
				state.post = action.payload;
			}
			return {
				...state,
				newPostClick: false
			};
		case DELETE_POST:
			index = state.posts.findIndex((post) => post.postId === action.payload);
			state.posts.splice(index, 1);
			return {
				...state,
				newPostClick: false
			};
		case ADD_POST:
			return {
				...state,
				posts: [action.payload, ...state.posts]
			};
		default:
			return {
				...state
			}
	}
}