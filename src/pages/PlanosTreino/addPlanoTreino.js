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
import { ScrollView } from "react-native-gesture-handler";

export default function AddPlanoTreino({ navigation }) {
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

  const [userId, setUserId] = useState("");
  const [exercicios, setExercicios] = useState([]);

  const [nome, setNome] = useState("");
  const [diaSemana, setDiaSemana] = useState("---");
  const [exercicio1, setExercicio1] = useState("");
  const [exercicio2, setExercicio2] = useState("");

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
          userId: userId,
          nome: nome,
          diaSemana: diaSemana,
          exercicio1: exercicio1,
          exercicio2: exercicio2,
        }),
      })
        .then((response) => response.json())
        .then((json) => {
          if (json.message == "success") {
            alert("Plano registado com sucesso!");
            navigation.navigate("PlanosTreinoList");
          } else {
            alert("Erro");
          }
        })
        .catch((error) => {
          alert(error);
        });
    } else {
      alert("Preencha todos os campos!");
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
          <TextInput
            placeholder="Nome Plano"
            style={styles.input}
            onChangeText={(text) => setNome(text)}
          ></TextInput>
          <DropDownPicker
            items={[
              {
                label: "---",
                value: "---",
              },
              {
                label: "Segunda-Feira",
                value: "Segunda-Feira",
              },
              {
                label: "Terça-Feira",
                value: "Terça-Feira",
              },
              {
                label: "Quarta-Feira",
                value: "Quarta-Feira",
              },
              {
                label: "Quinta-Feira",
                value: "Quinta-Feira",
              },
              {
                label: "Sexta-Feira",
                value: "Sexta-Feira",
              },
              {
                label: "Sábado",
                value: "Sábado",
              },
              {
                label: "Domingo",
                value: "Domingo",
              },
            ]}
            defaultValue={diaSemana}
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
            onChangeItem={(item) => setDiaSemana(item.value)}
          />
          <Text style={styles.textExercicios}>Exercícios</Text>
          <Picker
            mode="dropdown"
            selectedValue={exercicio1}
            onValueChange={(value, index) => setExercicio1(value)}
          >
            {myExercicios}
          </Picker>
          <Picker
            mode="dropdown"
            selectedValue={exercicio2}
            onValueChange={(value, index) => setExercicio2(value)}
          >
            {myExercicios}
          </Picker>
          <Button
            mode="contained"
            style={styles.btnLogin}
            onPress={() => add()}
          >
            <Text style={styles.btnTextLogin}>Criar Plano Treino</Text>
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
