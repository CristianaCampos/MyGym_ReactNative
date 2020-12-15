import { StatusBar } from "expo-status-bar";
import React from "react";
import { Image, StyleSheet, View, Text } from "react-native";
import { Button } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";

export default function planosTreinoList({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.pageTitle}>Planos de Treino</Text>
      <View style={styles.rectangleView}>
        <Text style={styles.nomeText}>Plano 1</Text>
        <Text style={styles.diaSemanaText}>Dia Semana</Text>
      </View>
      <View style={styles.rectangleView}>
        <Text style={styles.nomeText}>Plano 2</Text>
        <Text style={styles.diaSemanaText}>Dia Semana</Text>
      </View>
      <Button
        style={styles.floatingButton}
        onPress={() => navigation.navigate("AddPlanoTreino")}
      >
        <Ionicons name="ios-add" size={40} color="white"></Ionicons>
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    marginHorizontal: "5%",
  },
  pageTitle: {
    fontSize: 25,
    fontFamily: "Poppins_Bold",
    marginTop: "3%",
    marginLeft: "5%",
    textAlign: "center",
  },
  rectangleView: {
    flexDirection: "column",
    shadowColor: "#B72727",
    shadowOpacity: 0.5,
    backgroundColor: "#B72727",
    height: "12%",
    borderWidth: 2,
    marginTop: "5%",
    paddingHorizontal: 10,
    borderColor: "#B72727",
    borderRadius: 7,
    justifyContent: "center",
  },
  floatingButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#B72727",
    position: "absolute",
    bottom: 10,
    right: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  nomeText: {
    color: "white",
    fontSize: 18,
    fontFamily: "Poppins_Regular",
  },
  diaSemanaText: {
    color: "rgba(255,255,255,0.8)",
    fontSize: 15,
    fontFamily: "Poppins_Regular",
  },
});
