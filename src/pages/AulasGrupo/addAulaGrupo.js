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
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { Picker } from "@react-native-picker/picker";
import { Button } from "react-native-paper";
import { database } from "../../constant/database";
import { styles } from "../../constant/styles";

export default function AddAulaGrupo({ navigation }) {
  const uri =
    "http://" + database.ip + ":" + database.port + "/php/insertAulaGrupo.php";

  const [userId, setUserId] = useState("");
  const [nome, setNome] = useState("");
  const [diaSemana, setDiaSemana] = useState("---");

  async function getAsyncUser() {
    try {
      let id = await AsyncStorage.getItem("user_id");
      id = JSON.parse(id);

      if (id != null) {
        setUserId(id);
      }
    } catch (error) {
      console.log(error);
    }
  }

  function add() {
    if (nome != "" && diaSemana != "---") {
      fetch(uri, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userId,
          nome: nome,
          diaSemana: diaSemana,
        }),
      })
        .then((response) => response.json())
        .then((json) => {
          if (json.message == "success") {
            Alert.alert(
              "Sucesso",
              "Aula registada com sucesso!",
              [{ text: "OK", style: "default" }],
              { cancelable: true }
            );
            navigation.navigate("AulasGrupoList");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      Alert.alert(
        "Erro",
        "Preencha todos os campos!",
        [{ text: "OK", style: "destructive" }],
        { cancelable: true }
      );
    }
  }

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", () => true);
    return () =>
      BackHandler.removeEventListener("hardwareBackPress", () => true);
  }, []);

  useEffect(() => {
    getAsyncUser();
  }, []);

  return (
    <View style={{ backgroundColor: "white", height: "100%" }}>
      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <ScrollView>
          <StatusBar style="auto" />
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
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}
