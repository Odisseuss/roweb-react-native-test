import React, { PureComponent } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Appearance, StatusBar } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../components/Home/Home.js';
import Search from '../components/Home/Search.js';

const { Navigator: StackNavigator, Screen: StackScreen } = createStackNavigator();

class HomeNavigator extends PureComponent {
	constructor(props) {
		super(props);

		this.state = {
			initialRouteName: 'Home',
			screenOptions: {
				headerShown: false,
			},
		};
	}

	render() {
		const { initialRouteName, screenOptions, } = this.state;

		return (
			<StackNavigator
				initialRouteName={ initialRouteName }
				screenOptions={ screenOptions }>
				<StackScreen
					name="Home"
					component={ Home }/>
				<StackScreen
					name="Search"
					component={ Search }/>
			</StackNavigator>
		);
	}
}

export default HomeNavigator;
