import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  TextInput,
  StyleSheet,
  View,
  Text,
  KeyboardAvoidingView,
  Image,
  BackHandler,
} from "react-native";
import { Button } from "react-native-paper";
import { FAB } from "react-native-paper";
import DropDownPicker from "react-native-dropdown-picker";
import { Picker } from "@react-native-picker/picker";

import { database } from "../../constant/database";
import { ScrollView } from "react-native-gesture-handler";

export default function DetailsPlanoTreino({ route }) {
  const uri2 =
    "http://" +
    database.ip +
    ":" +
    database.port +
    "/php/getExerciciosPlanos.php";

  const uri =
    "http://" + database.ip + ":" + database.port + "/php/getDetailsPlano.php";

  const uriEdit =
    "http://" + database.ip + ":" + database.port + "/php/editPlano.php";

  const { id } = route.params;
  const [exercicios, setExercicios] = useState([]);
  const [userId, setUserId] = useState("");
  const [nome, setNome] = useState("");
  const [diaSemana, setDiaSemana] = useState("");
  const [exercicio1, setExercicio1] = useState("");
  const [exercicio2, setExercicio2] = useState("");

  const [visible, setVisible] = useState(false);
  const [buttonEdit, setButtonEdit] = useState(false);
  const [buttonFab, setButtonFab] = useState(true);

  function ativarVisible() {
    setVisible(!visible);
    setButtonFab(!buttonFab);
    setButtonEdit(!buttonEdit);
  }

  function desativarVisible() {
    setVisible(!visible);
    setButtonFab(!buttonFab);
    setButtonEdit(!buttonEdit);
  }

  function loadExercicios() {
    fetch(uri2, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: JSON.stringify(userId),
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.message == "success") {
          setExercicios(json.exercises);
        }
      })
      .catch((error) => {
        alert(error);
      });
  }

  async function getAsyncUser() {
    try {
      let id = await AsyncStorage.getItem("user_id");
      id = JSON.parse(id);

      if (id != null) {
        setUserId(id);
      }
    } catch (error) {
      alert(error);
    }
  }

  function loadPlano() {
    fetch(uri, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: userId,
        planoId: id,
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.message == "success") {
          setNome(json.plano[0].nome);
          setDiaSemana(json.plano[0].diaSemana);
          setExercicio1(json.exercicios[0].nome);
          setExercicio2(json.exercicios[1].nome);
        }
      })
      .catch((error) => {
        alert(error);
      });
  }

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", () => true);
    return () =>
      BackHandler.removeEventListener("hardwareBackPress", () => true);
  }, []);

  useEffect(() => {
    getAsyncUser();
  }, []);

  useEffect(() => {
    loadPlano();
  }, []);

  useEffect(() => {
    loadExercicios();
  }, []);

  function edit() {
    fetch(uriEdit, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nome: nome,
        diaSemana: diaSemana,
        exercicio1: exercicio1,
        exercicio2: exercicio2,
        userId: JSON.stringify(userId),
        planoId: id,
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.message == "success") {
          alert("Plano atualizado com sucesso!");
          desativarVisible();
          loadPlano();
        }
      })
      .catch((error) => {
        alert(error);
      });
  }

  let myExercicios = exercicios.map((myValue, myIndex) => {
    return (
      <Picker.Item label={myValue.nome} value={myValue.nome} key={myIndex} />
    );
  });

  return (
    <View style={{ backgroundColor: "white", height: "100%" }}>
      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <StatusBar style="auto" />
        <ScrollView>
          <Text style={styles.pageTitle}>Detalhes Plano Treino</Text>
          {/* <Image
            style={styles.img}
            source={require("../../../assets/planoTreino.jpg")}
          ></Image> */}
          {visible ? (
            <View>
              <TextInput
                placeholder="Nome Plano Treino"
                editable={visible}
                style={styles.input}
                defaultValue={nome}
                onChangeText={(txt) => setNome(txt)}
              ></TextInput>
              <DropDownPicker
                items={[
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
                containerStyle={{ height: 50, marginTop: "5%" }}
                style={{
                  backgroundColor: "#fff",
                  borderColor: "#B72727",
                }}
                itemStyle={{
                  justifyContent: "flex-start",
                }}
                dropDownStyle={{ backgroundColor: "#fff" }}
                onChangeItem={(item) => setDiaSemana(item.value)}
              />
              <Text style={styles.textExercicios}>Exercícios</Text>
              <Picker
                mode="dropdown"
                selectedValue={exercicio1}
                onValueChange={(value, index) => setExercicio1(value)}
              >
                {myExercicios}
              </Picker>
              <Picker
                mode="dropdown"
                selectedValue={exercicio2}
                onValueChange={(value, index) => setExercicio2(value)}
              >
                {myExercicios}
              </Picker>
              {/* <TextInput
              placeholder="Exercício 1"
              editable={visible}
              style={styles.input}
              defaultValue={exercicio1}
              onChangeText={(txt) => setExercicio1(txt)}
            ></TextInput>
            <TextInput
              placeholder="Exercício 2"
              editable={visible}
              style={styles.input}
              defaultValue={exercicio2}
              onChangeText={(txt) => setExercicio2(txt)}
            ></TextInput> */}
            </View>
          ) : (
            <View>
              <TextInput
                placeholder="Nome Plano Treino"
                editable={visible}
                style={styles.inputGrey}
                defaultValue={nome}
                onChangeText={(txt) => setNome(txt)}
              ></TextInput>
              <DropDownPicker
                items={[
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
                containerStyle={{ height: 50, marginTop: "5%" }}
                style={{
                  backgroundColor: "#fff",
                  borderColor: "#B72727",
                }}
                itemStyle={{
                  justifyContent: "flex-start",
                }}
                dropDownStyle={{ backgroundColor: "#fff" }}
                onChangeItem={(item) => setDiaSemana(item.value)}
              />
              <Text style={styles.textExercicios}>Exercícios</Text>
              <Picker
                mode="dropdown"
                selectedValue={exercicio1}
                onValueChange={(value, index) => setExercicio1(value)}
              >
                {myExercicios}
              </Picker>
              <Picker
                mode="dropdown"
                selectedValue={exercicio2}
                onValueChange={(value, index) => setExercicio2(value)}
              >
                {myExercicios}
              </Picker>
              {/* <TextInput
              placeholder="Exercício 1"
              editable={visible}
              style={styles.inputGrey}
              defaultValue={exercicio1}
              onChangeText={(txt) => setExercicio1(txt)}
            ></TextInput>
            <TextInput
              placeholder="Exercício 2"
              editable={visible}
              style={styles.inputGrey}
              defaultValue={exercicio2}
              onChangeText={(txt) => setExercicio2(txt)}
            ></TextInput> */}
            </View>
          )}
          {buttonEdit ? (
            <Button
              mode="contained"
              style={styles.btnLogin}
              onPress={() => edit()}
            >
              <Text style={styles.btnTextLogin}>Atualizar Dados</Text>
            </Button>
          ) : null}
          {buttonFab ? (
            <FAB
              style={styles.fab}
              icon="square-edit-outline"
              onPress={() => ativarVisible()}
            />
          ) : null}
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  img: {
    height: "40%",
    alignSelf: "center",
    marginTop: "5%",
    resizeMode: "contain",
  },
  fab: {
    backgroundColor: "#B72727",
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 20,
  },
  container: {
    height: "100%",
    marginHorizontal: "5%",
  },
  textExercicios: {
    fontSize: 20,
    fontFamily: "Poppins_Bold",
    marginTop: "5%",
  },
  pageTitle: {
    fontSize: 25,
    fontFamily: "Poppins_Bold",
    marginTop: "3%",
    marginLeft: "5%",
    textAlign: "center",
  },
  input: {
    height: 50,
    marginTop: "5%",
    flexDirection: "row",
    alignSelf: "center",
    width: "100%",
    borderWidth: 1,
    paddingHorizontal: 10,
    borderColor: "#B72727",
    borderRadius: 7,
    fontSize: 15,
    fontFamily: "Poppins_Regular",
  },
  inputGrey: {
    height: 50,
    marginTop: "5%",
    flexDirection: "row",
    alignSelf: "center",
    width: "100%",
    borderWidth: 1,
    paddingHorizontal: 10,
    borderColor: "#B72727",
    borderRadius: 7,
    fontSize: 15,
    fontFamily: "Poppins_Regular",
    color: "grey",
  },
  btnLogin: {
    backgroundColor: "#B72727",
    marginTop: "8%",
    height: 50,
    justifyContent: "center",
  },
  btnTextLogin: {
    fontSize: 20,
    fontFamily: "Poppins_Regular",
  },
});
