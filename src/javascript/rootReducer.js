import { combineReducers, } from 'redux';
import moviesReducer from './reducers/moviesReducer.js';
import layoutReducer from './reducers/layoutReducer.js';

export const createRootReducer = () => combineReducers({
	movies: moviesReducer,
	layout: layoutReducer,
});
