import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function AppTitles({ username }) {
  return <Text style={styles.title}>{username}</Text>;
}

const styles = StyleSheet.create({
  title: {
    fontFamily: "Poppins_Regular",
    fontSize: 20,
    color: "white",
  },
});
