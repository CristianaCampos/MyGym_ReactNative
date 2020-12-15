import { StatusBar } from "expo-status-bar";
import React from "react";
import { Image, StyleSheet, View, Text, TextInput } from "react-native";
import { Button } from "react-native-paper";

export default function AccountConfig({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.pageTitle}>Definições da Conta</Text>
      <Image
        source={require("../../../assets/iconPerfil.png")}
        style={styles.imgPerfil}
      />
      <Text style={styles.meunome}>meunome</Text>
      <Text style={styles.meunome}>nomeutilizador</Text>
      <View style={styles.input}>
        <TextInput placeholder="meunome" style={styles.inputText}></TextInput>
      </View>
      <View style={styles.input}>
        <TextInput placeholder="email" style={styles.inputText}></TextInput>
      </View>
      <View style={styles.input}>
        <TextInput placeholder="contacto" style={styles.inputText}></TextInput>
      </View>
      <View style={styles.input}>
        <TextInput placeholder="*****" style={styles.inputText}></TextInput>
      </View>
      <Button
        mode="contained"
        // onPress={() => navigation.navigate("Main")}
        style={styles.btnLogin}
      >
        <Text style={styles.btnTextLogin}>Atualizar Dados</Text>
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
  imgPerfil: {
    height: "15%",
    alignSelf: "center",
    marginTop: "5%",
    resizeMode: "contain",
  },
  meunome: {
    fontFamily: "Poppins_Regular",
    fontSize: 15,
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
});
