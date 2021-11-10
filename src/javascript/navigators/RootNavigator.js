import React, { PureComponent, } from 'react';
import { NavigationContainer, } from '@react-navigation/native';
import { Appearance, StatusBar, } from 'react-native';
import { createStackNavigator, } from '@react-navigation/stack';
import MoviesNavigator from './MoviesNavigator.js';
import NetInfo from '@react-native-community/netinfo';
import { Box, Text, } from 'native-base';
import { texts, } from '../i18n/en.js';
import { offlineNotice, } from '../utils/config.js';
import { connect, } from 'react-redux';

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
			isConnected: true,
		};
	}

	componentDidMount() {
		const { dispatch, } = this.props;

		// No need to unsubscribe
		NetInfo.addEventListener(state => {
			dispatch({ type: 'NETWORK_STATE_CHANGE', payload: { isConnected: state.isConnected, }, });
			this.setState({
				isConnected: state.isConnected,
			});
		});
	}

	render() {
		const { colourScheme, initialRouteName, screenOptions, isConnected, } = this.state;

		return (
			<>
				<StatusBar barStyle={ colourScheme === 'dark' ? 'light-content' : 'dark-content' }/>
				<Box
					safeAreaTop
					bg="white"/>
				{ !isConnected ? (
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

export default connect()(RootNavigator);
