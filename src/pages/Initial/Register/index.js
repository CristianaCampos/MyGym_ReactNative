import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  Image,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Button, Modal, Portal, Divider, Provider } from "react-native-paper";
import * as Animatable from "react-native-animatable";

import IconsFA from "react-native-vector-icons/FontAwesome";

import { database } from "../../../constant/database";
import { styles } from "../../../constant/styles";
import { colors } from "../../../constant/colors";

export default function Register({ navigation }) {
  const uri =
    "http://" + database.ip + ":" + database.port + "/php/insertUser.php";

  const [nome, setNome] = useState("");
  const [nomeUtilizador, setNomeUtilizador] = useState("");
  const [email, setEmail] = useState("");
  const [contacto, setContacto] = useState("");
  const [pass, setPass] = useState("");

  const [modalErro, setModalErro] = useState(false);
  const [modalExistente, setModalExistente] = useState(false);
  const [modalSucesso, setModalSucesso] = useState(false);

  const showModalErro = () => setModalErro(true);
  const hideModalErro = () => {
    setModalErro(false);
  };

  const showModalExistente = () => setModalExistente(true);
  const hideModalExistente = () => {
    setModalExistente(false);
  };

  const showModalSucesso = () => setModalSucesso(true);
  const hideModalSucesso = () => {
    setModalSucesso(false);
  };

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
          if (json.message === "success") {
            showModalSucesso(true);
            // Alert.alert(
            //   "Sucesso",
            //   "Conta criada com sucesso! Inicie sessão para entrar na sua conta.",
            //   [
            //     {
            //       text: "OK",
            //       style: "destructive",
            //       onPress: () => navigation.navigate("Login"),
            //     },
            //   ],
            //   { cancelable: true }
            // );
          } else if (json.message === "user_already_exists") {
            // alert("Utilizador já existente!");
            showModalExistente(true);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      showModalErro(true);
      // Alert.alert(
      //   "Erro",
      //   "Preencha todos os campos!",
      //   [{ text: "OK", style: "destructive" }],
      //   { cancelable: true }
      // );
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
            {/* modal sucesso */}
            <Portal>
              <Modal
                visible={modalSucesso}
                onDismiss={hideModalSucesso}
                contentContainerStyle={styles.modal}
              >
                <View
                  style={{
                    padding: 20,
                    flexDirection: "column",
                    flex: 1,
                  }}
                >
                  <Text style={styles.modalTitle}>Sucesso!</Text>
                  <Divider
                    style={{ backgroundColor: "black", borderWidth: 1 }}
                  />
                  <View style={{ flexDirection: "row", marginTop: 20 }}>
                    <Animatable.View animation="tada" useNativeDriver={true}>
                      <IconsFA
                        style={styles.modalIcon}
                        size={45}
                        color={colors.textWhite}
                        name="check"
                      />
                    </Animatable.View>
                    <View>
                      <Text style={styles.modalMensagem}>
                        Conta criada com sucesso! {"\n"}Inicie sessão.
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
                      onPress={() => {
                        hideModalSucesso(), navigation.navigate("Login");
                      }}
                    >
                      OK
                    </Text>
                  </TouchableOpacity>
                </View>
              </Modal>
            </Portal>
            {/*  */}
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
            {/* modal utilizador existente */}
            <Portal>
              <Modal
                visible={modalExistente}
                onDismiss={hideModalExistente}
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
                        Utilizador já existente!
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
                      onPress={() => hideModalExistente()}
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
            <Animatable.View animation="fadeInUp" useNativeDriver={true}>
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
    </Provider>
  );
}
