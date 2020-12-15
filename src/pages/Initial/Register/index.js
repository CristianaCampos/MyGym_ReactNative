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

function Register(props) {
  const uri = "http://192.168.1.75:80/php/insertUser.php";

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
        {/* <View style={styles.input}> */}
        <TextInput
          placeholder="Nome"
          style={styles.input}
          onChangeText={(text) => setNome(text)}
        ></TextInput>
        {/* </View> */}
        {/* input nomeUtilizador */}
        {/* <View style={styles.input}> */}
        <TextInput
          placeholder="Nome Utilizador"
          style={styles.input}
          onChangeText={(text) => setNomeUtilizador(text)}
        ></TextInput>
        {/* </View> */}
        {/* input email */}
        {/* <View style={styles.input}> */}
        <TextInput
          placeholder="Email"
          style={styles.input}
          onChangeText={(text) => setEmail(text)}
        ></TextInput>
        {/* </View> */}
        {/* input contacto */}
        {/* <View style={styles.input}> */}
        <TextInput
          placeholder="Contacto"
          style={styles.input}
          onChangeText={(text) => setContacto(text)}
        ></TextInput>
        {/* </View> */}
        {/* input password */}
        {/* <View style={styles.input}> */}
        <TextInput
          placeholder="Password"
          style={styles.input}
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
  btnRegister: {
    backgroundColor: "#B72727",
    marginTop: "8%",
    height: "7%",
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
