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
    "http://" +
    database.ip +
    ":" +
    database.port +
    "/Backend_MyGym/php/editPlano.php";

  const { user, plano, exercicios, aulas } = route.params;

  const [nome, setNome] = useState("");
  const [diaSemana, setDiaSemana] = useState("");

  const [exercicio1, setExercicio1] = useState("");
  const [exercicio2, setExercicio2] = useState("");
  const [exercicio3, setExercicio3] = useState("");

  const [aula1, setAula1] = useState("");
  const [aula2, setAula2] = useState("");

  const [editable, setEditable] = useState(false);
  const [inputStyle, setInputStyle] = useState(styles.inputGrey);

  const [modalSucesso, setModalSucesso] = useState(false);

  const showModalSucesso = () => setModalSucesso(true);
  const hideModalSucesso = () => {
    setModalSucesso(false);
  };

  function loadPlanoInfo() {
    setNome(plano.nome);
    setDiaSemana(plano.diaSemana);
    setExercicio1(plano.exercicio1);
    setExercicio2(plano.exercicio2);
    setExercicio3(plano.exercicio3);
    setAula1(plano.aula1);
    setAula2(plano.aula2);
  }

  function ativarVisible() {
    setEditable(true);
    setInputStyle(styles.input);
  }

  function desativarVisible() {
    setEditable(false);
    setInputStyle(styles.inputGrey);
  }

  function edit() {
    if (nome != "" && diaSemana != "---" && exercicio1 != "---")
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
          exercicio1: exercicio1,
          exercicio2: exercicio2,
          exercicio3: exercicio3,
          aula1: aula1,
          aula2: aula2,
          idUtilizador: user.id,
        }),
      })
        .then((response) => response.json())
        .then((json) => {
          if (json.message == "success") {
            desativarVisible();
            showModalSucesso(true);
          }
        })
        .catch((error) => {
          console.log(error);
        });
  }

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
            value={diaSemana}
          ></TextInput>
          <Text style={styles.textExercicios}>Exercícios</Text>
          <TextInput
            placeholder="Exercício"
            editable={editable}
            style={inputStyle}
            defaultValue={exercicio1}
          ></TextInput>
          <TextInput
            placeholder="Exercício"
            editable={editable}
            style={inputStyle}
            defaultValue={exercicio2}
          ></TextInput>
          <TextInput
            placeholder="Exercício"
            editable={editable}
            style={inputStyle}
            defaultValue={exercicio3}
          ></TextInput>
          <Text style={styles.textExercicios}>Aulas de Grupo</Text>
          <TextInput
            placeholder="Aula de Grupo"
            editable={editable}
            style={inputStyle}
            value={aula1}
          ></TextInput>
          <TextInput
            placeholder="Aula de Grupo"
            editable={editable}
            style={inputStyle}
            defaultValue={aula2}
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
            <Picker.Item label={"---"} value={"---"} key={0} />
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
        </View>
      );
    }
  }

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", () => true);
    return () =>
      BackHandler.removeEventListener("hardwareBackPress", () => true);
  }, []);

  useEffect(() => {
    if (user) {
      desativarVisible();
      loadPlanoInfo();
    }
  }, [user]);

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
                        size={45}
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
              value={nome}
              onChangeText={(nome) => setNome(nome)}
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
