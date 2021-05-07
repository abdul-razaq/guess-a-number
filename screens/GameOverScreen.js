import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function GameOverScreen(props) {
	return (
		<View style={styles.screen}>
			<Text>Game Over Screen!</Text>
			<Text>Number of rounds: {props.totalRounds}</Text>
			<Text>User's selected number was: {props.selectedNumber}</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
});
