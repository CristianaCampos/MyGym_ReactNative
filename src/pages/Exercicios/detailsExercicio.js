import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  TextInput,
  StyleSheet,
  View,
  Text,
  KeyboardAvoidingView,
  Image,
  BackHandler,
} from "react-native";
import { Button } from "react-native-paper";
import { FAB } from "react-native-paper";

import { database } from "../../constant/database";

export default function DetailsExercicio({ route }) {
  const uri =
    "http://" +
    database.ip +
    ":" +
    database.port +
    "/php/getDetailsExercicio.php";

  const uriEdit =
    "http://" + database.ip + ":" + database.port + "/php/editExercicio.php";

  const { id } = route.params;

  const [userId, setUserId] = useState("");
  const [nome, setNome] = useState("");
  const [zonaMuscular, setZonaMuscular] = useState("");

  const [visible, setVisible] = useState(false);
  const [buttonEdit, setButtonEdit] = useState(false);
  const [buttonFab, setButtonFab] = useState(true);

  function ativarVisible() {
    setVisible(!visible);
    setButtonFab(!buttonFab);
    setButtonEdit(!buttonEdit);
  }

  function desativarVisible() {
    setVisible(!visible);
    setButtonFab(!buttonFab);
    setButtonEdit(!buttonEdit);
  }

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
        userId: userId,
        exerciseId: id,
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.message == "success") {
          setNome(json.exercise[0].nome);
          setZonaMuscular(json.exercise[0].zonaMuscular);
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
    loadExercise();
  }, []);

  function edit() {
    fetch(uriEdit, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nome: nome,
        zonaMuscular: zonaMuscular,
        userId: JSON.stringify(userId),
        exerciseId: id,
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.message == "success") {
          alert("Exercício atualizado com sucesso!");
          desativarVisible();
          loadExercise();
        }
      })
      .catch((error) => {
        alert(error);
      });
  }

  return (
    <View style={{ backgroundColor: "white", height: "100%" }}>
      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <StatusBar style="auto" />
        <Text style={styles.pageTitle}>Detalhes Exercício</Text>
        <Image
          style={styles.img}
          source={require("../../../assets/exercicio.jpg")}
        ></Image>
        {visible ? (
          <View>
            <TextInput
              placeholder="Nome Exercício"
              editable={visible}
              style={styles.input}
              defaultValue={nome}
              onChangeText={(txt) => setNome(txt)}
            ></TextInput>
            <TextInput
              placeholder="Zona Muscular"
              editable={visible}
              style={styles.input}
              defaultValue={zonaMuscular}
              onChangeText={(txt) => setZonaMuscular(txt)}
            ></TextInput>
          </View>
        ) : (
          <View>
            <TextInput
              placeholder="Nome Exercício"
              editable={visible}
              style={styles.inputGrey}
              defaultValue={nome}
              onChangeText={(txt) => setNome(txt)}
            ></TextInput>
            <TextInput
              placeholder="Zona Muscular"
              editable={visible}
              style={styles.inputGrey}
              defaultValue={zonaMuscular}
              onChangeText={(txt) => setZonaMuscular(txt)}
            ></TextInput>
          </View>
        )}
        {buttonEdit ? (
          <Button
            mode="contained"
            style={styles.btnLogin}
            onPress={() => edit()}
          >
            <Text style={styles.btnTextLogin}>Atualizar Dados</Text>
          </Button>
        ) : null}
        {buttonFab ? (
          <FAB
            style={styles.fab}
            icon="square-edit-outline"
            onPress={() => ativarVisible()}
          />
        ) : null}
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  img: {
    height: "40%",
    alignSelf: "center",
    marginTop: "5%",
    resizeMode: "contain",
  },
  fab: {
    backgroundColor: "#B72727",
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 20,
  },
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
  inputGrey: {
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
    color: "grey",
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
