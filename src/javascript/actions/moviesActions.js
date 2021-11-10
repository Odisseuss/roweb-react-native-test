import axios from 'axios';
import { calls, } from '../utils/calls.js';

export const getTopRatedMovies = (pageNumber, currentMovies) => {
	return dispatch => {
		dispatch({ type: 'GET_TOP_RATED_MOVIES_START', });
		return axios(calls.getTopRatedMovies(pageNumber))
			.then(movies => {
				if(pageNumber === 1){
					dispatch({
						type: 'GET_TOP_RATED_MOVIES_FULFILLED',
						payload: { movies: movies.data.results, nextResultPage: pageNumber + 1, },
					});
				}else{
					dispatch({
						type: 'GET_TOP_RATED_MOVIES_FULFILLED',
						payload: { movies: [...currentMovies, ...movies.data.results], nextResultPage: pageNumber + 1, },
					});
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
