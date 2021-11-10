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
						pageNumber: pageNumber,
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