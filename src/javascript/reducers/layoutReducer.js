export default function layoutReducer(state = { ...defaultState, }, action) {
	let newState = { ...state, };
	switch(action.type) {
		case 'NETWORK_STATE_CHANGE': {
			const { isConnected, } = action.payload;
			newState.isConnected = isConnected;
			return newState;
		}
		case 'RESET_EVERYTHING': {
			return { ...defaultState, };
		}
		default: {
			return newState;
		}
	}
}

const defaultState = {
	isConnected: true,
};
