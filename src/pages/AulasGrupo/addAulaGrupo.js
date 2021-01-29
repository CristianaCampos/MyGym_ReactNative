import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  TextInput,
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  BackHandler,
  Alert,
  TouchableOpacity,
} from "react-native";

import { Picker } from "@react-native-picker/picker";
import { Button, Modal, Divider, Portal, Provider } from "react-native-paper";
import * as Animatable from "react-native-animatable";

import IconsFA from "react-native-vector-icons/FontAwesome";

import { storage } from "../../constant/storage";
import { database } from "../../constant/database";
import { styles } from "../../constant/styles";
import { colors } from "../../constant/colors";

export default function AddAulaGrupo({ navigation }) {
  const uri =
    "http://" + database.ip + ":" + database.port + "/php/insertAulaGrupo.php";

  const [user, setUser] = useState([]);

  const [nome, setNome] = useState("");
  const [diaSemana, setDiaSemana] = useState("---");

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

  function add() {
    if (nome != "" && diaSemana != "---") {
      fetch(uri, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user.id,
          nome: nome,
          diaSemana: diaSemana,
        }),
      })
        .then((response) => response.json())
        .then((json) => {
          if (json.message == "success") {
            showModalSucesso(true);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      showModalErro(true);
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
                    size={45}
                    color={colors.textWhite}
                    name="check"
                  />
                </Animatable.View>
                <View>
                  <Text style={styles.modalMensagem}>
                    Aula registada com {"\n"}sucesso.
                  </Text>
                </View>
              </View>
              <TouchableOpacity style={{ alignSelf: "flex-end", marginTop: 5 }}>
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
              <TouchableOpacity style={{ alignSelf: "flex-end", marginTop: 5 }}>
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
        <Text style={styles.pageTitle}>Criar Aula Grupo</Text>
        <Text style={styles.textInput}>Nome Aula Grupo</Text>
        <TextInput
          placeholder="Nome Aula"
          style={styles.input}
          onChangeText={(text) => setNome(text)}
        ></TextInput>
        <Text style={styles.textInput}>Dia da Semana</Text>
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
        {/* <DropDownPicker
            items={[
              {
                label: "---",
                value: "---",
                disabled: true,
              },
              {
                label: "Segunda-Feira",
                value: "Segunda-Feira",
              },
              {
                label: "Terça-Feira",
                value: "Terça-Feira",
              },
              {
                label: "Quarta-Feira",
                value: "Quarta-Feira",
              },
              {
                label: "Quinta-Feira",
                value: "Quinta-Feira",
              },
              {
                label: "Sexta-Feira",
                value: "Sexta-Feira",
              },
              {
                label: "Sábado",
                value: "Sábado",
              },
              {
                label: "Domingo",
                value: "Domingo",
              },
            ]}
            defaultValue={diaSemana}
            containerStyle={{
              height: 50,
              marginTop: "2%",
            }}
            style={{
              borderColor: "#B72727",
            }}
            labelStyle={{
              fontSize: 15,
              fontFamily: "Poppins_Regular",
            }}
            dropDownStyle={{
              justifyContent: "flex-start",
              backgroundColor: "#fff",
              fontFamily: "Poppins_Regular",
            }}
            onChangeItem={(item) => setDiaSemana(item.value)}
          /> */}
        <Button mode="contained" style={styles.mainBtn} onPress={() => add()}>
          <Text style={styles.mainBtnText}>Criar Aula Grupo</Text>
        </Button>
      </KeyboardAvoidingView>
    </View>
  );
}
