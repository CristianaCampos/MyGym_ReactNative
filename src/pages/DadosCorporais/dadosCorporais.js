import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  View,
  Image,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  Text,
  TextInput,
  BackHandler,
  FlatList,
} from "react-native";
import { Button } from "react-native-paper";
import { FAB } from "react-native-paper";
import { database } from "../../constant/database";

export default function dadosCorporais({ navigation }) {
  const uri =
    "http://" +
    database.ip +
    ":" +
    database.port +
    "/php/getDadosCorporais.php";

  const uriEdit =
    "http://" +
    database.ip +
    ":" +
    database.port +
    "/php/editDadosCorporais.php";

  const [userId, setUserId] = useState("");

  const [peso, setPeso] = useState("");
  const [altura, setAltura] = useState("");
  const [massaMagra, setMassaMagra] = useState("");
  const [massaGorda, setMassaGorda] = useState("");
  const [massaHidrica, setMassaHidrica] = useState("");

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

  function loadDados() {
    fetch(uri, {
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
          setPeso(json.dadosCorporais[0].peso);
          setAltura(json.dadosCorporais[0].altura);
          setMassaMagra(json.dadosCorporais[0].massaMagra);
          setMassaGorda(json.dadosCorporais[0].massaGorda);
          setMassaHidrica(json.dadosCorporais[0].massaHidrica);
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
    loadDados();
  }, []);

  function edit() {
    fetch(uriEdit, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        peso: peso,
        altura: altura,
        massaMagra: massaMagra,
        massaGorda: massaGorda,
        massaHidrica: massaHidrica,
        userId: JSON.stringify(userId),
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.message == "success") {
          alert("Dados atualizados com sucesso!");
          desativarVisible();
          loadDados();
        }
      })
      .catch((error) => {
        alert(error);
      });
  }

  return (
    <View style={{ backgroundColor: "white", height: "100%" }}>
      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <ScrollView>
          <StatusBar style="auto" />
          <Text style={styles.pageTitle}>Dados Corporais</Text>
          <Image
            source={require("../../../assets/iconPerfil.png")}
            style={styles.imgPerfil}
          />
          {visible ? (
            <View>
              <Text style={styles.textInput}>Peso</Text>
              <TextInput
                defaultValue={peso}
                style={styles.input}
                onChangeText={(txt) => setPeso(txt)}
              ></TextInput>
              <Text style={styles.textInput}>Altura</Text>
              <TextInput
                defaultValue={altura}
                style={styles.input}
                onChangeText={(txt) => setAltura(txt)}
              ></TextInput>
              <Text style={styles.textInput}>Massa Magra</Text>
              <TextInput
                defaultValue={massaMagra}
                style={styles.input}
                onChangeText={(txt) => setMassaMagra(txt)}
              ></TextInput>
              <Text style={styles.textInput}>Massa Gorda</Text>
              <TextInput
                defaultValue={massaGorda}
                style={styles.input}
                onChangeText={(txt) => setMassaGorda(txt)}
              ></TextInput>
              <Text style={styles.textInput}>Massa Hidrica</Text>
              <TextInput
                defaultValue={massaHidrica}
                style={styles.input}
                onChangeText={(txt) => setMassaHidrica(txt)}
              ></TextInput>
            </View>
          ) : (
            <View>
              <Text style={styles.textInput}>Peso</Text>
              <TextInput
                defaultValue={peso}
                style={styles.inputGrey}
                onChangeText={(txt) => setPeso(txt)}
              ></TextInput>
              <Text style={styles.textInput}>Altura</Text>
              <TextInput
                defaultValue={altura}
                style={styles.inputGrey}
                onChangeText={(txt) => setAltura(txt)}
              ></TextInput>
              <Text style={styles.textInput}>Massa Magra</Text>
              <TextInput
                defaultValue={massaMagra}
                style={styles.inputGrey}
                onChangeText={(txt) => setMassaMagra(txt)}
              ></TextInput>
              <Text style={styles.textInput}>Massa Gorda</Text>
              <TextInput
                defaultValue={massaGorda}
                style={styles.inputGrey}
                onChangeText={(txt) => setMassaGorda(txt)}
              ></TextInput>
              <Text style={styles.textInput}>Massa Hidrica</Text>
              <TextInput
                defaultValue={massaHidrica}
                style={styles.inputGrey}
                onChangeText={(txt) => setMassaHidrica(txt)}
              ></TextInput>
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
  textInput: {
    fontFamily: "Poppins_Regular",
    fontSize: 15,
    marginTop: "5%",
  },
  input: {
    height: 50,
    marginTop: "2%",
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
    marginTop: "2%",
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
    marginTop: "5%",
    height: 50,
    justifyContent: "center",
    marginHorizontal: "5%",
  },
  btnTextLogin: {
    fontSize: 20,
    fontFamily: "Poppins_Regular",
  },
});
