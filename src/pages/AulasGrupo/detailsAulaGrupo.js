import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  TextInput,
  Alert,
  View,
  Text,
  BackHandler,
  ScrollView,
  KeyboardAvoidingView,
  Image,
  Picker,
  TouchableOpacity,
} from "react-native";
import {
  FAB,
  Button,
  Modal,
  Divider,
  Provider,
  Portal,
} from "react-native-paper";
import * as Animatable from "react-native-animatable";

import IconsFA from "react-native-vector-icons/FontAwesome";

import { database } from "../../constant/database";
import { storage } from "../../constant/storage";
import { styles } from "../../constant/styles";
import { colors } from "../../constant/colors";

export default function DetailsAulaGrupo({ route, navigation }) {
  const uriEdit =
    "http://" + database.ip + ":" + database.port + "/php/editAula.php";

  const { aula } = route.params;

  const [user, setUser] = useState([]);
  const [nome, setNome] = useState("");
  const [diaSemana, setDiaSemana] = useState("");

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

  function seeForm() {
    if (!editable) {
      return (
        <TextInput
          placeholder="Dia da Semana"
          editable={editable}
          style={inputStyle}
          value={diaSemana}
          onChangeText={(txt) => setDiaSemana(txt)}
        ></TextInput>
      );
    } else {
      return (
        <Picker
          itemStyle={{
            color: "black",
            fontFamily: "Poppins_Regular",
            fontSize: 15,
            height: 100,
            borderRadius: 7,
            marginTop: 0,
          }}
          mode="dropdown"
          selectedValue={diaSemana}
          onValueChange={(value, index) => setDiaSemana(value)}
        >
          <Picker.Item label="---" value="---" />
          <Picker.Item label="Segunda-Feira" value="Segunda-Feira" />
          <Picker.Item label="Terça-Feira" value="Terça-Feira" />
          <Picker.Item label="Quarta-Feira" value="Quarta-Feira" />
          <Picker.Item label="Quinta-Feira" value="Quinta-Feira" />
          <Picker.Item label="Sexta-Feira" value="Sexta-Feira" />
          <Picker.Item label="Sábado" value="Sábado" />
          <Picker.Item label="Domingo" value="Domingo" />
        </Picker>
      );
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

  function getNome() {
    setNome(aula.nome);
  }

  function getDiaSemana() {
    setDiaSemana(aula.diaSemana);
  }

  function getData() {
    desativarVisible();
    getNome();
    getDiaSemana();
  }

  function edit() {
    if (nome != "" && diaSemana != "") {
      fetch(uriEdit, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: aula.id,
          nome: nome,
          diaSemana: diaSemana,
          idUtilizador: user.id,
        }),
      })
        .then((response) => response.json())
        .then((json) => {
          if (json.message === "success") {
            desativarVisible();
            showModalSucesso(true);
            // Alert.alert(
            //   "Sucesso",
            //   "Aula atualizada com sucesso!",
            //   [{ text: "OK", style: "default" }],
            //   { cancelable: true }
            // );
            // navigation.goBack();
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
                        size={45}
                        color={colors.textWhite}
                        name="check"
                      />
                    </Animatable.View>
                    <View>
                      <Text style={styles.modalMensagem}>
                        Aula atualizada com {"\n"}sucesso.
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
            <Text style={styles.pageTitle}>Detalhes Aula Grupo</Text>
            <Image
              style={{ width: "100%", height: 200 }}
              source={require("../../../assets/aulaGrupo.jpg")}
            ></Image>
            <Text style={styles.textInput}>Nome Aula Grupo</Text>
            <TextInput
              placeholder="Nome Aula Grupo"
              editable={editable}
              style={inputStyle}
              value={nome}
              onChangeText={(txt) => setNome(txt)}
            ></TextInput>
            <Text style={styles.textInput}>Dia da Semana</Text>
            {seeForm()}
            {seeButtonAtualizar()}
          </ScrollView>
        </KeyboardAvoidingView>
        {seeButtonFab()}
      </View>
    </Provider>
  );
}
