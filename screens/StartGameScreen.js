import React, { useState } from "react";
import {
	View,
	Button,
	StyleSheet,
	TouchableWithoutFeedback,
	Keyboard,
	Alert,
	Dimensions,
	KeyboardAvoidingView,
} from "react-native";

import TitleText from "../components/TitleText";
import BodyText from "../components/BodyText";

import PrimaryButton from "../components/PrimaryButton";
import Card from "../components/Card";
import Input from "../components/Input";
import NumberContainer from "../components/NumberContainer";

import Colors from "../constants/colors";

export default function StartGameScreen(props) {
	const [enteredValue, setEnteredValue] = useState("");
	const [confirmed, setConfirmed] = useState(false);
	const [selectedNumber, setSelectedNumber] = useState();
	const [buttonWidth, setButtonWidth] = useState(
		Dimensions.get("window").width / 4
	);

	useEffect(() => {
		function updateLayout() {
			setButtonWidth(Dimensions.get("window").width / 4);
		}
		// Recalculate the width Dimensions when the screen orientation changes
		Dimensions.addEventListener("change", updateLayout);
		return function () {
			Dimensions.removeEventListener("change", updateLayout);
		};
	});

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
		Keyboard.dismiss();
	}

	let confirmedOutput;

	if (confirmed) {
		confirmedOutput = (
			<Card style={styles.summaryContainer}>
				<BodyText>You selected:</BodyText>
				<NumberContainer>{selectedNumber}</NumberContainer>
				<View style={styles.button}>
					<PrimaryButton
						color={Colors.primary}
						onPress={props.onGameStart.bind(null, selectedNumber)}
					>
						START GAME
					</PrimaryButton>
				</View>
			</Card>
		);
	}

	return (
		<ScrollView>
			<KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={30}>
				<TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
					<View style={styles.screen}>
						<TitleText style={styles.title}>Start A New Game!</TitleText>

						<Card style={styles.inputContainer}>
							<BodyText>Select A Number</BodyText>

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
								<View style={buttonWidth}>
									<Button
										title="RESET"
										onPress={resetInputHandler}
										color={Colors.accent}
									/>
								</View>
								<View style={buttonWidth}>
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
			</KeyboardAvoidingView>
		</ScrollView>
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
		// we want a fixed width of 80% for all big screens
		// and then we can make sure we have a minimum width of 300.
		width: "80%",
		// when we are on a small device, the minimum width that should be applied is 300
		// so on a small device, the minWidth of 300 is applied instead of the width of 80%
		// on a smaller device, minWidth of 300 can even cause this container to overflow to the edges...
		// i.e on a smaller device, the width might be smaller than 300px which can cause this container to overflow to the edges...
		// For this, to ensure that the container never leave our boundaries even on a very small device that has a width that is less than 300px, we need to set the maxWidth to a value e.g 90%.
		minWidth: 300,
		// with this maxWidth value, we ensure that our container never goes outside of the screen edges.
		// But in summary, our container takes 80% of the screen by default on larger devices, but if we have a smaller screen, then the width of 300px is applied, but the container will never take more than 95% of the available width no matter how small the device screen is... So that means no matter how the device screen width is small, the container will never take more than 95% of the entire available width... that means there will still be 5% spacing available in the entire screen no matter how small the device is and the container will not overflow to the edges since the container didn't take 100% of the spaces but 95% and there is 5% spacing left no matter now small the device width is, 5% spacing will always be available so that the container does not get to the edges...
		maxWidth: "95%",
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

	// button: {
	// 	// width: "45%",
	// 	width: Dimensions.get("window").width / 4,
	// },

	summaryContainer: {
		height: 170,
		marginTop: 20,
		justifyContent: "space-between",
		alignItems: "center",
		padding: 20,
	},
});
