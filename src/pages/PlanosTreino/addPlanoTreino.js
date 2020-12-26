import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  View,
  BackHandler,
  FlatList,
} from "react-native";
import { Button } from "react-native-paper";
import DropDownPicker from "react-native-dropdown-picker";

import { database } from "../../constant/database";

export default function AddPlanoTreino({ navigation }) {
  const uri =
    "http://" +
    database.ip +
    ":" +
    database.port +
    "/php/getExerciciosPlanos.php";

  const [userId, setUserId] = useState("");
  const [exercicio, setExercicio] = useState([]);
  const [items, setItems] = useState([]);

  const [dia, setDia] = useState("seg");
  // const [ex2, setEx2] = useState([]);
  // const [ex3, setEx3] = useState([]);
  // const [ex4, setEx4] = useState([]);
  // const [ex5, setEx5] = useState([]);

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

  function loadExercicios() {
    fetch(uri, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: JSON.stringify(userId),
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.message == "success") {
          setExercicio(json.exercises);
        }
      })
      .catch((error) => {
        alert(error);
      });
  }

  const load = () => {};

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", () => true);
    return () =>
      BackHandler.removeEventListener("hardwareBackPress", () => true);
  }, []);

  useEffect(() => {
    getAsyncUser();
  });

  useEffect(() => {
    loadExercicios();
    // https://stackoverflow.com/questions/34252982/looping-json-display-in-react-native
    exercicio.map(
      // console.log(i);
      items.push({
        label: exercicio[i].nome,
        value: exercicio[i].nome,
      })
    );
  });

  return (
    <View style={{ backgroundColor: "white", height: "100%" }}>
      {/* <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
        style={styles.container}
      > */}
      <View style={styles.container}>
        <StatusBar style="auto" />
        <Text style={styles.pageTitle}>Criar Plano Treino</Text>
        <TextInput
          placeholder="Nome Plano"
          style={styles.input}
          onChangeText={(text) => setNome(text)}
        ></TextInput>
        <DropDownPicker
          items={[
            {
              label: "Segunda-Feira",
              value: "seg",
            },
            {
              label: "Terça-Feira",
              value: "ter",
            },
            {
              label: "Quarta-Feira",
              value: "qua",
            },
            {
              label: "Quinta-Feira",
              value: "qui",
            },
            {
              label: "Sexta-Feira",
              value: "sex",
            },
            {
              label: "Sábado",
              value: "sab",
            },
            {
              label: "Domingo",
              value: "dom",
            },
          ]}
          defaultValue={dia}
          containerStyle={{ height: 50, marginTop: "5%" }}
          style={{
            backgroundColor: "#fff",
            borderColor: "#B72727",
            fontFamily: "Poppins_Regular",
          }}
          itemStyle={{
            justifyContent: "flex-start",
            fontFamily: "Poppins_Regular",
          }}
          dropDownStyle={{
            backgroundColor: "#fff",
          }}
          onChangeItem={(item) => setDia(item.value)}
        />
        <Text style={styles.textExercicios}>Exercícios</Text>
        <DropDownPicker
          items={items}
          // controller={(instance) => (controller = instance)}
          // onChangeList={(items, callback) => {
          //   new Promise((resolve, reject) => resolve(setItems(items)))
          //     .then(() => callback())
          //     .catch(() => {});
          // }}
          containerStyle={{ height: 50, marginTop: "5%" }}
          style={{
            backgroundColor: "#fff",
            borderColor: "#B72727",
            fontFamily: "Poppins_Regular",
          }}
          itemStyle={{
            justifyContent: "flex-start",
            fontFamily: "Poppins_Regular",
          }}
          dropDownStyle={{
            backgroundColor: "#fff",
          }}
        />
        <Button mode="contained" style={styles.btnLogin}>
          {/*onPress={() => add()}*/}
          <Text style={styles.btnTextLogin}>Criar Plano Treino</Text>
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    marginHorizontal: "5%",
  },
  textExercicios: {
    fontSize: 20,
    fontFamily: "Poppins_Bold",
    marginTop: "5%",
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
