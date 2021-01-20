import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  TextInput,
  Alert,
  View,
  Text,
  KeyboardAvoidingView,
  ScrollView,
  BackHandler,
} from "react-native";
import { Button } from "react-native-paper";

import { database } from "../../constant/database";
import { styles } from "../../constant/styles";

export default function AddExercicio({ navigation }) {
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
      console.log(error);
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
            Alert.alert(
              "Sucesso",
              "Exercício registado com sucesso!",
              [{ text: "OK", style: "default" }],
              { cancelable: true }
            );
            navigation.navigate("ExerciciosList");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      Alert.alert(
        "Erro",
        "Preencha todos os campos!",
        [{ text: "OK", style: "destructive" }],
        { cancelable: true }
      );
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
          <Text style={styles.textInput}>Nome Exercício</Text>
          <TextInput
            placeholder="Nome Exercício"
            style={styles.input}
            onChangeText={(text) => setNome(text)}
          ></TextInput>
          <Text style={styles.textInput}>Zona Muscular</Text>
          <TextInput
            placeholder="Zona Muscular"
            style={styles.input}
            onChangeText={(txt) => setZonaMuscular(txt)}
          ></TextInput>
          <Button mode="contained" onPress={() => add()} style={styles.mainBtn}>
            <Text style={styles.mainBtnText}>Criar Exercício</Text>
          </Button>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}
