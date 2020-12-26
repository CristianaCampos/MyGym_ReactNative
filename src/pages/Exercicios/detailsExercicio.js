import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  TextInput,
  StyleSheet,
  View,
  Text,
  KeyboardAvoidingView,
  FlatList,
  BackHandler,
} from "react-native";
import { Button } from "react-native-paper";

import { database } from "../../constant/database";

export default function DetailsExercicio({ route }) {
  const uri =
    "http://" +
    database.ip +
    ":" +
    database.port +
    "/php/getDetailsExercicio.php";

  const { id } = route.params;

  const [userId, setUserId] = useState("");
  const [exerciseId, setExerciseId] = useState("");
  const [exercise, setExercise] = useState("");

  async function getAsyncUser() {
    try {
      let id = await AsyncStorage.getItem("user_id");
      id = JSON.parse(id);

      if (id != null) {
        setUserId(id);
      }
    } catch (error) {
      alert(error);
    }
  }

  function loadExercise() {
    fetch(uri, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: JSON.stringify(userId),
        exerciseId: JSON.stringify(id),
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.message == "success") {
          setExercise(json.exercise);
        }
      })
      .catch((error) => {
        alert(error);
      });
  }

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", () => true);
    return () =>
      BackHandler.removeEventListener("hardwareBackPress", () => true);
  }, []);

  useEffect(() => {
    getAsyncUser();
  });

  useEffect(() => {
    loadExercise();
  });
  return (
    <View style={{ backgroundColor: "white", height: "100%" }}>
      <View style={styles.container}>
        <Text style={styles.pageTitle}>Detalhes Exercício</Text>
        <StatusBar style="auto" />
        <FlatList
          data={exercise}
          keyExtractor={({ id }, index) => id}
          renderItem={({ item }) => (
            <View>
              <TextInput
                placeholder="Zona Muscular"
                style={styles.input}
                value={item.nome}
              ></TextInput>
              <TextInput
                placeholder="Nome Exercício"
                style={styles.input}
                value={item.zonaMuscular}
              ></TextInput>
            </View>
          )}
        />
      </View>
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
  input: {
    height: 40,
    marginTop: "5%",
    flexDirection: "row",
    alignSelf: "center",
    width: "100%",
    borderWidth: 2,
    paddingTop: 2,
    paddingHorizontal: 10,
    borderColor: "#B72727",
    borderRadius: 7,
    fontSize: 15,
    fontFamily: "Poppins_Regular",
  },
  btnLogin: {
    backgroundColor: "#B72727",
    marginTop: "8%",
    height: 50,
    justifyContent: "center",
  },
  btnTextLogin: {
    fontSize: 20,
    fontFamily: "Poppins_Regular",
  },
});
