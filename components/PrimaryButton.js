import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function PrimaryButton(props) {
	return (
		<TouchableOpacity activeOpacity={0.6} onPress={props.onPress}>
			<View style={{ ...styles.button, backgroundColor: props.color }}>
				<Text style={styles.buttonText}>{props.children}</Text>
			</View>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	button: {
		paddingVertical: 12,
		paddingHorizontal: 25,
		borderRadius: 25,
	},

	buttonText: {
		fontFamily: "open-sans",
		fontSize: 14,
		color: "#fff",
		textTransform: "uppercase",
	},
});
