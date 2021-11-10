export default function moviesReducer(state = { ...defaultState, }, action) {
	let newState = { ...state, };
	switch(action.type) {
		case 'GET_TOP_RATED_MOVIES': {
			newState.fetchingTopRatedMovies = true;
			return newState;
		}
		case 'GET_TOP_RATED_MOVIES_FULFILLED': {
			const { movies, pageNumber, } = action.payload;
			newState.fetchingTopRatedMovies = false;
			newState.fetchTopRatedMoviesError = null;
			if (newState.topRatedMoviesPage === 1) {
				newState.topRatedMovies = movies || [];
			} else {
				newState.topRatedMovies = [
					...newState.topRatedMovies,
					...( movies || [] )
				];
			}
			newState.topRatedMoviesPage = pageNumber + 1;
			return newState;
		}
		case 'GET_TOP_RATED_MOVIES_REJECTED': {
			const { error, } = action.payload;
			newState.fetchingTopRatedMovies = false;
			newState.fetchTopRatedMoviesError = error;
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
	fetchingTopRatedMovies: false,
	fetchTopRatedMoviesError: null,
	topRatedMovies: [],
	topRatedMoviesPage: 1,
};
