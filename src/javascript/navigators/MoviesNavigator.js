import React, { PureComponent, } from 'react';
import { createStackNavigator, } from '@react-navigation/stack';
import Movies from '../components/Movies/Movies.js';
import Movie from '../components/Movie/Movie.js';

const { Navigator: StackNavigator, Screen: StackScreen, } = createStackNavigator();

class MoviesNavigator extends PureComponent {
	constructor(props) {
		super(props);

		this.state = {
			initialRouteName: 'Movies',
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
					name="Movies"
					component={ Movies }/>
				<StackScreen
					name="Movie"
					component={ Movie }/>
			</StackNavigator>
		);
	}
}

export default MoviesNavigator;