import React from "react";
import {
	View,
	Text,
	Button,
	Image,
	StyleSheet,
	Dimensions,
	ScrollView,
} from "react-native";

import TitleText from "../components/TitleText";
import BodyText from "../components/BodyText";
import PrimaryButton from "../components/PrimaryButton";

import Colors from "../constants/colors";

export default function GameOverScreen(props) {
	return (
		<ScrollView>
			<View style={styles.screen}>
				<TitleText>Game Over Screen!</TitleText>
				<View style={styles.imageContainer}>
					<Image
						fadeDuration={300}
						// source={require("../assets/images/success.png")}
						source={{
							uri:
								"https://media-exp1.licdn.com/dms/image/C4D1BAQGFuhWxaxuV-Q/company-background_10000/0/1519801039465?e=2159024400&v=beta&t=LeT0yQSO4tBiOtxOlv8Lcgbu1fNqkPBnkvylmOeZJXY",
						}}
						style={styles.image}
						resizeMode="cover"
					/>
				</View>
				<View style={styles.resultContainer}>
					<BodyText style={styles.resultText}>
						Your Phone needed{" "}
						<Text style={styles.highlight}>{props.totalRounds}</Text> rounds to
						guess the number{" "}
						<Text style={styles.highlight}>{props.selectedNumber}</Text>
					</BodyText>
				</View>
				<PrimaryButton onPress={props.onNewGame} color={Colors.primary}>
					NEW GAME
				</PrimaryButton>
			</View>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},

	imageContainer: {
		width: Dimensions.get("window").width * 0.7,
		height: Dimensions.get("window").width * 0.7,
		borderRadius: (Dimensions.get("window").width * 0.7) / 2,
		borderWidth: 3,
		borderColor: Colors.primary,
		overflow: "hidden",
		marginVertical: Dimensions.get("window").height / 30,
	},

	image: {
		width: "100%",
		height: "100%",
	},

	resultContainer: {
		marginHorizontal: 30,
		marginVertical: Dimensions.get("window").height / 40,
	},

	resultText: {
		textAlign: "center",
		fontSize: Dimensions.get("window").height < 400 ? 16 : 20,
	},

	highlight: {
		color: Colors.primary,
		fontFamily: "open-sans-bold",
	},
});
