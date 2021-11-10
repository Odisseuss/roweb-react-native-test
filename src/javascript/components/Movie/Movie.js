import React, { PureComponent, } from 'react';
import { Box, Button, Flex, Image, Text, } from 'native-base';
import { texts, } from '../../i18n/en.js';
import Header from '../Templates/Header.js';
import { getImage, } from '../../utils/utils.js';
import { pageTitle, regularText, sectionTitle, } from '../../utils/config.js';

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
					<Image
						source={ getImage(movie.backdrop_path) }
						alt={ movie.title }
						width="100%"
						height={ 225 }
						resizeMode="contain"/>
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
						{ 'Rares TODO fill some more data here' }
					</Text>
					<Text { ...regularText }>
						{ 'You can also store the images in cache if you want to and it doesn\'t take too long' }
					</Text>
				</Box>
			</Flex>
		);
	}
}

export default Movie;