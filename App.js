import React, { useState } from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";

import * as Font from "expo-font";
import AppLoading from "expo-app-loading";

import Header from "./components/Header";
import StartGameScreen from "./screens/StartGameScreen";
import GameRunningScreen from "./screens/GameRunningScreen";
import GameOverScreen from "./screens/GameOverScreen";

function loadFonts() {
	return Font.loadAsync({
		"open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
		"open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
	});
}

export default function App() {
	const [userNumber, setUserNumber] = useState();
	const [guessRounds, setGuessRounds] = useState(0);
	const [fontsLoaded, setFontsLoaded] = useState(false);

	if (!fontsLoaded) {
		return (
			<AppLoading
				startAsync={loadFonts}
				onFinish={() => setFontsLoaded(true)}
				onError={err => console.log(err)}
			/>
		);
	}

	function configureNewGameHandler() {
		setUserNumber(undefined);
		setGuessRounds(0);
	}

	function startGameHandler(enteredNumber) {
		setUserNumber(enteredNumber);
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
		screenContent = (
			<GameOverScreen
				selectedNumber={userNumber}
				totalRounds={guessRounds}
				onNewGame={configureNewGameHandler}
			/>
		);
	}

	return (
		<SafeAreaView style={styles.screen}>
			<Header title="Guess A Number" />
			{screenContent}
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	screen: {
		flex: 1,
	},
});
