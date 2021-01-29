import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  TextInput,
  Alert,
  View,
  Text,
  KeyboardAvoidingView,
  TouchableOpacity,
  BackHandler,
} from "react-native";
import { Button, Divider, Modal, Provider, Portal } from "react-native-paper";
import * as Animatable from "react-native-animatable";

import IconsFA from "react-native-vector-icons/FontAwesome";

import { storage } from "../../constant/storage";
import { database } from "../../constant/database";
import { styles } from "../../constant/styles";
import { colors } from "../../constant/colors";

export default function AddExercicio({ navigation }) {
  const uri =
    "http://" + database.ip + ":" + database.port + "/php/insertExercicio.php";

  const [user, setUser] = useState([]);

  const [nome, setNome] = useState("");
  const [zonaMuscular, setZonaMuscular] = useState("");

  const [modalSucesso, setModalSucesso] = useState(false);
  const [modalErro, setModalErro] = useState(false);

  const showModalErro = () => setModalErro(true);
  const hideModalErro = () => {
    setModalErro(false);
  };

  const showModalSucesso = () => setModalSucesso(true);
  const hideModalSucesso = () => {
    setModalSucesso(false);
  };

  function add() {
    if (nome != "" && zonaMuscular != "") {
      fetch(uri, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user.id,
          nome: nome,
          zonaMuscular: zonaMuscular,
        }),
      })
        .then((response) => response.json())
        .then((json) => {
          if (json.message == "success") {
            showModalSucesso(true);
            // Alert.alert(
            //   "Sucesso",
            //   "Exercício registado com sucesso!",
            //   [{ text: "OK", style: "default" }],
            //   { cancelable: true }
            // );
            // navigation.navigate("ExerciciosList");
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

  return (
    <Provider>
      <View style={styles.containerPadding}>
        <KeyboardAvoidingView>
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
                <Divider style={{ backgroundColor: "black", borderWidth: 1 }} />
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
                      Exercício registado com {"\n"}sucesso.
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
                      hideModalSucesso(), navigation.goBack();
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
                <Divider style={{ backgroundColor: "black", borderWidth: 1 }} />
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
          <Text style={styles.pageTitle}>Criar Exercício</Text>
          <Text style={styles.textInput}>Nome Exercício</Text>
          <TextInput
            placeholder="Nome Exercício"
            style={styles.input}
            onChangeText={(text) => setNome(text)}
          ></TextInput>
          <Text style={styles.textInput}>Zona Muscular</Text>
          <TextInput
            placeholder="Zona Muscular"
            style={styles.input}
            onChangeText={(txt) => setZonaMuscular(txt)}
          ></TextInput>
          <Button mode="contained" onPress={() => add()} style={styles.mainBtn}>
            <Text style={styles.mainBtnText}>Criar Exercício</Text>
          </Button>
        </KeyboardAvoidingView>
      </View>
    </Provider>
  );
}
