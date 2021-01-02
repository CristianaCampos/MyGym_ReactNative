import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { Card } from "react-native-paper";

import { storage } from "../../constant/storage";

export default (props) => {
  const saveExercise = async () => {
    try {
      const value = JSON.stringify(props.exercicio);
      await AsyncStorage.setItem(storage.exercicio, value);
    } catch (error) {
      alert(error);
    }
  };

  function sendTempExercicio() {
    saveExercise();
    props.navigation.navigate("ExercicioDetails", {
      exercicio: props.exercicio,
    });
  }
  return (
    <View>
      <Card onPress={() => sendTempExercicio()} style={styles.rectangleView}>
        <View
          style={{
            padding: 10,
          }}
        >
          <Text style={styles.nomeText}>{props.nome}</Text>
          <Text style={styles.zonaMuscularText}>{props.zonaMuscular}</Text>
        </View>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  rectangleView: {
    flexDirection: "column",
    shadowColor: "#B72727",
    shadowOpacity: 0.5,
    backgroundColor: "#B72727",
    borderWidth: 1,
    marginTop: "5%",
    borderColor: "#B72727",
    borderRadius: 7,
  },
  nomeText: {
    color: "white",
    fontSize: 18,
    fontFamily: "Poppins_Regular",
  },
  zonaMuscularText: {
    color: "rgba(255,255,255,0.8)",
    fontSize: 15,
    fontFamily: "Poppins_Regular",
  },
});
