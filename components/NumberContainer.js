import React from "react";
import { View, Text, StyleSheet } from "react-native";

import Colors from '../constants/colors';

export default function NumberContainer(props) {
	return (
		<View style={styles.numberContainer}>
			<Text style={styles.number}>{props.children}</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	numberContainer: {
		borderWidth: 2,
		borderColor: Colors.accent,
		padding: 10,
		borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
	},

	number: {
    color: Colors.accent,
		fontSize: 22,
		fontWeight: "bold",
	},
});
