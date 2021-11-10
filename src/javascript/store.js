import { applyMiddleware, compose, createStore, } from 'redux';
import { createRootReducer, } from './rootReducer.js';
import thunk from 'redux-thunk';
import devToolsEnhancer from 'remote-redux-devtools';
import { Platform, } from 'react-native';

const enhancer = compose(
	applyMiddleware(thunk),
	devToolsEnhancer({
		name: Platform.OS,
		realtime: true,
		hostname: 'localhost',
		port: 8081,
	})
);

export default function generateNewStore() {
	return createStore(
		createRootReducer(),
		enhancer
	);
}
