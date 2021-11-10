import React, { PureComponent, } from 'react';
import { Box, Divider, HStack, VStack, } from 'native-base';

class Header extends PureComponent {
	render() {
		const { children, } = this.props;

		return (
			<HStack
				bg="white"
				px="1"
				py="3">
				<HStack
					space={ 4 }>
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
							alignItems="flex-start">
							{ children }
						</VStack>
					</VStack>
				</HStack>
			</HStack>
		);
	}
}

export default Header;