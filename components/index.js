/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
	AppRegistry,
	StyleSheet,
	Text,
	View
} from 'react-native';

import LightProgrammer from './LightProgrammer.js';

export default class hatIotConfig extends Component {
	render() {
		return (
			<View style={styles.container}>
				<LightProgrammer />
				<Text style={styles.text}>
					Press Cmd+R to reload,{'\n'}
					Cmd+D or shake for dev menu
				</Text>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#222',
	},
	text: {
		color: '#999',
	}
});
