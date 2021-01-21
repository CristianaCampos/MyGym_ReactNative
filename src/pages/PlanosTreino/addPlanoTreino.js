import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  Text,
  TextInput,
  View,
  BackHandler,
  ScrollView,
  Alert,
} from "react-native";
import { Button } from "react-native-paper";
import DropDownPicker from "react-native-dropdown-picker";
import { Picker } from "@react-native-picker/picker";

import { database } from "../../constant/database";
import { styles } from "../../constant/styles";

export default function AddPlanoTreino({ route, navigation }) {
  const uri =
    "http://" +
    database.ip +
    ":" +
    database.port +
    "/php/getExerciciosPlanos.php";

  const uriAdd =
    "http://" +
    database.ip +
    ":" +
    database.port +
    "/php/insertPlanoTreino.php";

  const [exercicios, setExercicios] = useState([]);

  const { id } = route.params;

  const [nome, setNome] = useState("");
  const [diaSemana, setDiaSemana] = useState("---");
  const [exercicio1, setExercicio1] = useState("---");
  const [exercicio2, setExercicio2] = useState("---");

  function loadExercicios() {
    fetch(uri, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: id,
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.message == "success") {
          setExercicios(json.exercises);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", () => true);
    return () =>
      BackHandler.removeEventListener("hardwareBackPress", () => true);
  }, []);

  function getData() {
    loadExercicios();
  }

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", (e) => {
      getData();
    });

    return unsubscribe;
  }, []);

  function add() {
    if (nome != "" && diaSemana != "---") {
      fetch(uriAdd, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: id,
          nome: nome,
          diaSemana: diaSemana,
          exercicio1: exercicio1,
          exercicio2: exercicio2,
        }),
      })
        .then((response) => response.json())
        .then((json) => {
          if (json.message == "success") {
            Alert.alert(
              "Sucesso",
              "Plano registado com sucesso!",
              [{ text: "OK", style: "default" }],
              { cancelable: true }
            );
            navigation.navigate("PlanosTreinoList");
          } else {
            console.log("Erro");
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

  let myExercicios = exercicios.map((myValue, myIndex) => {
    return (
      <Picker.Item label={myValue.nome} value={myValue.nome} key={myIndex} />
    );
  });

  return (
    <View style={{ backgroundColor: "white", height: "100%" }}>
      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <ScrollView>
          <StatusBar style="auto" />
          <Text style={styles.pageTitle}>Criar Plano Treino</Text>
          <Text style={styles.textInput}>Nome Plano Treino</Text>
          <TextInput
            placeholder="Nome Plano"
            style={styles.input}
            onChangeText={(text) => setNome(text)}
          ></TextInput>
          <Text style={styles.textInput}>Dia da Semana</Text>
          <Picker
            itemStyle={{
              color: "black",
              fontFamily: "Poppins_Regular",
              fontSize: 15,
              height: 100,
              borderRadius: 7,
              marginTop: 0,
            }}
            mode="dropdown"
            selectedValue={diaSemana}
            onValueChange={(value, index) => setDiaSemana(value)}
          >
            <Picker.Item label="---" value="---" />
            <Picker.Item label="Segunda-Feira" value="Segunda-Feira" />
            <Picker.Item label="Terça-Feira" value="Terça-Feira" />
            <Picker.Item label="Quarta-Feira" value="Quarta-Feira" />
            <Picker.Item label="Quinta-Feira" value="Quinta-Feira" />
            <Picker.Item label="Sexta-Feira" value="Sexta-Feira" />
            <Picker.Item label="Sábado" value="Sábado" />
            <Picker.Item label="Domingo" value="Domingo" />
          </Picker>
          <Text style={styles.textExercicios}>Exercícios</Text>
          <Picker
            itemStyle={{
              color: "black",
              fontFamily: "Poppins_Regular",
              fontSize: 15,
              height: 100,
              borderRadius: 7,
              marginTop: 0,
            }}
            mode="dropdown"
            selectedValue={exercicio1}
            onValueChange={(value, index) => setExercicio1(value)}
          >
            {myExercicios}
          </Picker>
          <Picker
            itemStyle={{
              color: "black",
              fontFamily: "Poppins_Regular",
              fontSize: 15,
              height: 100,
              borderRadius: 7,
              marginTop: 0,
            }}
            mode="dropdown"
            selectedValue={exercicio2}
            onValueChange={(value, index) => setExercicio2(value)}
          >
            {myExercicios}
          </Picker>
          <Button mode="contained" style={styles.mainBtn} onPress={() => add()}>
            <Text style={styles.mainBtnText}>Criar Plano Treino</Text>
          </Button>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}
