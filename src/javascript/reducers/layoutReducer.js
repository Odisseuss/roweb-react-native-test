export default function layoutReducer(state = { ...defaultState, }, action) {
	let newState = { ...state, };
	switch(action.type) {
		case 'INTERNET_CONNECTION_CHANGE': {
			const { isConnected, } = action.payload;
			newState.isConnected = isConnected;
			return newState;
		}
		case 'RESET_LAYOUT': {
			return { ...defaultState, };
		}
		default:
			return newState;
	}
}

const defaultState = {
	isConnected: false,
};
