import React from "react";
import { View, Text, TextInput, StyleSheet, Button } from "react-native";

import Card from '../components/Card';

import Colors from '../constants/colors';

export default function StartGameScreen(props) {
	return (
		<View style={styles.screen}>
			<Text style={styles.title}>Start A New Game!</Text>

			<Card style={styles.inputContainer}>
				<Text style={styles.inputTitle}>Select A Number</Text>
				<TextInput style={styles.inputText} />

				<View style={styles.buttonContainer}>
					<View style={styles.button}>
						<Button title="RESET" onPress={() => {}} color={Colors.primary} />
					</View>
					<View style={styles.button}>
						<Button title="CONFIRM" onPress={() => {}} color={Colors.accent} />
					</View>
				</View>
			</Card>
		</View>
	);
}

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		padding: 10,
		alignItems: "center",
	},

	title: {
		fontSize: 20,
		marginVertical: 10,
	},

	inputContainer: {
		width: 300,
		maxWidth: "80%",
		alignItems: "center",
	},

	inputTitle: {},

	inputText: {
		width: "100%",
		padding: 10,
		borderWidth: 1,
		borderColor: "#000",
	},

	buttonContainer: {
		width: "100%",
		flexDirection: "row",
		justifyContent: "space-between",
		paddingHorizontal: 15,
	},

	button: {
    width: "45%",
  },
});
