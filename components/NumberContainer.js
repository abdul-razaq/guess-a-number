import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function NumberContainer({ number }) {
	return (
		<View style={styles.numberContainer}>
			<Text style={styles.number}>{number}</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	numberContainer: {
		borderWidth: 2,
		borderColor: "#000",
		padding: 5,
		borderRadius: 5,
	},

	number: {
		fontSize: 20,
		fontWeight: "bold",
	},
});
