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
  Alert,
} from "react-native";
import { Button } from "react-native-paper";
import { FAB } from "react-native-paper";
import DropDownPicker from "react-native-dropdown-picker";
import { Picker } from "@react-native-picker/picker";

import { database } from "../../constant/database";
import { storage } from "../../constant/storage";
import { styles } from "../../constant/styles";

export default function DetailsPlanoTreino({ route, navigation }) {
  const uriEdit =
    "http://" + database.ip + ":" + database.port + "/php/editPlano.php";

  const { plano, exercicios } = route.params;
  const [user, setUser] = useState("");

  const [nome, setNome] = useState("");
  const [diaSemana, setDiaSemana] = useState("");
  const [exercicio1, setExercicio1] = useState("");
  const [exercicio2, setExercicio2] = useState("");

  const [editable, setEditable] = useState(false);
  const [inputStyle, setInputStyle] = useState(styles.inputGrey);

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

  function ativarVisible() {
    setEditable(true);
    setInputStyle(styles.input);
  }

  function desativarVisible() {
    setEditable(false);
    setInputStyle(styles.inputGrey);
  }

  useEffect(() => {
    desativarVisible();
  }, []);

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

  function getNome() {
    setNome(plano.nome);
  }

  function getDiaSemana() {
    setDiaSemana(plano.diaSemana);
  }

  function getExercicio1() {
    setExercicio1(plano.exercicio1);
  }

  function getExercicio2() {
    setExercicio2(plano.exercicio2);
  }

  function getData() {
    getUser();
    getNome();
    getDiaSemana();
    getExercicio1();
    getExercicio2();
  }

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", () => true);
    return () =>
      BackHandler.removeEventListener("hardwareBackPress", () => true);
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", (e) => {
      getData();
    });

    return unsubscribe;
  }, [navigation]);

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
        exercicio1: exercicio1,
        exercicio2: exercicio2,
        idUtilizador: user.id,
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.message == "success") {
          desativarVisible();
          Alert.alert(
            "Sucesso",
            "Plano atualizado com sucesso!",
            [{ text: "OK", style: "default" }],
            { cancelable: true }
          );
          navigation.goBack();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  let myExercicios = exercicios.map((myValue, myIndex) => {
    return (
      <Picker.Item label={myValue.nome} value={myValue.nome} key={myIndex} />
    );
  });

  return (
    <View style={{ backgroundColor: "white", height: "100%" }}>
      <KeyboardAvoidingView>
        <StatusBar style="auto" />
        <ScrollView>
          <View style={styles.container}>
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
            <Text style={styles.textInput}>Dia da Semana</Text>
            <DropDownPicker
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
            />
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
              {myExercicios}
            </Picker>
            {seeButtonAtualizar()}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      {seeButtonFab()}
    </View>
  );
}
