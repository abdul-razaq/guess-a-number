import React from "react";
import { View, Text, StyleSheet, Platform } from "react-native";

import TitleText from "./TitleText";
import Colors from "../constants/colors";

export default function Header({ title }) {
	return (
		<View
			style={{
				...styles.headerBase,
				...Platform.select({
					ios: styles.headerIOS,
					android: styles.headerAndroid,
				}),
			}}
		>
			<TitleText style={styles.headerText}>{title}</TitleText>
		</View>
	);
}

const styles = StyleSheet.create({
	headerBase: {
		width: "100%",
		height: 90,
		paddingTop: 36,
		alignItems: "center",
	},

	headerIOS: {
		backgroundColor: "#fff",
		borderBottomColor: "#ccc",
		borderBottomWidth: 1,
	},

	headerAndroid: {
		backgroundColor: Colors.primary,
	},

	headerText: {
		color: Platform.OS === "ios" ? Colors.primary : "#fff",
		fontSize: 18,
		textTransform: "uppercase",
	},
});
