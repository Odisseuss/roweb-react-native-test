import React, { PureComponent, } from 'react';
import { ActivityIndicator, } from 'react-native';
import { Box, Center, FlatList, Icon, Input, Pressable, Text, } from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons.js';
import { connect, } from 'react-redux';
import { getTopRatedMovies, searchMovies, } from '../../actions/moviesActions.js';
import { texts, } from '../../i18n/en.js';
import Header from '../Templates/Header.js';
import { pageTitle, regularText, } from '../../utils/config.js';
import { AppContext, } from '../../AppContext.js';

class Movies extends PureComponent {
	constructor(props) {
		super(props);

		const { movies, } = props;

		this.state = {
			fetchingMovies: movies.fetchingMovies,
			moviesSearch: '',
			temporarilyDisableGetMoreTopRatedMovies: false,
		};

		this.typingTimeout = null;
		this.temporarilyDisableGetMoreTopRatedMoviesTimeout = null;
	}

	componentDidMount() {
		this._getTopRatedMovies(true);
	}

	componentDidUpdate(prevProps, prevState) {
		const { moviesSearch, } = this.state;
		const { movies, dispatch, } = this.props;

		if (prevProps.movies.fetchingMovies && !movies.fetchingMovies) {
			this.setState({
				fetchingMovies: false,
			});
		}

		if (prevState.moviesSearch && !moviesSearch) {
			dispatch({ type: 'RESET_SEARCH_MOVIES', });
			if (this.typingTimeout) {
				clearTimeout(this.typingTimeout);
			}
		}
	}

	_updateInput = field => value => {
		this.setState({
			[field]: value,
			fetchingMovies: true,
			temporarilyDisableGetMoreTopRatedMovies: true,
		}, () => {
			if (field !== 'moviesSearch') {
				return;
			}

			if (this.typingTimeout) {
				clearTimeout(this.typingTimeout);
			}

			if (this.temporarilyDisableGetMoreTopRatedMoviesTimeout) {
				clearTimeout(this.temporarilyDisableGetMoreTopRatedMoviesTimeout);
			}

			this.temporarilyDisableGetMoreTopRatedMoviesTimeout = setTimeout(() => {
				this.setState({
					temporarilyDisableGetMoreTopRatedMovies: false,
				});
			}, 500);

			this.typingTimeout = setTimeout(() => {
				this._getFilteredMovies(true);
			}, 200);
		});
	};

	_getTopRatedMovies = ignoreLoading => {
		const { fetchingMovies, } = this.state;
		const { movies, dispatch, } = this.props;

		if (!ignoreLoading && fetchingMovies) {
			return;
		}

		// Redux is slow to update
		this.setState({
			fetchingMovies: true,
		}, () => {
			dispatch(getTopRatedMovies(movies.topRatedMoviesPage, this._getMoviesCallback));
		});
	};

	_getFilteredMovies = resetPagination => {
		const { moviesSearch, } = this.state;
		const { movies, dispatch, } = this.props;

		if (!moviesSearch) {
			return;
		}

		const data = {
			search: moviesSearch,
			pageNumber: resetPagination ? 1 : movies.filteredMoviesPage,
		};

		dispatch(searchMovies(data, this._getMoviesCallback));
	};

	_getMoviesCallback = movies => {
		const { client, } = this.context;

		client.emit('ADD_MOVIES_TO_REALM', { movies: movies, });
	};

	_renderListItem = ({ item, }) => {
		return (
			<Pressable
				onPress={ this._navigateTo('Movie', {
					movie: item,
				}) }
				bg="lightBlue.50"
				borderRadius="md"
				justifyContent="center"
				_text={{ fontSize: '2xl', }}
				px={ 4 }
				py={ 2 }
				my={ 2 }
				mx={ 2 }>
				<Text>
					{ item.title }
				</Text>
			</Pressable>
		);
	};

	_keyExtractor = ({ id, }) => {
		return id;
	};

	_renderListEmptyComponent = () => {
		const { fetchingMovies, } = this.state;

		if (fetchingMovies) {
			return null;
		}

		return (
			<Box
				bg="white"
				borderRadius="md"
				justifyContent="center"
				_text={{ fontSize: '2xl', }}
				px={ 4 }
				py={ 2 }
				my={ 2 }
				mx={ 2 }>
				<Text { ...regularText }>
					{ texts.noDataToDisplay }
				</Text>
			</Box>
		);
	};

	_getListHeaderComponent = () => {
		const { moviesSearch, } = this.state;
		const { layout, movies, } = this.props;

		return (
			<>
				<Header>
					<Input
						isReadOnly={ !layout.isConnected }
						placeholder={ texts.search }
						variant="filled"
						width="100%"
						bg="transparent"
						borderRadius="10"
						py="1"
						px="2"
						placeholderTextColor="gray.500"
						borderWidth="0"
						value={ moviesSearch }
						onChangeText={ this._updateInput('moviesSearch') }
						InputLeftElement={
							<Icon
								ml="2"
								size="5"
								color="gray.500"
								as={ <Ionicons name="ios-search"/> }
							/>
						}
					/>
				</Header>
				{ movies.fetchingMoviesError ? (
					<Box
						width="100%"
						my={ 2 }
						px={ 2 }>
						<Box
							bg="red.300"
							borderRadius="md"
							justifyContent="center"
							_text={{ fontSize: '2xl', }}
							px={ 4 }
							py={ 2 }>
							<Text { ...regularText }>
								{ movies.fetchingMoviesError }
							</Text>
						</Box>
					</Box>
				) : null }
				<Text
					my={ 4 }
					{ ...pageTitle }>
					{ moviesSearch ? texts.searchResults : texts.topMovies }
				</Text>
			</>
		);
	};

	_getListFooterComponent = () => {
		const { fetchingMovies, } = this.state;

		if (fetchingMovies) {
			return (
				<ActivityIndicator/>
			);
		}

		return null;
	};

	_navigateTo = (location, props) => () => {
		const { navigation, } = this.props;

		navigation.navigate(location, props || {});
	};

	render() {
		const { moviesSearch, temporarilyDisableGetMoreTopRatedMovies, } = this.state;
		const { movies, layout, } = this.props;

		return (
			<Center
				bg="white"
				minHeight={ '100%' }>
				<FlatList
					data={ moviesSearch ? movies.filteredMovies : movies.topRatedMovies }
					keyExtractor={ this._keyExtractor }
					renderItem={ this._renderListItem }
					onEndReached={ layout.isConnected ? ( temporarilyDisableGetMoreTopRatedMovies ? null : this._getTopRatedMovies ) : null }
					onEndReachedThreshold={ 0.7 }
					ListHeaderComponent={ this._getListHeaderComponent }
					ListFooterComponent={ this._getListFooterComponent }
					ListEmptyComponent={ this._renderListEmptyComponent }/>
			</Center>
		);
	}
}

const mapStateToProps = state => ( {
	movies: state.movies,
	layout: state.layout,
} );

Movies.contextType = AppContext;

export default connect(mapStateToProps)(Movies);
