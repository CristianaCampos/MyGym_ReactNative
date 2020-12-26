import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Image,
  TextInput,
  ScrollView,
} from "react-native";
import { Button } from "react-native-paper";

import { database } from "../../../constant/database";

export default function Login({ navigation }) {
  const uri = "http://" + database.ip + ":" + database.port + "/php/login.php";

  const [nomeUtilizador, setNomeUtilizador] = useState("");
  const [pass, setPass] = useState("");

  const saveUserId = async (userId) => {
    try {
      const value = JSON.stringify(userId);
      await AsyncStorage.setItem("user_id", value);
    } catch (error) {
      alert(error);
    }
  };

  function login() {
    if (nomeUtilizador != "" && pass != "") {
      fetch(uri, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nomeUtilizador: nomeUtilizador,
          pass: pass,
        }),
      })
        .then((response) => response.json())
        .then((json) => {
          saveUserId(json.user_id);
          navigation.navigate("Main");
        })
        .catch((error) => {
          alert(error);
        });
    } else {
      alert("Preencha todos os campos!");
    }
  }

  // const login = async () => {
  //   try {
  //     const resp = await fetch(uri, {
  //       method: "POST",
  //       headers: {
  //         Accept: "application/json",
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ nomeUtilizador, pass }),
  //     });
  //     const json = await resp.json();
  //     switch (json) {
  //       case "login_success":
  //         props.navigation.navigate("Main");
  //         break;
  //       case "password_error":
  //         alert("Password error");
  //         break;
  //       case "server_error":
  //         alert("Server error");
  //         break;
  //     }
  //   } catch (e) {
  //     alert("erro on login...", e.message);
  //   }
  // };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView>
        <StatusBar style="auto" />
        <Image
          style={styles.img}
          source={require("../../../../assets/logo.png")}
        ></Image>
        <TextInput
          placeholder="Nome Utilizador"
          style={styles.input}
          onChangeText={(nomeUtilizador) => setNomeUtilizador(nomeUtilizador)}
        ></TextInput>
        <TextInput
          placeholder="Password"
          style={styles.input}
          onChangeText={(pass) => setPass(pass)}
        ></TextInput>
        <Button
          mode="contained"
          onPress={() => login()}
          style={styles.btnLogin}
        >
          <Text style={styles.btnTextLogin}>Iniciar Sessão</Text>
        </Button>
        <Text
          style={styles.btnTextRegister}
          onPress={() => navigation.navigate("Register")}
        >
          Criar Conta
        </Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    marginHorizontal: "5%",
  },
  img: {
    height: 200,
    alignSelf: "center",
    marginTop: "20%",
    resizeMode: "contain",
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
  btnTextRegister: {
    marginTop: "4%",
    fontSize: 20,
    fontFamily: "Poppins_Regular",
    color: "#B72727",
    alignSelf: "center",
  },
});
