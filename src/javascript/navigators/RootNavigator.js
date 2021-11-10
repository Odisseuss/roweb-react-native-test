import React, { PureComponent, } from 'react';
import { NavigationContainer, } from '@react-navigation/native';
import { Appearance, StatusBar, } from 'react-native';
import { createStackNavigator, } from '@react-navigation/stack';
import MoviesNavigator from './MoviesNavigator.js';
import NetInfo from '@react-native-community/netinfo';
import { Box, Text, } from 'native-base';
import { texts, } from '../i18n/en.js';
import { offlineNotice, } from '../utils/config.js';

const { Navigator: StackNavigator, Screen: StackScreen, } = createStackNavigator();

class RootNavigator extends PureComponent {
	constructor(props) {
		super(props);

		this.state = {
			colourScheme: Appearance.getColorScheme(),
			initialRouteName: 'HomeScreenNavigator',
			screenOptions: {
				headerShown: false,
			},
			isOffline: false,
		};
	}

	componentDidMount() {
		// No need to unsubscribe
		NetInfo.addEventListener(state => {
			this.setState({
				isOffline: !state.isConnected,
			});
		});
	}

	render() {
		const { colourScheme, initialRouteName, screenOptions, isOffline, } = this.state;

		return (
			<>
				<StatusBar barStyle={ colourScheme === 'dark' ? 'light-content' : 'dark-content' }/>
				<Box
					safeAreaTop
					bg="white"/>
				{ isOffline ? (
					<Box
						bg="black"
						py={ 4 }>
						<Text { ...offlineNotice }>
							{ texts.youAreOffline }
						</Text>
					</Box>
				) : null }
				<NavigationContainer>
					<StackNavigator
						initialRouteName={ initialRouteName }
						screenOptions={ screenOptions }>
						<StackScreen
							name="HomeScreenNavigator"
							component={ MoviesNavigator }/>
					</StackNavigator>
				</NavigationContainer>
			</>
		);
	}
}

export default RootNavigator;
