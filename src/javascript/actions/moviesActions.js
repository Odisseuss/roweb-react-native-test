import axios from 'axios';
import { calls, } from '../utils/calls.js';

/**
 * Get the top rated movies
 * @param pageNumber {Number}
 * @returns {Function}
 */
export const getTopRatedMovies = pageNumber => {
	return dispatch => {
		dispatch({ type: 'GET_TOP_RATED_MOVIES', });
		return axios(calls.getTopRatedMovies(pageNumber))
			.then(res => {
				dispatch({
					type: 'GET_TOP_RATED_MOVIES_FULFILLED',
					payload: {
						movies: res.data?.results,
					},
				});
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
 * @returns {Function}
 */
export const searchMovies = data => {
	return dispatch => {
		dispatch({ type: 'SEARCH_MOVIES', });
		return axios(calls.searchMovies(data))
			.then(res => {
				dispatch({
					type: 'SEARCH_MOVIES_FULFILLED',
					payload: {
						movies: res.data?.results,
						pageNumber: data.pageNumber,
					},
				});
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