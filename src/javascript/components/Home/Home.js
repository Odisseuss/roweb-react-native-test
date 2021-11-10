import React, { PureComponent, } from 'react';
import { Text, View, } from 'native-base';
import { SafeAreaView, } from 'react-native';

class Home extends PureComponent {
	constructor(props) {
		super(props);

		this.state = {};
	}

	render() {
		return (
			<SafeAreaView>
				<View><Text>Hello from the Home screen</Text></View>
			</SafeAreaView>
		);
	}
}

export default Home;
