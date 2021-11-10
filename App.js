import React, { PureComponent, } from 'react';
import generateNewStore from './src/javascript/store.js';
import { Provider, } from 'react-redux';
import RootNavigator from './src/javascript/navigators/RootNavigator.js';
import { NativeBaseProvider, } from 'native-base';
import { AppContext, } from './src/javascript/AppContext.js';
import EventEmitter from './src/javascript/utils/EventEmitter.js';
import Realm from 'realm';
import moment from 'moment';

if (process.env.NODE_ENV === 'development') {
	const whyDidYouRender = require('@welldone-software/why-did-you-render');
	whyDidYouRender(React);
}

let store = generateNewStore();
const client = new EventEmitter();

class App extends PureComponent {
	async componentDidMount() {
		// You need to close and open the app after changing something here
		const MovieSchema = {
			name: 'Movie',
			properties: {
				id: 'int',
				title: 'string',
				overview: 'string',
				backdrop_path: 'string',
				createdOn: 'date',
			},
			primaryKey: 'id',
		};

		this.realm = await Realm.open({
			path: 'application-0-hzxss',
			schema: [MovieSchema],
			deleteRealmIfMigrationNeeded: process.env.NODE_ENV === 'development',
		});

		store.dispatch({
			type: 'SET_OFFLINE_MOVIES',
			payload: { movies: this.realm.objects('Movie').sorted('createdOn', true).slice(0, 9), },
		});

		client.subscribe('ADD_MOVIES_TO_REALM', this._addMoviesToRealmListener);
	}

	_addMoviesToRealmListener = payload => {
		const { movies = [], } = payload;

		this.realm.write(() => {
			movies.forEach(movie => {
				// Check if the movie already exists - since those don't change just leave them as they were
				if (!this.realm.objects('Movie').filtered(`id = ${ movie.id }`)?.length) {
					this.realm.create('Movie', {
						...movie,
						createdOn: moment().format(),
					});
				}
			});
		});
	};

	componentWillUnmount() {
		this.realm.close(); // doesn't really matter if we do this or not on this app
	}

	appContext = {
		client: client,
	};

	render() {
		return (
			<NativeBaseProvider>
				<Provider store={ store }>
					<AppContext.Provider value={ this.appContext }>
						<RootNavigator/>
					</AppContext.Provider>
				</Provider>
			</NativeBaseProvider>
		);
	}
}

export default App;