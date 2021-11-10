export default function moviesReducer(state = { ...defaultState, }, action) {
	let newState = { ...state, };
	switch(action.type) {
		case 'GET_TOP_RATED_MOVIES': {
			newState.fetchingMovies = true;
			return newState;
		}
		case 'GET_TOP_RATED_MOVIES_FULFILLED': {
			const { movies, } = action.payload;
			newState.fetchingMovies = false;
			newState.fetchingMoviesError = null;
			if (newState.topRatedMoviesPage === 1) {
				newState.topRatedMovies = movies || [];
			} else {
				newState.topRatedMovies = [
					...newState.topRatedMovies,
					...( movies || [] )?.filter(movie => !newState.topRatedMovies.some(topRatedMovie => topRatedMovie.id === movie.id))
				];
			}
			newState.topRatedMoviesPage = newState.topRatedMoviesPage + 1;
			return newState;
		}
		case 'GET_TOP_RATED_MOVIES_REJECTED': {
			const { error, } = action.payload;
			newState.fetchingMovies = false;
			newState.fetchingMoviesError = error;
			return newState;
		}
		case 'SEARCH_MOVIES': {
			newState.fetchingMovies = true;
			return newState;
		}
		case 'SEARCH_MOVIES_FULFILLED': {
			const { movies, pageNumber, } = action.payload;
			newState.fetchingMovies = false;
			newState.fetchingMoviesError = null;
			if (pageNumber === 1) {
				newState.filteredMovies = movies || [];
			} else {
				newState.filteredMovies = [
					...newState.filteredMovies,
					...( movies || [] )?.filter(movie => !newState.filteredMovies.some(filteredMovie => filteredMovie.id === movie.id))
				];
			}
			newState.filteredMoviesPage = newState.filteredMoviesPage + 1;
			return newState;
		}
		case 'SEARCH_MOVIES_REJECTED': {
			const { error, } = action.payload;
			newState.fetchingMovies = false;
			newState.fetchingMoviesError = error;
			return newState;
		}
		case 'RESET_SEARCH_MOVIES': {
			newState.fetchingMovies = false;
			newState.filteredMovies = [];
			newState.filteredMoviesPage = 1;
			return newState;
		}
		case 'RESET_MOVIES': {
			return { ...defaultState, };
		}
		default: {
			return newState;
		}
	}
}

const defaultState = {
	fetchingMovies: true,
	fetchingMoviesError: '',
	topRatedMovies: [],
	topRatedMoviesPage: 1,
	filteredMovies: [],
	filteredMoviesPage: 1,
};
