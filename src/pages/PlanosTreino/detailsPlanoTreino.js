import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  TextInput,
  View,
  Text,
  KeyboardAvoidingView,
  Image,
  BackHandler,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Button, Provider, Portal, Modal, Divider } from "react-native-paper";
import { FAB } from "react-native-paper";
import { Picker } from "@react-native-picker/picker";
import * as Animatable from "react-native-animatable";

import IconsFA from "react-native-vector-icons/FontAwesome";

import { database } from "../../constant/database";
import { storage } from "../../constant/storage";
import { styles } from "../../constant/styles";
import { colors } from "../../constant/colors";

export default function DetailsPlanoTreino({ route, navigation }) {
  const uriEdit =
    "http://" + database.ip + ":" + database.port + "/php/editPlano.php";

  const uriNomeExercicios =
    "http://" +
    database.ip +
    ":" +
    database.port +
    "/php/getNomeExercicios.php";

  const uriIdExercicios =
    "http://" + database.ip + ":" + database.port + "/php/getIdExercicios.php";

  const { plano, exercicios } = route.params;
  const [user, setUser] = useState([]);

  const [nome, setNome] = useState("");
  const [diaSemana, setDiaSemana] = useState("");
  const [exercicio1, setExercicio1] = useState("");
  const [exercicio2, setExercicio2] = useState("");

  const [exercicioId1, setExercicioId1] = useState("");
  const [exercicioId2, setExercicioId2] = useState("");

  const [editable, setEditable] = useState(false);
  const [inputStyle, setInputStyle] = useState(styles.inputGrey);

  const [modalSucesso, setModalSucesso] = useState(false);

  const showModalSucesso = () => setModalSucesso(true);
  const hideModalSucesso = () => {
    setModalSucesso(false);
  };

  function seeButtonAtualizar() {
    if (editable) {
      return (
        <Button
          mode="contained"
          style={styles.updateDataBtn}
          onPress={() => edit()}
        >
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
        <View>
          <Text style={styles.textInput}>Dia da Semana</Text>
          <TextInput
            placeholder="Dia da Semana"
            editable={editable}
            style={inputStyle}
            defaultValue={diaSemana}
            onChangeText={(txt) => setDiaSemana(txt)}
          ></TextInput>
          <Text style={styles.textExercicios}>Exercícios</Text>
          <TextInput
            placeholder="Exercício"
            editable={editable}
            style={inputStyle}
            defaultValue={exercicio1}
            onChangeText={(txt) => setExercicio1(txt)}
          ></TextInput>
          <TextInput
            placeholder="Exercício"
            editable={editable}
            style={inputStyle}
            defaultValue={exercicio2}
            onChangeText={(txt) => setExercicio2(txt)}
          ></TextInput>
        </View>
      );
    } else {
      return (
        <View>
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
          <Text style={styles.textExercicios}>Exercícios</Text>
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
            selectedValue={exercicio1}
            onValueChange={(value, index) => getIdExercicios(value, 1)}
          >
            {myExercicios}
          </Picker>
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
            selectedValue={exercicio2}
            onValueChange={(value, index) => getIdExercicios(value, 2)}
          >
            {myExercicios}
          </Picker>
        </View>
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

  function getIdExercicios(value, indice) {
    fetch(uriIdExercicios, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        exercicioNome: value,
        userId: user.id,
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.message == "success") {
          if (indice == 1) {
            setExercicio1(value);
            setExercicioId1(json.id);
          } else if (indice == 2) {
            setExercicio2(value);
            setExercicioId2(json.id);
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function getNomeExercicios(exercicio, indice) {
    fetch(uriNomeExercicios, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        exercicioId: exercicio,
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.message == "success") {
          if (indice == 1) setExercicio1(json.nome);
          else if (indice == 2) setExercicio2(json.nome);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function getNome() {
    setNome(plano.nome);
  }

  function getDiaSemana() {
    setDiaSemana(plano.diaSemana);
  }

  function getExercicio1() {
    setExercicioId1(plano.idEx1);
    getNomeExercicios(plano.idEx1, 1);
  }

  function getExercicio2() {
    setExercicioId2(plano.idEx2);
    getNomeExercicios(plano.idEx2, 2);
  }

  function getData() {
    desativarVisible();
    getNome();
    getDiaSemana();
    getExercicio1();
    getExercicio2();
  }

  function edit() {
    fetch(uriEdit, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: plano.id,
        nome: nome,
        diaSemana: diaSemana,
        exercicio1: exercicioId1,
        exercicio2: exercicioId2,
        idUtilizador: user.id,
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.message == "success") {
          desativarVisible();
          showModalSucesso(true);
          // Alert.alert(
          //   "Sucesso",
          //   "Plano atualizado com sucesso!",
          //   [{ text: "OK", style: "default" }],
          //   { cancelable: true }
          // );
          // navigation.goBack();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    //TODO: TEST REMOVE THIS LATER
    BackHandler.addEventListener("hardwareBackPress", () => true);
    return () =>
      BackHandler.removeEventListener("hardwareBackPress", () => true);
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", (e) => {
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

  let myExercicios = exercicios.map((myValue, myIndex) => {
    return (
      <Picker.Item label={myValue.nome} value={myValue.nome} key={myIndex} />
    );
  });

  return (
    <Provider>
      <View style={styles.container}>
        <KeyboardAvoidingView>
          <StatusBar style="auto" />
          <ScrollView style={{ paddingHorizontal: "5%" }}>
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
                        Plano atualizado com {"\n"}sucesso!
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
            <Text style={styles.pageTitle}>Detalhes Plano Treino</Text>
            <Image
              style={{ width: "100%", height: 200 }}
              source={require("../../../assets/planoTreino.jpg")}
            ></Image>
            <Text style={styles.textInput}>Nome Plano Treino</Text>
            <TextInput
              placeholder="Nome Plano Treino"
              editable={editable}
              style={inputStyle}
              defaultValue={nome}
              onChangeText={(txt) => setNome(txt)}
            ></TextInput>
            {seeForm()}
            {seeButtonAtualizar()}
          </ScrollView>
        </KeyboardAvoidingView>
        {seeButtonFab()}
      </View>
    </Provider>
  );
}
