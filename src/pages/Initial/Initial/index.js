import { StatusBar } from "expo-status-bar";
import React from "react";
import { Image, View, Text } from "react-native";
import { Button } from "react-native-paper";
import { styles } from "../../../constant/styles";

export default function Initial({ navigation }) {
  return (
    <View style={{ backgroundColor: "white", height: "100%" }}>
      <View style={styles.container}>
        <StatusBar style="auto" />
        <Image
          style={styles.imgInitial}
          source={require("../../../../assets/logo.png")}
        ></Image>
        <Button
          mode="contained"
          onPress={() => navigation.navigate("Login")}
          style={styles.btnInitial}
        >
          <Text style={styles.mainBtnText}>Iniciar Sessão</Text>
        </Button>
        <Button
          mode="contained"
          onPress={() => navigation.navigate("Register")}
          style={styles.btnInitial}
        >
          <Text style={styles.mainBtnText}>Criar Conta</Text>
        </Button>
      </View>
    </View>
  );
}
