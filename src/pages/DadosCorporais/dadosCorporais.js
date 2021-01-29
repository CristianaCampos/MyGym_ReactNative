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
  TouchableOpacity,
} from "react-native";
import { Button, Modal, Divider, Provider, Portal } from "react-native-paper";
import { FAB } from "react-native-paper";
import * as Animatable from "react-native-animatable";

import IconsFA from "react-native-vector-icons/FontAwesome";

import { database } from "../../constant/database";
import { storage } from "../../constant/storage";
import { styles } from "../../constant/styles";
import { colors } from "../../constant/colors";

export default function dadosCorporais({ navigation }) {
  const uriEdit =
    "http://" +
    database.ip +
    ":" +
    database.port +
    "/php/editDadosCorporais.php";

  const [user, setUser] = useState([]);
  const [dadosCorporais, setDadosCorporais] = useState("");

  const [peso, setPeso] = useState("");
  const [altura, setAltura] = useState("");
  const [massaMagra, setMassaMagra] = useState("");
  const [massaGorda, setMassaGorda] = useState("");
  const [massaHidrica, setMassaHidrica] = useState("");

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
            marginBottom: 140,
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
    desativarVisible();
    getPeso();
    getAltura();
    getMassaMagra();
    getMassaGorda();
    getMassaHidrica();
  }

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
    const unsubscribe = navigation.addListener("focus", () => {
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
      getDadosCorporais().then();
    });
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    if (user && dadosCorporais) {
      getData();
    }
  }, [user, dadosCorporais]);

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
            <Text style={styles.pageTitle}>Dados Corporais</Text>
            <Image
              source={require("../../../assets/iconPerfil.png")}
              style={styles.imgPerfil}
            />
            <Animatable.View animation="fadeInUp" useNativeDriver={true}>
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
          </ScrollView>
        </KeyboardAvoidingView>
        {seeButtonFab()}
      </View>
    </Provider>
  );
}
