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

function Login(props) {
  const uri = "http://192.168.1.75:80/php/login.php";

  const [nomeUtilizador, setNomeUtilizador] = useState("");
  const [pass, setPass] = useState("");

  const login = async () => {
    try {
      const resp = await fetch(uri, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nomeUtilizador, pass }),
      });
      const json = await resp.json();
      switch (json) {
        case "login_success":
          props.navigation.navigate("Main");
          break;
        case "password_error":
          alert("Password error");
          break;
        case "server_error":
          alert("Server error");
          break;
      }
    } catch (e) {
      alert("erro on login...", e.message);
    }
  };

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
          onChangeText={(text) => setNomeUtilizador(text)}
        ></TextInput>
        <TextInput
          placeholder="Password"
          style={styles.input}
          onChangeText={(text) => setPass(text)}
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
          onPress={() => props.navigation.navigate("Register")}
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
    fontSize: 18,
    fontFamily: "Poppins_Regular",
  },
  btnLogin: {
    backgroundColor: "#B72727",
    marginTop: "8%",
    height: "9%",
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

export default Login;
