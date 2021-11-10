export default function moviesReducer(state = { ...defaultState, }, action) {
	let newState = { ...state, };
	switch(action.type) {
		case 'RESET_MOVIES': {
			return { ...defaultState, };
		}
		default:
			return newState;
	}
}

const defaultState = {
};
