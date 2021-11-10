export default function moviesReducer(state = { ...defaultState, }, action) {
	let newState = { ...state, };
	switch(action.type) {
		case 'RESET_MOVIES': {
			return { ...defaultState, };
		}
		case 'GET_TOP_RATED_MOVIES_START': {
			newState.fetchingTopRatedMovies = true;
			return newState;
		}
		case 'GET_TOP_RATED_MOVIES_FULFILLED': {
			const { movies, nextResultPage, } = action.payload;
			newState.fetchingTopRatedMovies = false;
			newState.fetchTopRatedMoviesError = null;
			newState.topRatedMovies = movies;
			newState.topRatedMoviesPage = nextResultPage;
			return newState;
		}
		case 'GET_TOP_RATED_MOVIES_REJECTED': {
			const { error, } = action.payload;
			newState.fetchingTopRatedMovies = false;
			newState.fetchTopRatedMoviesError = error;
			return newState;
		}
		default:
			return newState;
	}
}

const defaultState = {
	fetchingTopRatedMovies: false,
	fetchTopRatedMoviesError: null,
	topRatedMovies: null,
	topRatedMoviesPage: 1,
};
