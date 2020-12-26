import { StatusBar } from "expo-status-bar";
import React from "react";
import { Image, StyleSheet, View, Text } from "react-native";
import { Button } from "react-native-paper";

export default function Initial({ navigation }) {
  return (
    <View style={{ backgroundColor: "white", height: "100%" }}>
      <View style={styles.container}>
        <StatusBar style="auto" />
        <Image
          style={styles.img}
          source={require("../../../../assets/logo.png")}
        ></Image>
        <Button
          mode="contained"
          onPress={() => navigation.navigate("Login")}
          style={styles.btn}
        >
          <Text style={styles.btnText}>Iniciar Sessão</Text>
        </Button>
        <Button
          mode="contained"
          onPress={() => navigation.navigate("Register")}
          style={styles.btn}
        >
          <Text style={styles.btnText}>Criar Conta</Text>
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    marginHorizontal: "5%",
  },
  img: {
    height: "40%",
    alignSelf: "center",
    marginTop: "20%",
    resizeMode: "contain",
  },
  btn: {
    backgroundColor: "#B72727",
    marginTop: "5%",
    height: 50,
    justifyContent: "center",
  },
  btnText: {
    fontSize: 20,
    fontFamily: "Poppins_Regular",
  },
});
