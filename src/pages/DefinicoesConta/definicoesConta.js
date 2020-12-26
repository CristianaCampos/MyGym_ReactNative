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
  FlatList,
} from "react-native";
import { Button } from "react-native-paper";
import { FAB } from "react-native-paper";
import { database } from "../../constant/database";

export default function AccountConfig({ navigation }) {
  const uri =
    "http://" + database.ip + ":" + database.port + "/php/getDadosConta.php";

  const [userId, setUserId] = useState("");
  const [dadosConta, setDadosConta] = useState([]);

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
          setDadosConta(json.dadosConta);
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
  });

  useEffect(() => {
    loadDados();
  });

  return (
    <View style={{ backgroundColor: "white", height: "100%" }}>
      <View style={styles.container}>
        <StatusBar style="auto" />
        <Text style={styles.pageTitle}>Definições da Conta</Text>
        <FlatList
          data={dadosConta}
          keyExtractor={({ id }, index) => id}
          renderItem={({ item }) => (
            <View>
              <Image
                source={require("../../../assets/iconPerfil.png")}
                style={styles.imgPerfil}
              />
              <KeyboardAvoidingView
                behavior={Platform.OS == "ios" ? "padding" : "height"}
              >
                <Text style={styles.meunome}>{item.nome}</Text>
                <Text style={styles.meunome}>@{item.nomeUtilizador}</Text>
                <TextInput value={item.nome} style={styles.input}></TextInput>
                <TextInput value={item.email} style={styles.input}></TextInput>
                <TextInput
                  value={item.contacto}
                  style={styles.input}
                ></TextInput>
                <TextInput value={item.pass} style={styles.input}></TextInput>
              </KeyboardAvoidingView>
              <Button
                mode="contained"
                // onPress={() => navigation.navigate("Main")}
                style={styles.btnLogin}
              >
                <Text style={styles.btnTextLogin}>Atualizar Dados</Text>
              </Button>
            </View>
          )}
        />
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
    marginTop: "5%",
    height: 50,
    justifyContent: "center",
    marginHorizontal: "5%",
  },
  btnTextLogin: {
    fontSize: 20,
    fontFamily: "Poppins_Regular",
  },
});
