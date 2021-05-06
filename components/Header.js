import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Header({ title }) {

  return (
    <View style={styles.header}>
      <Text style={styles.headerText}>{ title }</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    width: "100%",
    height: 90,
    paddingTop: 36,
    backgroundColor: "#f7287b",
    alignItems: "center",
  },

  headerText: {
    color: "#000",
    fontSize: 18,
    textTransform: "uppercase",
  }
});
