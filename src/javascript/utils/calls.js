import { MOVIE_DB_API_KEY, MOVIE_DB_API_URL, } from './config.js';

export const calls = {
	getTopRatedMovies: pageNumber => ( {
		method: 'GET',
		url: `${ MOVIE_DB_API_URL }/movie/top_rated?api_key=${ MOVIE_DB_API_KEY }&page=${ pageNumber }`,
	} ),
};