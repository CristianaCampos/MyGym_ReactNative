import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { TextInput, StyleSheet, View, Text } from "react-native";
import { Button } from "react-native-paper";

function AddExercicio(props, navigation) {
  const uri = "http://192.168.1.75:80/php/insertExercicio.php";

  const [nome, setNome] = useState("");
  const [zonaMuscular, setzonaMuscular] = useState("");

  const add = async () => {
    try {
      const resp = await fetch(uri, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nome, zonaMuscular }),
      });
      const json = await resp.json();
      switch (json) {
        case "register_success":
          props.navigation.navigate("ExerciciosList");
          break;
        case "server_error":
          alert("Server error");
          break;
      }
    } catch (e) {
      alert("erro on login...", e.message);
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.pageTitle}>Criar Exercício</Text>

      <View style={styles.input}>
        <TextInput
          placeholder="Nome Exercício"
          style={styles.inputText}
          onChangeText={(text) => setNome(text)}
        ></TextInput>
      </View>
      <View style={styles.input}>
        <TextInput
          placeholder="Zona Muscular"
          style={styles.inputText}
          onChangeText={(text) => setzonaMuscular(text)}
        ></TextInput>
      </View>
      <Button
        mode="contained"
        onPress={() => add()}
        // onPress={() => navigation.navigate("Main")}
        style={styles.btnLogin}
      >
        <Text style={styles.btnTextLogin}>Criar Exercício</Text>
      </Button>
      <Button
        mode="contained"
        // onPress={() => navigation.navigate("Main")}
        style={styles.btnCancelar}
      >
        <Text style={styles.btnTextCancelar}>Cancelar</Text>
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
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
    height: "7%",
    flexDirection: "row",
    alignSelf: "center",
    width: "100%",
    borderWidth: 2,
    marginTop: "5%",
    paddingHorizontal: 10,
    borderColor: "#B72727",
    borderRadius: 7,
  },
  inputText: {
    fontSize: 15,
    fontFamily: "Poppins_Regular",
  },
  btnLogin: {
    backgroundColor: "#B72727",
    marginTop: "8%",
    height: "7%",
  },
  btnTextLogin: {
    fontSize: 20,
    fontFamily: "Poppins_Regular",
  },
  btnCancelar: {
    backgroundColor: "#F3EFEF",
    borderWidth: 1,
    borderColor: "black",
    marginTop: "4%",
    height: "7%",
  },
  btnTextCancelar: {
    color: "black",
    fontSize: 20,
    fontFamily: "Poppins_Regular",
  },
});
export default AddExercicio;
