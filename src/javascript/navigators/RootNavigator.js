import React, { PureComponent, } from 'react';
import { NavigationContainer, } from '@react-navigation/native';
import { Appearance, StatusBar, } from 'react-native';
import { createStackNavigator, } from '@react-navigation/stack';
import Home from '../components/Home/Home.js';

const { Navigator: StackNavigator, Screen: StackScreen, } = createStackNavigator();

class RootNavigator extends PureComponent {
	constructor(props) {
		super(props);

		this.state = {
			colourScheme: Appearance.getColorScheme(),
			initialRouteName: 'Home',
			screenOptions: {
				headerShown: false,
			},
		};
	}

	render() {
		const { colourScheme, initialRouteName, screenOptions, } = this.state;

		return (
			<>
				<StatusBar barStyle={ colourScheme === 'dark' ? 'light-content' : 'dark-content' }/>
				<NavigationContainer>
					<StackNavigator
						initialRouteName={ initialRouteName }
						screenOptions={ screenOptions }>
						<StackScreen
							name="Home"
							component={ Home }/>
					</StackNavigator>
				</NavigationContainer>
			</>
		);
	}
}

export default RootNavigator;
