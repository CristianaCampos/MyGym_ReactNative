import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  TextInput,
  StyleSheet,
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  BackHandler,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { Button } from "react-native-paper";
import { database } from "../../constant/database";

function AddAulaGrupo({ navigation }) {
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
      alert(error);
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
            alert("Aula registada com sucesso!");
            navigation.navigate("AulasGrupoList");
          }
        })
        .catch((error) => {
          alert(error);
        });
    } else {
      alert("Preencha todos os campos!");
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
          <TextInput
            placeholder="Nome Aula"
            style={styles.input}
            onChangeText={(text) => setNome(text)}
          ></TextInput>
          <DropDownPicker
            items={[
              {
                label: "---",
                value: "---",
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
                value: "saSábadob",
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
          <Button
            mode="contained"
            style={styles.btnLogin}
            onPress={() => add()}
          >
            <Text style={styles.btnTextLogin}>Criar Aula Grupo</Text>
          </Button>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    marginHorizontal: 20,
    justifyContent: "center",
  },
  container: {
    height: "100%",
    marginHorizontal: "5%",
  },
  pageTitle: {
    fontSize: 25,
    fontFamily: "Poppins_Bold",
    marginTop: "3%",
    marginLeft: "5%",
    textAlign: "center",
  },
  input: {
    marginTop: "5%",
    height: 50,
    flexDirection: "row",
    alignSelf: "center",
    width: "100%",
    borderWidth: 1,
    marginTop: "5%",
    paddingHorizontal: 10,
    borderColor: "#B72727",
    borderRadius: 7,
    fontSize: 15,
    fontFamily: "Poppins_Regular",
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
export default AddAulaGrupo;
