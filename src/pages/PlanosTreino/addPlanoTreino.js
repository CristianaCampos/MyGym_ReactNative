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
import { Picker } from "@react-native-picker/picker";

import { database } from "../../constant/database";

export default function AddPlanoTreino({ navigation }) {
  const uri =
    "http://" +
    database.ip +
    ":" +
    database.port +
    "/php/getExerciciosPlanos.php";

  const [userId, setUserId] = useState("");
  const [exercicios, setExercicios] = useState([]);

  const [dia, setDia] = useState("seg");
  const [exercicio, setExercicio] = useState("");

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
          setExercicios(json.exercises);
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
  }, []);

  useEffect(() => {
    loadExercicios();
    // https://stackoverflow.com/questions/34252982/looping-json-display-in-react-native
  }, []);

  let myExercicios = exercicios.map((myValue, myIndex) => {
    return <Picker.Item label={myValue.nome} value={myIndex} key={myIndex} />;
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
        <Picker
          mode="dropdown"
          selectedValue={exercicio}
          onValueChange={(value) => setExercicio(value)}
        >
          {myExercicios}
        </Picker>
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
