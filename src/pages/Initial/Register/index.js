import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  Image,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import { Button } from "react-native-paper";

import { database } from "../../../constant/database";

function Register(props) {
  const uri = "http://" + database.ip + ":" + database.port + "/php/login.php";

  const [nome, setNome] = useState("");
  const [nomeUtilizador, setNomeUtilizador] = useState("");
  const [email, setEmail] = useState("");
  const [contacto, setContacto] = useState("");
  const [pass, setPass] = useState("");

  const register = async () => {
    try {
      const resp = await fetch(uri, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nome, nomeUtilizador, email, contacto, pass }),
      });
      const json = await resp.json();
      switch (json) {
        case "register_success":
          props.navigation.navigate("Main");
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
    <View style={{ backgroundColor: "white", height: "100%" }}>
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
          {/* input nome */}
          <TextInput
            placeholder="Nome"
            style={styles.input}
            onChangeText={(text) => setNome(text)}
          ></TextInput>
          {/* input nomeUtilizador */}
          <TextInput
            placeholder="Nome Utilizador"
            style={styles.input}
            onChangeText={(text) => setNomeUtilizador(text)}
          ></TextInput>
          {/* input email */}
          <TextInput
            placeholder="Email"
            style={styles.input}
            onChangeText={(text) => setEmail(text)}
          ></TextInput>
          {/* input contacto */}
          <TextInput
            placeholder="Contacto"
            style={styles.input}
            onChangeText={(text) => setContacto(text)}
          ></TextInput>
          {/* input password */}
          <TextInput
            placeholder="Password"
            style={styles.input}
            secureTextEntry={true}
            onChangeText={(text) => setPass(text)}
          ></TextInput>
          <Button
            mode="contained"
            onPress={() => register()}
            style={styles.btnRegister}
          >
            <Text style={styles.btnTextRegister}>Criar Conta</Text>
          </Button>
          <Text
            style={styles.btnTextLogin}
            onPress={() => props.navigation.navigate("Login")}
          >
            Iniciar Sessão
          </Text>
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
  img: {
    height: 200,
    alignSelf: "center",
    marginTop: "20%",
    resizeMode: "contain",
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
  btnRegister: {
    backgroundColor: "#B72727",
    marginTop: "8%",
    height: 50,
    justifyContent: "center",
  },
  btnTextRegister: {
    fontSize: 20,
    fontFamily: "Poppins_Regular",
  },
  btnTextLogin: {
    marginTop: "4%",
    fontSize: 20,
    fontFamily: "Poppins_Regular",
    color: "#B72727",
    alignSelf: "center",
  },
});
export default Register;
