import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { TextInput, StyleSheet, View, Text, Picker } from "react-native";
import { Button } from "react-native-paper";

export default function AddAulaGrupo({ navigation }) {
  const [selectedValue, setSelectedValue] = useState("java");
  return (
    <View style={styles.container}>
      <Text style={styles.pageTitle}>Criar Aula Grupo</Text>
      <View style={styles.input}>
        <TextInput placeholder="Nome Aula" style={styles.inputText}></TextInput>
      </View>
      <View style={styles.input}>
        {/* <TextInput
          placeholder="Dia Semana"
          style={styles.inputText}
        ></TextInput> */}
        <Picker
          selectedValue={selectedValue}
          style={{ height: 50, width: 150 }}
          onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
        >
          <Picker.Item label="Java" value="java" />
          <Picker.Item label="JavaScript" value="js" />
        </Picker>
      </View>
      <View style={styles.input}>
        <TextInput placeholder="Duração" style={styles.inputText}></TextInput>
      </View>
      <Button
        mode="contained"
        // onPress={() => navigation.navigate("Main")}
        style={styles.btnLogin}
      >
        <Text style={styles.btnTextLogin}>Criar Aula Grupo</Text>
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
