import { calls, } from '../utils/calls.js';
import { axiosWrapper, } from '../utils/utils.js';

/**
 * Get the top rated movies
 * @param pageNumber {Number}
 * @param callback {Function}
 * @returns {Function}
 */
export const getTopRatedMovies = (pageNumber, callback = null) => {
	return dispatch => {
		dispatch({ type: 'GET_TOP_RATED_MOVIES', });
		return axiosWrapper(calls.getTopRatedMovies(pageNumber))
			.then(res => {
				if (!res) {
					dispatch({ type: 'GET_TOP_RATED_MOVIES_REJECTED', });
					return;
				}
				const movies = res?.data?.results || [];
				dispatch({
					type: 'GET_TOP_RATED_MOVIES_FULFILLED',
					payload: {
						movies: movies,
					},
				});
				if (callback) {
					callback(movies);
				}
			})
			.catch(err => {
				dispatch({
					type: 'GET_TOP_RATED_MOVIES_REJECTED',
					payload: { error: err.message, },
				});
			});
	};
};

/**
 * Get the top rated movies
 * @param data {Object}
 * @param callback {Function}
 * @returns {Function}
 */
export const searchMovies = (data, callback = null) => {
	return dispatch => {
		dispatch({ type: 'SEARCH_MOVIES', });
		return axiosWrapper(calls.searchMovies(data))
			.then(res => {
				if (!res) {
					dispatch({ type: 'SEARCH_MOVIES_REJECTED', });
					return;
				}
				const movies = res?.data?.results || [];
				dispatch({
					type: 'SEARCH_MOVIES_FULFILLED',
					payload: {
						movies: movies,
						pageNumber: data.pageNumber,
					},
				});
				if (callback) {
					callback(movies);
				}
			})
			.catch(err => {
				dispatch({
					type: 'SEARCH_MOVIES_REJECTED',
					payload: {
						error: err.message,
					},
				});
			});
	};
};