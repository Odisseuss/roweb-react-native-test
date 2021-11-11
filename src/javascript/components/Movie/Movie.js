import React, { PureComponent, } from 'react';
import { Box, Button, Flex, Image, Text, } from 'native-base';
import { texts, } from '../../i18n/en.js';
import Header from '../Templates/Header.js';
import { getImage, } from '../../utils/utils.js';
import { centeredRegularText, pageTitle, regularText, sectionTitle, } from '../../utils/config.js';
import { connect, } from 'react-redux';
import moment from 'moment';

class Movie extends PureComponent {
	_goBack = () => {
		const { navigation, } = this.props;
		navigation.goBack();
	};

	render() {
		const { route, } = this.props;
		const { movie, } = route.params || {};
		return (
			<Flex
				bg="white"
				minHeight={ '100%' }
				width={ '100%' }>
				<Header>
					<Button
						variant="link"
						onPress={ this._goBack }>
						{ texts.back }
					</Button>
				</Header>
				<Box
					bg="white"
					justifyContent="center"
					pb={ 2 }
					px={ 2 }>
					{ movie.backdrop_path ? (
						<Image
							source={ getImage(movie.backdrop_path) }
							alt={ movie.title }
							width="100%"
							height={ 225 }
							resizeMode="contain"/>
					) : (
						<Text
							{ ...centeredRegularText }
							color={ 'red.500' }
							my={ 4 }>
							{ texts.noImageAvailable }
						</Text>
					) }
					<Text
						{ ...pageTitle }
						my={ 4 }>
						{ movie.title }
					</Text>
					<Text { ...sectionTitle }>
						{ texts.overview }
					</Text>
					<Text { ...regularText }>
						{ movie.overview }
					</Text>
					<Text
						mt={ 4 }
						{ ...sectionTitle }>
						{ texts.details }
					</Text>
					<Text { ...regularText }>
						{ texts.releaseDate }: { moment(movie.release_date).format('YYYY-MM-DD') || texts.unknown }
					</Text>
					<Text { ...regularText }>
						{ texts.popularity }: { parseInt(movie.popularity) }
					</Text>
					<Text { ...regularText }>
						{ texts.rating }: { movie.vote_average }
					</Text>
				</Box>
			</Flex>
		);
	}
}

const mapStateToProps = state => ( {
	layout: state.layout,
} );

export default connect(mapStateToProps)(Movie);
