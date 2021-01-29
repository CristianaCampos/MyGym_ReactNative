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
  TouchableOpacity,
} from "react-native";
import { Button, Divider, Modal, Provider, Portal } from "react-native-paper";
import { FAB } from "react-native-paper";
import * as Animatable from "react-native-animatable";

import IconsFA from "react-native-vector-icons/FontAwesome";

import { database } from "../../constant/database";
import { storage } from "../../constant/storage";
import { styles } from "../../constant/styles";
import { colors } from "../../constant/colors";

export default function AccountConfig({ navigation }) {
  const uriEdit =
    "http://" + database.ip + ":" + database.port + "/php/editDadosConta.php";

  const [user, setUser] = useState([]);

  const [nome, setNome] = useState("");
  const [nomeUtilizador, setNomeUtilizador] = useState("");
  const [contacto, setContacto] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const [editable, setEditable] = useState(false);
  const [inputStyle, setInputStyle] = useState(styles.inputGrey);

  const [modalSucesso, setModalSucesso] = useState(false);
  const [modalErro, setModalErro] = useState(false);

  const showModalSucesso = () => setModalSucesso(true);
  const hideModalSucesso = () => {
    setModalSucesso(false);
  };

  const showModalErro = () => setModalErro(true);
  const hideModalErro = () => {
    setModalErro(false);
  };

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
    desativarVisible();
    getNome();
    getNomeUtilizador();
    getEmail();
    getContacto();
    getPass();
  }

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
            showModalSucesso(true);
            // Alert.alert(
            //   "Sucesso",
            //   "Dados atualizados com sucesso!",
            //   [{ text: "OK", style: "default" }],
            //   { cancelable: true }
            // );
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

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", () => true);
    return () =>
      BackHandler.removeEventListener("hardwareBackPress", () => true);
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
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
      getUser().then();
    });

    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    if (user) {
      getData();
    }
  }, [user]);

  return (
    <Provider>
      <View style={styles.container}>
        <KeyboardAvoidingView>
          <ScrollView style={{ paddingHorizontal: "5%" }}>
            <StatusBar style="auto" />
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
                        size={30}
                        color={colors.textWhite}
                        name="check"
                      />
                    </Animatable.View>
                    <View>
                      <Text style={styles.modalMensagem}>
                        Dados atualizados com {"\n"}sucesso.
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
                        hideModalSucesso();
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
                        size={30}
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
            <Text style={styles.pageTitle}>Definições da Conta</Text>
            <Image
              source={require("../../../assets/iconPerfil.png")}
              style={styles.imgPerfil}
            />
            <Text style={styles.meunome}>{nome}</Text>
            <Text style={styles.meunome}>@{nomeUtilizador}</Text>
            <Animatable.View animation="fadeInUp" useNativeDriver={true}>
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
    </Provider>
  );
}
