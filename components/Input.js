import React from "react";
import { TextInput, StyleSheet } from "react-native";

export default function Input({ style }) {
	return <TextInput style={{ ...styles.input, ...style }} />;
}

const styles = StyleSheet.create({
	input: {
		height: 30,
		borderBottomColor: "grey",
		borderBottomWidth: 1,
    marginVertical: 10,
	},
});
