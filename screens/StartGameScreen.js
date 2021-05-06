import React, { useState } from "react";
import {
	View,
	Text,
	StyleSheet,
	Button,
	TouchableWithoutFeedback,
	Keyboard,
	Alert,
} from "react-native";

import Card from "../components/Card";
import Input from "../components/Input";

import Colors from "../constants/colors";

export default function StartGameScreen(props) {
	const [enteredValue, setEnteredValue] = useState("");
	const [confirmed, setConfirmed] = useState(false);
	const [selectedNumber, setSelectedNumber] = useState();

	function enteredTextHandler(enteredText) {
		setEnteredValue(enteredText.replace(/[^0-9]/g, ""));
	}

	function resetInputHandler() {
		setEnteredValue("");
		setConfirmed(false);
	}

	function confirmInputHandler() {
		const chosenNumber = globalThis.parseInt(enteredValue);
		if (
			globalThis.isNaN(chosenNumber) ||
			chosenNumber <= 0 ||
			chosenNumber > 99
		) {
			Alert.alert(
				"Invalid number selected!",
				"Please enter a number between 1 and 99.",
				[{ text: "Okay", style: "destructive", onPress: resetInputHandler }]
			);
			return;
		}

		setConfirmed(true);
		setSelectedNumber(chosenNumber);
		setEnteredValue("");
	}

	let confirmedOutput;

	if (confirmed) {
		confirmedOutput = (
			<View style={styles.confirmedOutput}>
				<Text>Chosen Number: {selectedNumber}</Text>
				<View style={styles.button}>
					<Button
						title="START GAME"
						color={Colors.primary}
						onPress={() => {}}
					/>
				</View>
			</View>
		);
	}

	return (
		<TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
			<View style={styles.screen}>
				<Text style={styles.title}>Start A New Game!</Text>

				<Card style={styles.inputContainer}>
					<Text>Select A Number</Text>

					<Input
						keyboardType="number-pad"
						blurOnSubmit
						autoCapitalize="none"
						autoCorrect={false}
						maxLength={2}
						style={styles.input}
						value={enteredValue}
						onChangeText={enteredTextHandler}
					/>

					<View style={styles.buttonContainer}>
						<View style={styles.button}>
							<Button
								title="RESET"
								onPress={resetInputHandler}
								color={Colors.accent}
							/>
						</View>
						<View style={styles.button}>
							<Button
								title="CONFIRM"
								onPress={confirmInputHandler}
								color={Colors.primary}
							/>
						</View>
					</View>
				</Card>
				{confirmedOutput}
			</View>
		</TouchableWithoutFeedback>
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

	input: {
		width: 50,
		textAlign: "center",
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

  confirmedOutput: {
    height: 90,
    marginVertical: 10,
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
  },
});
