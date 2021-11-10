import React, { PureComponent, } from 'react';
import generateNewStore from './src/javascript/store.js';
import { Provider, } from 'react-redux';
import RootNavigator from './src/javascript/navigators/RootNavigator.js';
import { NativeBaseProvider, } from 'native-base';

if (process.env.NODE_ENV === 'development') {
	const whyDidYouRender = require('@welldone-software/why-did-you-render');
	whyDidYouRender(React);
}

let store = generateNewStore();

class App extends PureComponent {
	render() {
		return (
			<NativeBaseProvider>
				<Provider store={ store }>
					<RootNavigator/>
				</Provider>
			</NativeBaseProvider>
		);
	}
}

export default App;