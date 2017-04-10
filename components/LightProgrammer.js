
import React, { Component } from 'react';
import {
	AppRegistry,
	StyleSheet,
	View,
 } from 'react-native';


class LightProgrammerElement extends Component {
	render() {
		return (
			<View style={[styles.element, this.getColorStyle()]}></View>
		);
	}
	getColorStyle() {
		var backgroundColor = (this.props.value) ? '#FFF' : '#000' ;
		return {
			backgroundColor: backgroundColor
		}
	}
}


export default class LightProgrammer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			value: false
		};

		var lastMillis = 0;
		var hackyDelay = 0;

		var fps = 30;
		var expected_frametime = 1000/fps;
		var max_frametime = expected_frametime*1.20;

		var expected_frametime_trigger = expected_frametime*0.8

		var frametime = 0;
		var remainder = 0;

		var byteTime = expected_frametime * 8;

		setInterval(() => {
			var d = new Date();
			var n = d.getMilliseconds();

			var prev_lastMillis = lastMillis;

			var updatetime = n - lastMillis;
			lastMillis = n;

			if (updatetime < 0) {
				return;
			}

			if (hackyDelay > 0) {
				hackyDelay--;
				return;
			}
			
			frametime += updatetime;

			if (frametime < expected_frametime_trigger) {
				return;
			}
			var actual_frametime = frametime - remainder;
			//console.log(actual_frametime);
			remainder = frametime - expected_frametime;
			frametime = remainder;	// Add remainder to the next frame?

			if (prev_lastMillis > 0 && actual_frametime > max_frametime) {
				console.log(actual_frametime);
				frametime = 0;
				lastMillis = 0;
				hackyDelay = byteTime;
				return;
			}

			// if (lastMillis > 0 && frametime > max_frametime) {
			// 	lastMillis = 0;
			// 	hackyDelay = byteTime;
			// 	return;
			// }

			this.setState({ value: !this.state.value });
		}, 1);
	}

	render() {
		return (
			<View style={styles.container}>
				<LightProgrammerElement value={this.state.value} />
				<LightProgrammerElement value={!this.state.value} />
			</View>
		);
	}
	// componentDidUpdate() {
	// 		test--;
	// 	console.log(test);
	// }
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		backgroundColor: '#00FF00',
	},
	element: {
		flex: 1,
		flexDirection: 'row',
		height: 100,
		backgroundColor: '#FF0000',
	},
});


AppRegistry.registerComponent('LightProgrammer', () => LightProgrammer);