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
	View,
	Button
} from 'react-native';

import LightProgrammer from './LightProgrammer.js';

export default class hatIotConfig extends Component {
	constructor(props) {
		super(props);
		this.state = {
			programmer_isRunning: false
		};
	}

	render() {
		return (
			<View style={styles.container}>
				<LightProgrammer
					ref={(lp) => { this.lightProgrammer = lp; }}
				/>
				<Text style={styles.text}>
					Press Cmd+R to reload,{'\n'}
					Cmd+D or shake for dev menu
				</Text>
				<Button
					onPress={this._doStartProgram}
					title="Program"
				/>
			</View>
		);
	}

	_doStartProgram = () => {
		this.lightProgrammer.start();
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
