import React, { useState, useRef, useEffect } from "react";
import { View, Text, Button, StyleSheet, Alert } from "react-native";

import NumberContainer from "../components/NumberContainer";
import Card from "../components/Card";

function generateRandomBetween(min, max, exclude) {
	min = Math.ceil(min);
	max = Math.floor(max);
	const randomNumber = Math.floor(Math.random() * (max - min)) + min;

	if (randomNumber === exclude) {
		return generateRandomBetween(min, max, exclude);
	}
	return randomNumber;
}

export default function GameRunningScreen(props) {
	const [currentGuess, setCurrentGuess] = useState(
		generateRandomBetween(1, 100, props.userChoice)
	);
	const [rounds, setRounds] = useState(0);

	const currentLow = useRef(1);
	const currentHigh = useRef(100);

	const { userChoice, onGameOver } = props;

	useEffect(() => {
		if (currentGuess === userChoice) {
			onGameOver(rounds);
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
			currentLow.current = currentGuess;
		}
		setCurrentGuess(
			generateRandomBetween(
				currentLow.current,
				currentHigh.current,
				currentGuess
			)
		);
		setRounds(currentRounds => currentRounds + 1);
	}

	return (
		<View style={styles.screen}>
			<Text>Opponent's Guess:</Text>
			<NumberContainer>{currentGuess}</NumberContainer>
			<Card style={styles.buttonContainer}>
				<View>
					<Button
						title="LOWER"
						onPress={nextGuessHandler.bind(null, "lower")}
					/>
				</View>
				<View>
					<Button
						title="HIGHER"
						onPress={nextGuessHandler.bind(null, "higher")}
					/>
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

	buttonContainer: {
		width: 300,
		flexDirection: "row",
		justifyContent: "space-around",
		marginTop: 20,
		maxWidth: "80%",
	},
});
