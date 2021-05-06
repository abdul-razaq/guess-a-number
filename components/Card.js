import React from "react";
import { View, StyleSheet } from "react-native";

export default function Card(props) {
	return (
		<View style={{ ...styles.card, ...props.style }}>{props.children}</View>
	);
}

const styles = StyleSheet.create({
	card: {
		backgroundColor: "#fff",
		shadowColor: "#000",
		shadowOpacity: 0.26,
		shadowOffset: { width: 0, height: 2 },
		shadowRadius: 6,
		elevation: 10,
		padding: 20,
		borderRadius: 10,
	},
});
