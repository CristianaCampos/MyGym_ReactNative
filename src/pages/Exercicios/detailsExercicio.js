import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  TextInput,
  Alert,
  View,
  Text,
  KeyboardAvoidingView,
  Image,
  BackHandler,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Button } from "react-native-paper";
import { FAB } from "react-native-paper";

import { database } from "../../constant/database";
import { storage } from "../../constant/storage";
import { styles } from "../../constant/styles";

export default function DetailsExercicio({ route, navigation }) {
  const uriEdit =
    "http://" + database.ip + ":" + database.port + "/php/editExercicio.php";

  const { exercicio } = route.params;

  const [user, setUser] = useState("");
  const [nome, setNome] = useState("");
  const [zonaMuscular, setZonaMuscular] = useState("");

  const [editable, setEditable] = useState(false);
  const [inputStyle, setInputStyle] = useState(styles.inputGrey);

  function seeButtonAtualizar() {
    if (editable) {
      return (
        <Button mode="contained" style={styles.mainBtn} onPress={() => edit()}>
          <Text style={styles.mainBtnText}>Atualizar Dados</Text>
        </Button>
      );
    } else {
      return null;
    }
  }

  function seeButtonFab() {
    if (!editable) {
      return (
        <FAB
          style={styles.fab}
          icon="square-edit-outline"
          onPress={() => ativarVisible()}
        />
      );
    } else {
      return null;
    }
  }

  function ativarVisible() {
    setEditable(true);
    setInputStyle(styles.input);
  }

  function desativarVisible() {
    setEditable(false);
    setInputStyle(styles.inputGrey);
  }

  useEffect(() => {
    desativarVisible();
  }, []);

  async function getUser() {
    try {
      let value = await AsyncStorage.getItem(storage.user);
      value = JSON.parse(value);

      if (value != null) {
        setUser(value);
      }
    } catch (error) {
      console.log(error);
    }
  }

  function getNome() {
    setNome(exercicio.nome);
  }

  function getZonaMuscular() {
    setZonaMuscular(exercicio.zonaMuscular);
  }

  function getData() {
    getNome();
    getZonaMuscular();
    getUser();
  }

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", () => true);
    return () =>
      BackHandler.removeEventListener("hardwareBackPress", () => true);
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", (e) => {
      getData();
    });

    return unsubscribe;
  }, [navigation]);

  function edit() {
    if (nome != "" && zonaMuscular != "") {
      fetch(uriEdit, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: exercicio.id,
          nome: nome,
          zonaMuscular: zonaMuscular,
          idUtilizador: user.id,
        }),
      })
        .then((response) => response.json())
        .then((json) => {
          if (json.message === "success") {
            desativarVisible();
            updateStorage();
            Alert.alert(
              "Sucesso",
              "Exercício atualizado com sucesso!",
              [{ text: "OK", style: "default" }],
              { cancelable: true }
            );
            navigation.goBack();
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

  async function updateStorage() {
    try {
      exercicio.nome = nome;
      exercicio.zonaMuscular = zonaMuscular;

      let newExercicio = exercicio;

      newExercicio = JSON.stringify(newExercicio);

      await AsyncStorage.setItem(storage.exercicio, newExercicio);
      let value = await AsyncStorage.getItem(storage.exercicio);
      value = JSON.parse(value);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View style={{ backgroundColor: "white", height: "100%" }}>
      <KeyboardAvoidingView>
        <StatusBar style="auto" />
        <ScrollView>
          <View style={styles.container}>
            <Text style={styles.pageTitle}>Detalhes Exercício</Text>
            <Image
              style={{ width: "100%", height: 200 }}
              source={require("../../../assets/exercicio.jpg")}
            ></Image>

            <Text style={styles.textInput}>Nome Exercício</Text>
            <TextInput
              placeholder="Nome Exercício"
              editable={editable}
              style={inputStyle}
              value={nome}
              onChangeText={(txt) => setNome(txt)}
            ></TextInput>
            <Text style={styles.textInput}>Zona Muscular</Text>
            <TextInput
              placeholder="Zona Muscular"
              editable={editable}
              style={inputStyle}
              value={zonaMuscular}
              onChangeText={(txt) => setZonaMuscular(txt)}
            ></TextInput>
            {seeButtonAtualizar()}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      {seeButtonFab()}
    </View>
  );
}
