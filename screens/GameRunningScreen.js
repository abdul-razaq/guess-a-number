import React, { useState, useRef, useEffect } from "react";
import { View, Text, ScrollView, StyleSheet, Alert } from "react-native";

import DefaultStyles from "../constants/default-styles";

import { Ionicons } from "@expo/vector-icons";
import NumberContainer from "../components/NumberContainer";
import PrimaryButton from "../components/PrimaryButton";
import Card from "../components/Card";
import BodyText from "../components/BodyText";
import Colors from "../constants/colors";

function generateRandomBetween(min, max, exclude) {
	min = Math.ceil(min);
	max = Math.floor(max);
	const randomNumber = Math.floor(Math.random() * (max - min)) + min;

	if (randomNumber === exclude) {
		return generateRandomBetween(min, max, exclude);
	}
	return randomNumber;
}

function renderListItem(value, numOfRounds) {
	return (
		<View key={value} style={styles.listItem}>
			<BodyText>#{numOfRounds}</BodyText>
			<BodyText>{value}</BodyText>
		</View>
	);
}

export default function GameRunningScreen(props) {
	const initialGuess = generateRandomBetween(1, 100, props.userChoice);
	const [currentGuess, setCurrentGuess] = useState(initialGuess);
	const [pastGuesses, setPastGuesses] = useState([initialGuess]);

	const currentLow = useRef(1);
	const currentHigh = useRef(100);

	const { userChoice, onGameOver } = props;

	useEffect(() => {
		if (currentGuess === userChoice) {
			onGameOver(pastGuesses.length);
		}
	}, [currentGuess, userChoice, onGameOver]);

	function nextGuessHandler(direction) {
		if (
			(direction === "lower" && currentGuess < props.userChoice) ||
			(direction === "higher" && currentGuess > props.userChoice)
		) {
			Alert.alert("Don't lie! :)", "You know that this is wrong... LOL", [
				{ text: "Sorry!", style: "cancel" },
			]);
			return;
		}
		if (direction === "lower") {
			currentHigh.current = currentGuess;
		} else {
			currentLow.current = currentGuess + 1;
		}
		const nextRandomNumber = generateRandomBetween(
			currentLow.current,
			currentHigh.current,
			currentGuess
		);
		setCurrentGuess(nextRandomNumber);
		// setRounds(currentRounds => currentRounds + 1);
		setPastGuesses(currPastGuesses => [nextRandomNumber, ...currPastGuesses]);
	}

	return (
		<View style={styles.screen}>
			<Text style={DefaultStyles.title}>Opponent's Guess:</Text>
			<NumberContainer>{currentGuess}</NumberContainer>
			<Card style={styles.buttonContainer}>
				<PrimaryButton
					onPress={nextGuessHandler.bind(null, "lower")}
					color={Colors.primary}
				>
					<Ionicons name="md-remove" size={24} color="#fff" />
				</PrimaryButton>

				<PrimaryButton
					onPress={nextGuessHandler.bind(null, "higher")}
					color={Colors.primary}
				>
					<Ionicons name="md-add" size={24} color="#fff" />
				</PrimaryButton>
			</Card>
			<View style={styles.listContainer}>
				<ScrollView contentContainerStyle={styles.list}>
					{pastGuesses.map((guess, index) =>
						renderListItem(guess, pastGuesses.length - index)
					)}
				</ScrollView>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		padding: 10,
		alignItems: "center",
	},

	buttonContainer: {
		flexDirection: "row",
		justifyContent: "space-around",
		marginTop: 20,
		width: 300,
		maxWidth: "80%",
	},

	listContainer: {
		flex: 1,
		width: "80%",
	},

	list: {
		flexGrow: 1,
		alignItems: "center",
		justifyContent: "flex-end",
	},

	listItem: {
		borderWidth: 1,
		borderColor: "#ccc",
		padding: 15,
		marginVertical: 10,
		backgroundColor: "#fff",
		flexDirection: "row",
		justifyContent: "space-between",
		width: "60%",
	},
});
