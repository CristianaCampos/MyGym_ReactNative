import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  Alert,
  Image,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
  Animated,
  Keyboard,
} from "react-native";
import { Button } from "react-native-paper";
import * as Animatable from "react-native-animatable";

import { database } from "../../../constant/database";
import { styles } from "../../../constant/styles";

export default function Register({ navigation }) {
  const [logo] = useState(new Animated.ValueXY({ x: 310, y: 260 }));
  const uri =
    "http://" + database.ip + ":" + database.port + "/php/insertUser.php";

  const [nome, setNome] = useState("");
  const [nomeUtilizador, setNomeUtilizador] = useState("");
  const [email, setEmail] = useState("");
  const [contacto, setContacto] = useState("");
  const [pass, setPass] = useState("");

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      keyboardDidShow
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      keyboardDidHide
    );
  }, []);

  function keyboardDidShow() {
    Animated.parallel([
      Animated.timing(logo.x, {
        toValue: 200,
        duration: 100,
      }),
      Animated.timing(logo.y, {
        toValue: 170,
        duration: 100,
      }),
    ]).start();
  }

  function keyboardDidHide() {
    Animated.parallel([
      Animated.timing(logo.x, {
        toValue: 310,
        duration: 100,
      }),
      Animated.timing(logo.y, {
        toValue: 260,
        duration: 100,
      }),
    ]).start();
  }

  function register() {
    if (
      nome != "" &&
      nomeUtilizador != "" &&
      email != "" &&
      contacto != "" &&
      pass != ""
    ) {
      fetch(uri, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nome: nome,
          nomeUtilizador: nomeUtilizador,
          email: email,
          contacto: contacto,
          pass: pass,
        }),
      })
        .then((response) => response.json())
        .then((json) => {
          if (json.message == "success") {
            navigation.navigate("Login");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      // alert("Preencha todos os campos!");
      Alert.alert(
        "Erro",
        "Preencha todos os campos!",
        [{ text: "OK", style: "destructive" }],
        { cancelable: true }
      );
    }
  }

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView>
        <ScrollView>
          <StatusBar style="auto" />
          <Animatable.View animation="fadeInDown">
            <Animated.Image
              style={{
                width: logo.x,
                height: logo.y,
                marginTop: "20%",
                alignSelf: "center",
              }}
              source={require("../../../../assets/logo.png")}
            ></Animated.Image>
          </Animatable.View>
          <Animatable.View animation="fadeInUp">
            <TextInput
              placeholder="Nome"
              style={styles.input}
              onChangeText={(text) => setNome(text)}
            ></TextInput>
            <TextInput
              placeholder="Nome Utilizador"
              style={styles.input}
              onChangeText={(text) => setNomeUtilizador(text)}
            ></TextInput>
            <TextInput
              placeholder="Email"
              style={styles.input}
              onChangeText={(text) => setEmail(text)}
            ></TextInput>
            <TextInput
              placeholder="Contacto"
              style={styles.input}
              onChangeText={(text) => setContacto(text)}
            ></TextInput>
            <TextInput
              placeholder="Password"
              style={styles.input}
              secureTextEntry={true}
              onChangeText={(text) => setPass(text)}
            ></TextInput>
          </Animatable.View>
          <Animatable.View animation="fadeInUp">
            <Button
              mode="contained"
              onPress={() => register()}
              style={styles.btnLoginRegister}
            >
              <Text style={styles.mainBtnText}>Criar Conta</Text>
            </Button>
            <Text
              style={styles.btnTextRegisterLogin}
              onPress={() => navigation.navigate("Login")}
            >
              Iniciar Sessão
            </Text>
          </Animatable.View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}
