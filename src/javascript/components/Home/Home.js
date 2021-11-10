import React, { PureComponent } from 'react';
import {
	Box,
	Center,
	Divider,
	Heading,
	HStack,
	Icon,
	Input,
	VStack,
	FlatList,
	Text,
} from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons.js';
import { connect } from 'react-redux';
import { getTopRatedMovies } from '../../actions/moviesActions.js';

class Home extends PureComponent {
	constructor(props) {
		super(props);
	}

	_getTopRatedMovies = () => {
		const { dispatch, movies } = this.props;
		const { topRatedMoviesPage, topRatedMovies } = movies;

		dispatch(getTopRatedMovies(topRatedMoviesPage, topRatedMovies));
	};

	componentDidMount() {
		this._getTopRatedMovies();
	}

	_renderListItem = ({ item }) => {
		return (
			<Box
				bg="emerald.400"
				borderRadius="md"
				justifyContent="center"
				_text={ { fontSize: '2xl' } }
				px={ 4 }
				py={ 2 }
				my={ 2 }
				mx={ 2 }
			>
				<Text>{ item.title }</Text>
			</Box>

		);
	};

	_keyExtractor = ({ id }) => {
		return id;
	};

	_renderSearchBar = () => {
		return (
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
						placeholder="Search"
						variant="filled"
						width="100%"
						bg="transparent"
						borderRadius="10"
						py="1"
						px="2"
						placeholderTextColor="gray.500"
						_hover={ { bg: 'gray.200', borderWidth: 0 } }
						borderWidth="0"
						_web={ {
							_focus: { style: { boxShadow: 'none' } },
						} }
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
		);
	};

	render() {
		const { movies } = this.props;
		const { topRatedMovies, topRatedMoviesPage } = movies;
		console.log(topRatedMoviesPage)
		return (
			<>
				<Box
					safeAreaTop
					backgroundColor="#6200ee"/>
				<HStack
					bg="#6200ee"
					px="1"
					py="3"
					justifyContent="space-between"
					alignItems="center">
					<HStack
						space="4"
						alignItems="center">
						{ this._renderSearchBar() }
					</HStack>
				</HStack>
				<Center>
					<Heading>Top Movies</Heading>
					<FlatList
						data={ topRatedMovies }
						keyExtractor={ this._keyExtractor }
						renderItem={ this._renderListItem }
						onEndReached={ this._getTopRatedMovies }
						onEndReachedThreshold={ 1 }
					/>
				</Center>
			</>
		);
	}
}

const mapStateToProps = state => ( {
	movies: state.movies,
} );

export default connect(mapStateToProps)(Home);
