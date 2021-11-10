import { applyMiddleware, createStore, } from 'redux';
import { createRootReducer, } from './rootReducer.js';
import thunk from 'redux-thunk';

let middlewares = [
	thunk
];

if (__DEV__) {
	const createDebugger = require('redux-flipper').default;
	middlewares.push(createDebugger());
}

export default function generateNewStore() {
	return createStore(createRootReducer(), applyMiddleware(...middlewares));
}