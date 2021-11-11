import AsyncStorage from '@react-native-async-storage/async-storage';
import { IMAGES_BASE_URL, } from './config.js';
import NetInfo from '@react-native-community/netinfo';
import axios from 'axios';

/**
 * Sets multiple keys in AsyncStorage
 * @param values {Array}
 * @returns {Promise}
 */
export const setMultipleKeysInStorage = async values => {
	return AsyncStorage.multiSet(values);
};

/**
 * Gets multiple keys from AsyncStorage
 * @param keys {Array}
 * @returns {Promise}
 */
export const getMultipleKeysFromStorage = async keys => {
	return AsyncStorage.multiGet(keys);
};

/**
 * Clear AsyncStorage
 * @returns {Promise}
 */
export const clearStorage = async() => {
	return AsyncStorage.clear();
};

/**
 * Appends the images base url
 * @param source {String}
 * @returns {Object}
 */
export const getImage = source => {
	return { uri: `${ IMAGES_BASE_URL }${ source }`, };
};

/**
 * Wrapper for axios to prevent an API call that would just fail
 * @param args {Object}
 * @returns {Promise}
 */
export const axiosWrapper = args => {
	return NetInfo
		.fetch()
		.then(state => {
			if (state.isConnected) {
				return axios(args);
			}
		});
};

/**
 * Encode an image
 * @param arrayBuffer {ArrayBuffer}
 * @returns {String}
 */
export const encodeImage = arrayBuffer => {
	let b64encoded = btoa([].reduce.call(new Uint8Array(arrayBuffer), (p, c) => {return p + String.fromCharCode(c);}, ''));
	let mimetype = 'image/jpeg';
	return 'data:' + mimetype + ';base64,' + b64encoded;
};
