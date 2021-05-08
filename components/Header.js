import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import TitleText from './TitleText';
import Colors from '../constants/colors';

export default function Header({ title }) {

  return (
    <View style={styles.header}>
      <TitleText style={styles.headerText}>{ title }</TitleText>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    width: "100%",
    height: 90,
    paddingTop: 36,
    backgroundColor: Colors.primary,
    alignItems: "center",
  },

  headerText: {
    color: "#000",
    fontSize: 18,
    textTransform: "uppercase",
  }
});
