import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  Alert,
  KeyboardAvoidingView,
  Image,
  TextInput,
  ScrollView,
  Animated,
  Keyboard,
} from "react-native";
import { Button } from "react-native-paper";
import * as Animatable from "react-native-animatable";

import { database } from "../../../constant/database";
import { storage } from "../../../constant/storage";
import { styles } from "../../../constant/styles";

export default function Login({ navigation }) {
  const [logo] = useState(new Animated.ValueXY({ x: 310, y: 260 }));
  const uri = "http://" + database.ip + ":" + database.port + "/php/login.php";

  const [nomeUtilizador, setNomeUtilizador] = useState("");
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

  const saveUserSettings = async (userId, user, dadosCorporais, exercicios) => {
    try {
      const value = JSON.stringify(userId);
      const value2 = JSON.stringify(user);
      const value3 = JSON.stringify(dadosCorporais);
      const value4 = JSON.stringify(exercicios);
      await AsyncStorage.setItem("user_id", value);
      await AsyncStorage.setItem(storage.user, value2);
      await AsyncStorage.setItem(storage.dadosCorporais, value3);
      await AsyncStorage.setItem(storage.exercicios, value4);
    } catch (error) {
      console.log(error);
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
          if (json.message === "success") {
            saveUserSettings(
              json.user_id,
              json.user,
              json.dadosCorporais,
              json.exercises
            );
            navigation.navigate("Main");
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
    <View style={styles.container}>
      <KeyboardAvoidingView>
        {/* <ScrollView> */}
        <StatusBar style="auto" />
        <Animatable.View animation="fadeInDown">
          <Animated.Image
            style={{
              width: logo.x,
              height: logo.y,
              marginTop: "20%",
              alignSelf: "center",
            }}
            // style={{
            //   marginTop: "20%",
            //   width: "100%",
            //   height: 250,
            //   resizeMode: "contain",
            // }}
            source={require("../../../../assets/logo.png")}
          ></Animated.Image>
        </Animatable.View>
        <Animatable.View animation="fadeInUp">
          <TextInput
            placeholder="Nome Utilizador"
            style={styles.input}
            onChangeText={(nomeUtilizador) => setNomeUtilizador(nomeUtilizador)}
          ></TextInput>
          <TextInput
            placeholder="Password"
            style={styles.input}
            secureTextEntry={true}
            onChangeText={(pass) => setPass(pass)}
          ></TextInput>
        </Animatable.View>
        <Animatable.View animation="fadeInUp">
          <Button
            mode="contained"
            onPress={() => login()}
            style={styles.btnLoginRegister}
          >
            <Text style={styles.mainBtnText}>Iniciar Sessão</Text>
          </Button>
          <Text
            style={styles.btnTextRegisterLogin}
            onPress={() => navigation.navigate("Register")}
          >
            Criar Conta
          </Text>
        </Animatable.View>
        {/* </ScrollView> */}
      </KeyboardAvoidingView>
    </View>
  );
}
