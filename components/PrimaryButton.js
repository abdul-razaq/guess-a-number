import React from "react";
import {
	View,
	Text,
	TouchableOpacity,
	StyleSheet,
	Platform,
	TouchableNativeFeedback,
} from "react-native";

export default function PrimaryButton(props) {
	let ButtonWrapper = TouchableOpacity;

	if (Platform.OS === "android" && Platform.API >= 21)
		ButtonWrapper = TouchableNativeFeedback;
	return (
		<View style={styles.buttonWrapper}>
			<ButtonWrapper activeOpacity={0.6} onPress={props.onPress}>
				<View style={{ ...styles.button, backgroundColor: props.color }}>
					<Text style={styles.buttonText}>{props.children}</Text>
				</View>
			</ButtonWrapper>
		</View>
	);
}

const styles = StyleSheet.create({
	// This is a hack here to make sure that the ripple effect on Android buttons is not rectangular and it respects the border radius that we set on the buttons...
	buttonWrapper: {
		borderRadius: 25,
		overflow: "hidden",
	},

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
