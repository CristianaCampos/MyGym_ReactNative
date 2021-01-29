import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  KeyboardAvoidingView,
  Image,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import {
  Button,
  Modal,
  Provider,
  Portal,
  FAB,
  Divider,
} from "react-native-paper";
import * as Animatable from "react-native-animatable";
import IconsFA from "react-native-vector-icons/FontAwesome";

import { database } from "../../../constant/database";
import { storage } from "../../../constant/storage";
import { styles } from "../../../constant/styles";
import { colors } from "../../../constant/colors";

export default function Login({ navigation }) {
  const uri = "http://" + database.ip + ":" + database.port + "/php/login.php";

  const [nomeUtilizador, setNomeUtilizador] = useState("");
  const [pass, setPass] = useState("");

  const [modalErro, setModalErro] = useState(false);
  const [modalDadosDesconhecidos, setModalDadosDesconhecidos] = useState(false);

  const showModalErro = () => setModalErro(true);
  const hideModalErro = () => {
    setModalErro(false);
  };

  const showModalDadosDesconhecidos = () => setModalDadosDesconhecidos(true);
  const hideModalDadosDesconhecidos = () => {
    setModalDadosDesconhecidos(false);
  };

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
          } else if (json.message === "login_failed")
            showModalDadosDesconhecidos(true);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      showModalErro(true);
    }
  }

  return (
    <Provider>
      <View style={styles.container}>
        <KeyboardAvoidingView>
          <ScrollView style={{ paddingHorizontal: "5%" }}>
            <StatusBar style="auto" />
            <Animatable.View animation="fadeInDown" useNativeDriver={true}>
              <Image
                style={{
                  // width: 310,
                  height: 250,
                  marginTop: "20%",
                  alignSelf: "center",
                  resizeMode: "contain",
                }}
                source={require("../../../../assets/logo.png")}
              ></Image>
            </Animatable.View>
            {/* modal erro */}
            <Portal>
              <Modal
                visible={modalErro}
                onDismiss={hideModalErro}
                contentContainerStyle={styles.modal}
              >
                <View
                  style={{
                    padding: 20,
                    flexDirection: "column",
                    flex: 1,
                  }}
                >
                  <Text style={styles.modalTitle}>Erro!</Text>
                  <Divider
                    style={{ backgroundColor: "black", borderWidth: 1 }}
                  />
                  <View style={{ flexDirection: "row", marginTop: 20 }}>
                    <Animatable.View animation="tada" useNativeDriver={true}>
                      <IconsFA
                        style={styles.modalIcon}
                        size={45}
                        color={colors.textWhite}
                        name="remove"
                      />
                    </Animatable.View>
                    <View>
                      <Text style={styles.modalMensagem}>
                        Preencha todos os campos!
                      </Text>
                    </View>
                  </View>
                  <TouchableOpacity
                    style={{ alignSelf: "flex-end", marginTop: 5 }}
                  >
                    <Text
                      style={{
                        color: colors.main,
                        fontFamily: "Poppins_Bold",
                        fontSize: 16,
                      }}
                      onPress={() => hideModalErro()}
                    >
                      OK
                    </Text>
                  </TouchableOpacity>
                </View>
              </Modal>
            </Portal>
            {/*  */}
            {/* modal dados desconhecidos */}
            <Portal>
              <Modal
                visible={modalDadosDesconhecidos}
                onDismiss={hideModalDadosDesconhecidos}
                contentContainerStyle={styles.modal}
              >
                <View
                  style={{
                    padding: 20,
                    flexDirection: "column",
                    flex: 1,
                  }}
                >
                  <Text style={styles.modalTitle}>Erro!</Text>
                  <Divider
                    style={{ backgroundColor: "black", borderWidth: 1 }}
                  />
                  <View style={{ flexDirection: "row", marginTop: 20 }}>
                    <Animatable.View animation="tada" useNativeDriver={true}>
                      <IconsFA
                        style={styles.modalIcon}
                        size={45}
                        color={colors.textWhite}
                        name="warning"
                      />
                    </Animatable.View>
                    <View>
                      <Text style={styles.modalMensagem}>
                        Dados Desconhecidos!
                      </Text>
                    </View>
                  </View>
                  <TouchableOpacity
                    style={{ alignSelf: "flex-end", marginTop: 5 }}
                  >
                    <Text
                      style={{
                        color: colors.main,
                        fontFamily: "Poppins_Bold",
                        fontSize: 16,
                      }}
                      onPress={() => hideModalDadosDesconhecidos()}
                    >
                      OK
                    </Text>
                  </TouchableOpacity>
                </View>
              </Modal>
            </Portal>
            {/*  */}
            <Animatable.View animation="fadeInUp" useNativeDriver={true}>
              <TextInput
                placeholder="Nome Utilizador"
                style={styles.input}
                onChangeText={(nomeUtilizador) =>
                  setNomeUtilizador(nomeUtilizador)
                }
              ></TextInput>
              <TextInput
                placeholder="Password"
                style={styles.input}
                secureTextEntry={true}
                onChangeText={(pass) => setPass(pass)}
              ></TextInput>
            </Animatable.View>
            <Animatable.View animation="fadeInUp" useNativeDriver={true}>
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
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </Provider>
  );
}
