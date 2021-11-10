import React, { PureComponent, } from 'react';
import { ActivityIndicator, } from 'react-native';
import { Box, Center, Divider, FlatList, Heading, HStack, Icon, Input, Text, VStack, } from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons.js';
import { connect, } from 'react-redux';
import { getTopRatedMovies, } from '../../actions/moviesActions.js';
import { texts, } from '../../i18n/en.js';

class Home extends PureComponent {
	constructor(props) {
		super(props);

		const { movies, } = props;

		this.state = {
			fetchingTopRatedMovies: movies.fetchingTopRatedMovies,
		};
	}

	componentDidMount() {
		this._getTopRatedMovies();
	}

	componentDidUpdate(prevProps) {
		const { movies, } = this.props;

		if (prevProps.movies.fetchingTopRatedMovies && !movies.fetchingTopRatedMovies) {
			this.setState({
				fetchingTopRatedMovies: false,
			});
		}
	}

	_getTopRatedMovies = () => {
		const { fetchingTopRatedMovies, } = this.state;
		const { movies, dispatch, } = this.props;

		if (fetchingTopRatedMovies) {
			return;
		}

		// Redux is slow to update
		this.setState({
			fetchingTopRatedMovies: true,
		}, () => {
			dispatch(getTopRatedMovies(movies.topRatedMoviesPage));
		});
	};

	_renderListItem = ({ item, }) => {
		return (
			<Box
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
			</Box>
		);
	};

	_keyExtractor = ({ id, }) => {
		return id;
	};

	_renderListEmptyComponent = () => {
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
				<Text textAlign={ 'center' }>
					{ texts.noDataToDisplay }
				</Text>
			</Box>
		);
	};

	_getListHeaderComponent = () => {
		return (
			<>
				<HStack
					bg="white"
					px="1"
					py="3"
					justifyContent="space-between"
					alignItems="center">
					<HStack
						space={ 4 }
						alignItems="center">
						<VStack
							space={ 5 }
							width="100%"
							divider={
								<Box px="2">
									<Divider/>
								</Box>
							}>
							<VStack
								width="100%"
								space={ 5 }
								alignItems="center">
								<Input
									placeholder={ texts.search }
									variant="filled"
									width="100%"
									bg="transparent"
									borderRadius="10"
									py="1"
									px="2"
									placeholderTextColor="gray.500"
									_hover={{ bg: 'gray.200', borderWidth: 0, }}
									borderWidth="0"
									_web={{
										_focus: { style: { boxShadow: 'none', }, },
									}}
									InputLeftElement={
										<Icon
											ml="2"
											size="5"
											color="gray.500"
											as={ <Ionicons name="ios-search"/> }
										/>
									}
								/>
							</VStack>
						</VStack>
					</HStack>
				</HStack>
				<Heading
					my={ 4 }
					textAlign={ 'center' }>
					{ texts.topMovies }
				</Heading>
			</>
		);
	};

	_getListFooterComponent = () => {
		const { fetchingTopRatedMovies, } = this.state;

		if (fetchingTopRatedMovies) {
			return (
				<ActivityIndicator/>
			);
		}

		return null;
	};

	render() {
		const { movies, } = this.props;
		const { topRatedMovies, } = movies;

		return (
			<>
				<Box
					safeAreaTop
					bg="white"/>
				<Center
					bg="white"
					minHeight={ '100%' }>
					<FlatList
						data={ topRatedMovies }
						keyExtractor={ this._keyExtractor }
						renderItem={ this._renderListItem }
						onEndReached={ this._getTopRatedMovies }
						onEndReachedThreshold={ 0.7 }
						ListHeaderComponent={ this._getListHeaderComponent }
						ListFooterComponent={ this._getListFooterComponent }
						ListEmptyComponent={ this._renderListEmptyComponent }/>
				</Center>
			</>
		);
	}
}

const mapStateToProps = state => ( {
	movies: state.movies,
} );

export default connect(mapStateToProps)(Home);
