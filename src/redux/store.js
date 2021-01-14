import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import { composeWithDevTools } from 'redux-devtools-extension';

import userReducer from './reducers/userReducer';
import dataReducer from './reducers/dataReducer';
import uiReducer from './reducers/uiReducer';

import * as actionCreators from './actions/userActions';

const initialState = {};

const middleware = [thunk];

const rootReducer = combineReducers({
	user: userReducer,
	data: dataReducer,
	UI: uiReducer
});

// const store = createStore(
// 	rootReducer, 
// 	initialState, 
// 	compose(
// 		applyMiddleware(...middleware), 
// 		window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
// 	)
// )

const composeEnhancers = composeWithDevTools({ 
    actionCreators, 
    trace: true, 
    traceLimit: 25 
}); 

const store = createStore(rootReducer, initialState, composeEnhancers(
    applyMiddleware(...middleware) 
));

// const store = createStore(
// 	rootReducer, 
// 	initialState, 
// 	composeWithDevTools(
// 		applyMiddleware(...middleware), 
// 		window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
// 	)
// )

export default store;