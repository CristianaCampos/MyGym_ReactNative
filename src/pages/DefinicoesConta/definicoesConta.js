import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  View,
  Image,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  Text,
  TextInput,
  BackHandler,
} from "react-native";
import { Button } from "react-native-paper";
import { database } from "../../constant/database";

export default function AccountConfig({ navigation }) {
  const uri =
    "http://" + database.ip + ":" + database.port + "/php/getDadosConta.php";

  const uriEdit =
    "http://" + database.ip + ":" + database.port + "/php/editDadosConta.php";

  const [userId, setUserId] = useState("");

  const [nome, setNome] = useState("");
  const [nomeUtilizador, setNomeUtilizador] = useState("");
  const [contacto, setContacto] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

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

  function loadDados() {
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
          setNome(json.dadosConta[0].nome);
          setNomeUtilizador(json.dadosConta[0].nomeUtilizador);
          setEmail(json.dadosConta[0].email);
          setContacto(json.dadosConta[0].contacto);
          setPass(json.dadosConta[0].pass);
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
    loadDados();
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
        email: email,
        contacto: contacto,
        pass: pass,
        userId: JSON.stringify(userId),
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.message == "update_success") {
          loadDados();
        }
      })
      .catch((error) => {
        alert(error);
      });
    // const resp = await fetch(uriEdit, {
    //   method: "POST",
    //   headers: {
    //     Accept: "application/json",
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     nome: nome,
    //     email: email,
    //     contacto: contacto,
    //     pass: pass,
    //   }),
    // });
    // const json = await resp.json();
    // switch (json) {
    //   case "update_success":
    //     props.navigation.navigate("AccountConfig");
    //     break;
    //   case "server_error":
    //     alert("Server error");
    //     break;
    // }
  }

  return (
    <View style={{ backgroundColor: "white", height: "100%" }}>
      <View style={styles.container}>
        <StatusBar style="auto" />
        <Text style={styles.pageTitle}>Definições da Conta</Text>
        <View>
          <Image
            source={require("../../../assets/iconPerfil.png")}
            style={styles.imgPerfil}
          />
          <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : "height"}
          >
            <Text style={styles.meunome}>{nome}</Text>
            <Text style={styles.meunome}>@{nomeUtilizador}</Text>
            <TextInput
              defaultValue={nome}
              style={styles.input}
              onChangeText={(txt) => setNome(txt)}
            ></TextInput>
            <TextInput
              defaultValue={email}
              style={styles.input}
              onChangeText={(txt) => setEmail(txt)}
            ></TextInput>
            <TextInput
              defaultValue={contacto}
              style={styles.input}
              onChangeText={(txt) => setContacto(txt)}
            ></TextInput>
            <TextInput
              defaultValue={pass}
              style={styles.input}
              onChangeText={(txt) => setPass(txt)}
            ></TextInput>
          </KeyboardAvoidingView>
          <Button
            mode="contained"
            onPress={() => edit()}
            style={styles.btnLogin}
          >
            <Text style={styles.btnTextLogin}>Atualizar Dados</Text>
          </Button>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  imgPerfil: {
    height: "15%",
    alignSelf: "center",
    marginTop: "5%",
    resizeMode: "contain",
  },
  meunome: {
    fontFamily: "Poppins_Regular",
    fontSize: 15,
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
    marginTop: "5%",
    height: 50,
    justifyContent: "center",
  },
  btnTextLogin: {
    fontSize: 20,
    fontFamily: "Poppins_Regular",
  },
});
