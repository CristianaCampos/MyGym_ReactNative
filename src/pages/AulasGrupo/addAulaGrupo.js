import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  TextInput,
  StyleSheet,
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { Button } from "react-native-paper";
import { database } from "../../constant/database";

export default function AddAulaGrupo({ props, navigation }) {
  const uri =
    "http://" + database.ip + ":" + database.port + "/php/insertAulaGrupo.php";

  const [nome, setNome] = useState("");
  const [diaSemana, setDiaSemana] = useState("");

  const [dia, setDia] = useState("seg");

  const add = async () => {
    try {
      const resp = await fetch(uri, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nome, diaSemana }),
      });
      const json = await resp.json();
      switch (json) {
        case "register_success":
          props.navigation.navigate("AulasGrupoList");
          break;
        case "server_error":
          alert("Server error");
          break;
        case "bd_error":
          alert("Aula já registada");
          break;
      }
    } catch (e) {
      alert("erro on login..." + e.message);
    }
  };
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
                label: "Segunda-Feira",
                value: "seg",
              },
              {
                label: "Terça-Feira",
                value: "ter",
              },
              {
                label: "Quarta-Feira",
                value: "qua",
              },
              {
                label: "Quinta-Feira",
                value: "qui",
              },
              {
                label: "Sexta-Feira",
                value: "sex",
              },
              {
                label: "Sábado",
                value: "sab",
              },
              {
                label: "Domingo",
                value: "dom",
              },
            ]}
            defaultValue={dia}
            containerStyle={{ height: 40, marginTop: "5%" }}
            style={{
              backgroundColor: "#fff",
              borderColor: "#B72727",
            }}
            itemStyle={{
              justifyContent: "flex-start",
            }}
            dropDownStyle={{ backgroundColor: "#fff" }}
            onChangeItem={(item) => setDia(item.value)}
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
