import React, { useState } from "react";
import { StyleSheet, View } from "react-native";

import Header from "./components/Header";
import StartGameScreen from "./screens/StartGameScreen";
import GameRunningScreen from "./screens/GameRunningScreen";
import GameOverScreen from "./screens/GameOverScreen";

export default function App() {
	const [userNumber, setUserNumber] = useState();
	const [guessRounds, setGuessRounds] = useState(0);

	function startGameHandler(enteredNumber) {
		setUserNumber(enteredNumber);
    setGuessRounds(0);
	}

	function gameOverHandler(numOfRounds) {
		setGuessRounds(numOfRounds);
	}

	let screenContent = <StartGameScreen onGameStart={startGameHandler} />;
	if (userNumber && guessRounds <= 0) {
		screenContent = (
			<GameRunningScreen userChoice={userNumber} onGameOver={gameOverHandler} />
		);
	} else if (guessRounds > 0) {
		screenContent = <GameOverScreen selectedNumber={userNumber} totalRounds={guessRounds} />;
	}

	return (
		<View style={styles.screen}>
			<Header title="Guess A Number" />
			{screenContent}
		</View>
	);
}

const styles = StyleSheet.create({
	screen: {
		flex: 1,
	},
});
