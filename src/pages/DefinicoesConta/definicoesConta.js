import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  View,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  Text,
  TextInput,
  BackHandler,
  Alert,
} from "react-native";
import { Button } from "react-native-paper";
import { FAB } from "react-native-paper";
import * as Animatable from "react-native-animatable";

import { database } from "../../constant/database";
import { storage } from "../../constant/storage";
import { styles } from "../../constant/styles";

export default function AccountConfig({ navigation }) {
  const uriEdit =
    "http://" + database.ip + ":" + database.port + "/php/editDadosConta.php";

  const [user, setUser] = useState("");

  const [nome, setNome] = useState("");
  const [nomeUtilizador, setNomeUtilizador] = useState("");
  const [contacto, setContacto] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

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
      return (
        <View
          style={{
            marginBottom: 125,
          }}
        ></View>
      );
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

  async function getNome() {
    try {
      let value = await AsyncStorage.getItem(storage.user);
      value = JSON.parse(value);

      if (value != null) {
        setNome(value.nome);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function getNomeUtilizador() {
    try {
      let value = await AsyncStorage.getItem(storage.user);
      value = JSON.parse(value);

      if (value != null) {
        setNomeUtilizador(value.nomeUtilizador);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function getEmail() {
    try {
      let value = await AsyncStorage.getItem(storage.user);
      value = JSON.parse(value);

      if (value != null) {
        setEmail(value.email);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function getContacto() {
    try {
      let value = await AsyncStorage.getItem(storage.user);
      value = JSON.parse(value);

      if (value != null) {
        setContacto(value.contacto);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function getPass() {
    try {
      let value = await AsyncStorage.getItem(storage.user);
      value = JSON.parse(value);

      if (value != null) {
        setPass(value.pass);
      }
    } catch (error) {
      console.log(error);
    }
  }

  function getData() {
    getUser();
    getNome();
    getNomeUtilizador();
    getEmail();
    getContacto();
    getPass();
  }

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", () => true);
    return () =>
      BackHandler.removeEventListener("hardwareBackPress", () => true);
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", (e) => {
      desativarVisible();
      getData();
    });

    return unsubscribe;
  }, [navigation]);

  async function updateStorage() {
    try {
      user.nome = nome;
      user.contacto = contacto;
      user.email = email;
      user.pass = pass;

      let newUser = user;

      newUser = JSON.stringify(newUser);

      await AsyncStorage.setItem(storage.user, newUser);
      let value = await AsyncStorage.getItem(storage.user);
      value = JSON.parse(value);
    } catch (error) {
      console.log(error);
    }
  }

  function edit() {
    if (nome != "" && email != "" && contacto != "" && pass != "") {
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
    <View style={{ backgroundColor: "white", flexGrow: 1 }}>
      <KeyboardAvoidingView style={styles.container}>
        <ScrollView>
          <StatusBar style="auto" />
          <Text style={styles.pageTitle}>Definições da Conta</Text>
          <Image
            source={require("../../../assets/iconPerfil.png")}
            style={styles.imgPerfil}
          />
          <Text style={styles.meunome}>{nome}</Text>
          <Text style={styles.meunome}>@{nomeUtilizador}</Text>
          <Animatable.View animation="fadeInUp" useNativeDriver>
            <Text style={styles.textInput}>Nome</Text>
            <TextInput
              value={nome}
              editable={editable}
              style={inputStyle}
              onChangeText={(txt) => setNome(txt)}
            ></TextInput>
            <Text style={styles.textInput}>Email</Text>
            <TextInput
              value={email}
              editable={editable}
              style={inputStyle}
              onChangeText={(txt) => setEmail(txt)}
            ></TextInput>
            <Text style={styles.textInput}>Contacto</Text>
            <TextInput
              value={contacto}
              editable={editable}
              style={inputStyle}
              onChangeText={(txt) => setContacto(txt)}
            ></TextInput>
            <Text style={styles.textInput}>Password</Text>
            <TextInput
              value={pass}
              secureTextEntry={true}
              editable={editable}
              style={inputStyle}
              onChangeText={(txt) => setPass(txt)}
            ></TextInput>
          </Animatable.View>
          {seeButtonAtualizar()}
        </ScrollView>
      </KeyboardAvoidingView>
      {seeButtonFab()}
    </View>
  );
}
