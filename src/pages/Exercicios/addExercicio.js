import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  TextInput,
  StyleSheet,
  View,
  Text,
  KeyboardAvoidingView,
  ScrollView,
  BackHandler,
} from "react-native";
import { Button } from "react-native-paper";

import { database } from "../../constant/database";

function AddExercicio({ navigation }) {
  const uri =
    "http://" + database.ip + ":" + database.port + "/php/insertExercicio.php";

  const [userId, setUserId] = useState("");
  const [nome, setNome] = useState("");
  const [zonaMuscular, setZonaMuscular] = useState("");

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

  function add() {
    if (nome != "" && zonaMuscular != "") {
      fetch(uri, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userId,
          nome: nome,
          zonaMuscular: zonaMuscular,
        }),
      })
        .then((response) => response.json())
        .then((json) => {
          if (json.message == "success") {
            alert("Exercício registado com sucesso!");
            navigation.navigate("ExerciciosList");
          }
        })
        .catch((error) => {
          alert(error);
        });
    } else {
      alert("Preencha todos os campos!");
    }
  }

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", () => true);
    return () =>
      BackHandler.removeEventListener("hardwareBackPress", () => true);
  }, []);

  useEffect(() => {
    getAsyncUser();
  }, []);

  return (
    <View style={{ backgroundColor: "white", height: "100%" }}>
      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <ScrollView>
          <StatusBar style="auto" />
          <Text style={styles.pageTitle}>Criar Exercício</Text>
          <TextInput
            placeholder="Nome Exercício"
            style={styles.input}
            onChangeText={(text) => setNome(text)}
          ></TextInput>
          <TextInput
            placeholder="Zona Muscular"
            style={styles.input}
            onChangeText={(txt) => setZonaMuscular(txt)}
          ></TextInput>
          <Button
            mode="contained"
            onPress={() => add()}
            style={styles.btnLogin}
          >
            <Text style={styles.btnTextLogin}>Criar Exercício</Text>
          </Button>
        </ScrollView>
      </KeyboardAvoidingView>
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
    height: 50,
    marginTop: "5%",
    flexDirection: "row",
    alignSelf: "center",
    width: "100%",
    borderWidth: 1,
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
export default AddExercicio;
