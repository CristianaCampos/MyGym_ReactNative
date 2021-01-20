import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  View,
  Image,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  Text,
  TextInput,
  BackHandler,
} from "react-native";
import { Button } from "react-native-paper";
import { FAB } from "react-native-paper";
import * as Animatable from "react-native-animatable";

import { database } from "../../constant/database";
import { storage } from "../../constant/storage";
import { styles } from "../../constant/styles";

export default function dadosCorporais({ navigation }) {
  const uriEdit =
    "http://" +
    database.ip +
    ":" +
    database.port +
    "/php/editDadosCorporais.php";

  const [user, setUser] = useState("");
  const [dadosCorporais, setDadosCorporais] = useState("");

  const [peso, setPeso] = useState("");
  const [altura, setAltura] = useState("");
  const [massaMagra, setMassaMagra] = useState("");
  const [massaGorda, setMassaGorda] = useState("");
  const [massaHidrica, setMassaHidrica] = useState("");

  const [editable, setEditable] = useState(false);
  const [inputStyle, setInputStyle] = useState(styles.inputGrey);

  function seeButtonAtualizar() {
    if (editable) {
      return (
        <Button mode="contained" style={styles.mainBtn} onPress={() => edit()}>
          <Text style={styles.mainBtnText}>Atualizar Dados</Text>
        </Button>
      );
    } else {
      return null;
    }
  }

  function seeButtonFab() {
    if (!editable) {
      return (
        <FAB
          style={styles.fab}
          icon="square-edit-outline"
          onPress={() => ativarVisible()}
        />
      );
    } else {
      return null;
    }
  }

  function ativarVisible() {
    setEditable(true);
    setInputStyle(styles.input);
  }

  function desativarVisible() {
    setEditable(false);
    setInputStyle(styles.inputGrey);
  }

  useEffect(() => {
    desativarVisible();
  }, []);

  async function getUser() {
    try {
      let value = await AsyncStorage.getItem(storage.user);
      value = JSON.parse(value);

      if (value != null) {
        setUser(value);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function getDadosCorporais() {
    try {
      let value = await AsyncStorage.getItem(storage.dadosCorporais);
      value = JSON.parse(value);

      if (value != null) {
        setDadosCorporais(value);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function getPeso() {
    try {
      let value = await AsyncStorage.getItem(storage.dadosCorporais);
      value = JSON.parse(value);

      if (value != null) {
        setPeso(value.peso);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function getAltura() {
    try {
      let value = await AsyncStorage.getItem(storage.dadosCorporais);
      value = JSON.parse(value);

      if (value != null) {
        setAltura(value.altura);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function getMassaMagra() {
    try {
      let value = await AsyncStorage.getItem(storage.dadosCorporais);
      value = JSON.parse(value);

      if (value != null) {
        setMassaMagra(value.massaMagra);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function getMassaGorda() {
    try {
      let value = await AsyncStorage.getItem(storage.dadosCorporais);
      value = JSON.parse(value);

      if (value != null) {
        setMassaGorda(value.massaGorda);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function getMassaHidrica() {
    try {
      let value = await AsyncStorage.getItem(storage.dadosCorporais);
      value = JSON.parse(value);

      if (value != null) {
        setMassaHidrica(value.massaHidrica);
      }
    } catch (error) {
      console.log(error);
    }
  }

  function getData() {
    getUser();
    getDadosCorporais();
    getPeso();
    getAltura();
    getMassaMagra();
    getMassaGorda();
    getMassaHidrica();
  }

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", () => true);
    return () =>
      BackHandler.removeEventListener("hardwareBackPress", () => true);
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", (e) => {
      getData();
    });

    return unsubscribe;
  }, [navigation]);

  async function updateStorage() {
    try {
      dadosCorporais.peso = peso;
      dadosCorporais.altura = altura;
      dadosCorporais.massaMagra = massaMagra;
      dadosCorporais.massaGorda = massaGorda;
      dadosCorporais.massaHidrica = massaHidrica;

      let newDadosCorporais = dadosCorporais;

      newDadosCorporais = JSON.stringify(newDadosCorporais);

      await AsyncStorage.setItem(storage.dadosCorporais, newDadosCorporais);
      let value = await AsyncStorage.getItem(storage.dadosCorporais);
      value = JSON.parse(value);
    } catch (error) {
      console.log(error);
    }
  }

  function edit() {
    if (
      peso != "" &&
      altura != "" &&
      massaMagra != "" &&
      massaGorda != "" &&
      massaHidrica != ""
    ) {
      fetch(uriEdit, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          peso: peso,
          altura: altura,
          massaMagra: massaMagra,
          massaGorda: massaGorda,
          massaHidrica: massaHidrica,
          userId: user.id,
        }),
      })
        .then((response) => response.json())
        .then((json) => {
          if (json.message == "success") {
            desativarVisible();
            updateStorage();
            Alert.alert(
              "Sucesso",
              "Dados atualizados com sucesso!",
              [{ text: "OK", style: "default" }],
              { cancelable: true }
            );
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      Alert.alert(
        "Erro",
        "Preencha todos os campos!",
        [{ text: "OK", style: "destructive" }],
        { cancelable: true }
      );
    }
  }

  return (
    <View style={{ backgroundColor: "white", height: "100%" }}>
      <KeyboardAvoidingView>
        <ScrollView>
          <View style={styles.container}>
            <StatusBar style="auto" />
            <Text style={styles.pageTitle}>Dados Corporais</Text>
            <Image
              source={require("../../../assets/iconPerfil.png")}
              style={styles.imgPerfil}
            />
            <Animatable.View animation="fadeInUp">
              <Text style={styles.textInput}>Peso</Text>
              <TextInput
                editable={editable}
                value={peso}
                style={inputStyle}
                onChangeText={(txt) => setPeso(txt)}
              ></TextInput>
              <Text style={styles.textInput}>Altura</Text>
              <TextInput
                editable={editable}
                value={altura}
                style={inputStyle}
                onChangeText={(txt) => setAltura(txt)}
              ></TextInput>
              <Text style={styles.textInput}>Massa Magra</Text>
              <TextInput
                editable={editable}
                value={massaMagra}
                style={inputStyle}
                onChangeText={(txt) => setMassaMagra(txt)}
              ></TextInput>
              <Text style={styles.textInput}>Massa Gorda</Text>
              <TextInput
                editable={editable}
                value={massaGorda}
                style={inputStyle}
                onChangeText={(txt) => setMassaGorda(txt)}
              ></TextInput>
              <Text style={styles.textInput}>Massa Hidrica</Text>
              <TextInput
                editable={editable}
                value={massaHidrica}
                style={inputStyle}
                onChangeText={(txt) => setMassaHidrica(txt)}
              ></TextInput>
            </Animatable.View>
            {seeButtonAtualizar()}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      {seeButtonFab()}
    </View>
  );
}
