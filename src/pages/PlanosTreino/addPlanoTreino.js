import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  Text,
  TextInput,
  View,
  BackHandler,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Button, Modal, Portal, Divider, Provider } from "react-native-paper";
import { Picker } from "@react-native-picker/picker";
import * as Animatable from "react-native-animatable";

import IconsFA from "react-native-vector-icons/FontAwesome";

import { storage } from "../../constant/storage";
import { database } from "../../constant/database";
import { styles } from "../../constant/styles";
import { colors } from "../../constant/colors";

export default function AddPlanoTreino({ route, navigation }) {
  const uriAdd =
    "http://" +
    database.ip +
    ":" +
    database.port +
    "/php/insertPlanoTreino.php";

  const [nome, setNome] = useState("");
  const [diaSemana, setDiaSemana] = useState("---");

  const [exercicio1, setExercicio1] = useState("---");
  const [exercicio2, setExercicio2] = useState("---");
  const [exercicio3, setExercicio3] = useState("---");

  const [aula1, setAula1] = useState("---");
  const [aula2, setAula2] = useState("---");

  const [modalErro, setModalErro] = useState(false);
  const [modalSucesso, setModalSucesso] = useState(false);

  const { user, exercicios, aulas } = route.params;

  const showModalErro = () => setModalErro(true);
  const hideModalErro = () => {
    setModalErro(false);
  };

  const showModalSucesso = () => setModalSucesso(true);
  const hideModalSucesso = () => {
    setModalSucesso(false);
  };

  function add() {
    if (nome != "" && diaSemana != "---" && exercicio1 != "---") {
      fetch(uriAdd, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user.id,
          nome: nome,
          diaSemana: diaSemana,
          exercicio1: exercicio1,
          exercicio2: exercicio2,
          exercicio3: exercicio3,
          aula1: aula1,
          aula2: aula2,
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

  let myExercicios = exercicios.map((myValue, myIndex) => {
    return (
      <Picker.Item
        label={myValue.nome}
        value={myValue.nome}
        key={myIndex + 1}
      />
    );
  });

  let myAulas = aulas.map((myValue, myIndex) => {
    return (
      <Picker.Item
        label={myValue.nome}
        value={myValue.nome}
        key={myIndex + 1}
      />
    );
  });

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
                        Plano registado com {"\n"}sucesso.
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
            <Text style={styles.pageTitle}>Criar Plano Treino</Text>
            <Text style={styles.textInput}>Nome Plano Treino</Text>
            <TextInput
              placeholder="Nome Plano"
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
              onValueChange={(value, index) => setExercicio1(value)}
            >
              <Picker.Item label={"---"} value={0} key={0} />
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
              onValueChange={(value, index) => setExercicio2(value)}
            >
              <Picker.Item label={"---"} value={0} key={0} />
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
              selectedValue={exercicio3}
              onValueChange={(value, index) => setExercicio3(value)}
            >
              <Picker.Item label={"---"} value={0} key={0} />
              {myExercicios}
            </Picker>
            <Text style={styles.textExercicios}>Aulas de Grupo</Text>
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
              selectedValue={aula1}
              onValueChange={(value, index) => setAula1(value)}
            >
              <Picker.Item label={"---"} value={0} key={0} />
              {myAulas}
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
              selectedValue={aula2}
              onValueChange={(value, index) => setAula2(value)}
            >
              <Picker.Item label={"---"} value={"---"} key={0} />
              {myAulas}
            </Picker>
            <Button
              mode="contained"
              style={styles.mainBtn}
              onPress={() => add()}
            >
              <Text style={styles.mainBtnText}>Criar Plano Treino</Text>
            </Button>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </Provider>
  );
}
