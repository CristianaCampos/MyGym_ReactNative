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
} from "react-native";
import { Button } from "react-native-paper";
import { FAB } from "react-native-paper";
import { database } from "../../constant/database";

export default function AccountConfig({ navigation }) {
  const uri =
    "http://" + database.ip + ":" + database.port + "/php/getDadosConta.php";

  const uriEdit =
    "http://" + database.ip + ":" + database.port + "/php/editDadosConta.php";

  const [userId, setUserId] = useState("");

  const [nome, setNome] = useState("");
  const [nomeUtilizador, setNomeUtilizador] = useState("");
  const [contacto, setContacto] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const [dadosConta, setDadosConta] = useState([]);

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
      alert(error.message);
    }
  }

  function loadDados() {
    try {
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
            setNome(json.dadosConta[0].nome);
            setNomeUtilizador(json.dadosConta[0].nomeUtilizador);
            setEmail(json.dadosConta[0].email);
            setContacto(json.dadosConta[0].contacto);
            setPass(json.dadosConta[0].pass);
            setDadosConta(json.dadosConta);
            console.log(dadosConta);
          }
        })
        .catch((error) => {
          alert(error.message);
        });
    } catch (error) {
      alert(error.message);
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
        nome: nome,
        email: email,
        contacto: contacto,
        pass: pass,
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
          <Text style={styles.pageTitle}>Definições da Conta</Text>
          <Image
            source={require("../../../assets/iconPerfil.png")}
            style={styles.imgPerfil}
          />
          <Text style={styles.meunome}>{nome}</Text>
          <Text style={styles.meunome}>@{nomeUtilizador}</Text>
          {visible ? (
            <View>
              <Text style={styles.textInput}>Nome</Text>
              <TextInput
                defaultValue={nome}
                editable={visible}
                style={styles.input}
                onChangeText={(txt) => setNome(txt)}
              ></TextInput>
              <Text style={styles.textInput}>Email</Text>
              <TextInput
                defaultValue={email}
                editable={visible}
                style={styles.input}
                onChangeText={(txt) => setEmail(txt)}
              ></TextInput>
              <Text style={styles.textInput}>Contacto</Text>
              <TextInput
                defaultValue={contacto}
                editable={visible}
                style={styles.input}
                onChangeText={(txt) => setContacto(txt)}
              ></TextInput>
              <Text style={styles.textInput}>Password</Text>
              <TextInput
                defaultValue={pass}
                editable={visible}
                style={styles.input}
                onChangeText={(txt) => setPass(txt)}
              ></TextInput>
            </View>
          ) : (
            <View>
              <Text style={styles.textInput}>Nome</Text>
              <TextInput
                defaultValue={nome}
                editable={visible}
                style={styles.inputGrey}
                onChangeText={(txt) => setNome(txt)}
              ></TextInput>
              <Text style={styles.textInput}>Email</Text>
              <TextInput
                defaultValue={email}
                editable={visible}
                style={styles.inputGrey}
                onChangeText={(txt) => setEmail(txt)}
              ></TextInput>
              <Text style={styles.textInput}>Contacto</Text>
              <TextInput
                defaultValue={contacto}
                editable={visible}
                style={styles.inputGrey}
                onChangeText={(txt) => setContacto(txt)}
              ></TextInput>
              <Text style={styles.textInput}>Password</Text>
              <TextInput
                defaultValue={pass}
                editable={visible}
                style={styles.inputGrey}
                onChangeText={(txt) => setPass(txt)}
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
    flex: 1,
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
  textInput: {
    fontFamily: "Poppins_Regular",
    fontSize: 15,
    marginTop: "5%",
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
  },
  btnTextLogin: {
    fontSize: 20,
    fontFamily: "Poppins_Regular",
  },
});
