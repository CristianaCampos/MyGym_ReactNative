import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  TextInput,
  StyleSheet,
  View,
  Text,
  BackHandler,
  ScrollView,
  KeyboardAvoidingView,
  Image,
} from "react-native";
import { Button } from "react-native-paper";
import { FAB } from "react-native-paper";
import DropDownPicker from "react-native-dropdown-picker";
import { database } from "../../constant/database";

export default function DetailsAulaGrupo({ route, navigation }) {
  const uri =
    "http://" + database.ip + ":" + database.port + "/php/getDetailsAula.php";

  const uriEdit =
    "http://" + database.ip + ":" + database.port + "/php/editAula.php";

  const uriDelete =
    "http://" + database.ip + ":" + database.port + "/php/deleteAula.php";

  const { aula } = route.params;

  const [userId, setUserId] = useState("");
  const [nome, setNome] = useState("");
  const [diaSemana, setDiaSemana] = useState("");

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

  // async function getAsyncUser() {
  //   try {
  //     let id = await AsyncStorage.getItem("user_id");
  //     id = JSON.parse(id);

  //     if (id != null) {
  //       setUserId(id);
  //     }
  //   } catch (error) {
  //     alert(error);
  //   }
  // }

  // function loadAula() {
  //   fetch(uri, {
  //     method: "POST",
  //     headers: {
  //       Accept: "application/json",
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       userId: userId,
  //       aulaId: id,
  //     }),
  //   })
  //     .then((response) => response.json())
  //     .then((json) => {
  //       if (json.message == "success") {
  //         setNome(json.aula[0].nome);
  //         setDiaSemana(json.aula[0].diaSemana);
  //       }
  //     })
  //     .catch((error) => {
  //       alert(error);
  //     });
  // }

  function getNome() {
    setNome(aula.nome);
  }

  function getDiaSemana() {
    setDiaSemana(aula.diaSemana);
  }

  function getData() {
    getNome();
    getDiaSemana();
  }

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", () => true);
    return () =>
      BackHandler.removeEventListener("hardwareBackPress", () => true);
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", (e) => {
      getData();
    });

    return unsubscribe;
  }, [navigation]);

  function edit() {
    alert("oi");
    // fetch(uriEdit, {
    //   method: "POST",
    //   headers: {
    //     Accept: "application/json",
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     nome: nome,
    //     diaSemana: diaSemana,
    //     userId: JSON.stringify(userId),
    //     aulaId: id,
    //   }),
    // })
    //   .then((response) => response.json())
    //   .then((json) => {
    //     if (json.message == "success") {
    //       alert("Aula atualizada com sucesso!");
    //       desativarVisible();
    //       loadAula();
    //     }
    //   })
    //   .catch((error) => {
    //     alert(error);
    //   });
  }

  return (
    <View style={{ backgroundColor: "white", height: "100%" }}>
      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <StatusBar style="auto" />
        <Text style={styles.pageTitle}>Detalhes Aula Grupo</Text>
        <Image
          style={styles.img}
          source={require("../../../assets/aulaGrupo.jpg")}
        ></Image>
        {visible ? (
          <ScrollView>
            <TextInput
              placeholder="Nome Aula Grupo"
              editable={visible}
              style={styles.input}
              defaultValue={nome}
              onChangeText={(txt) => setNome(txt)}
            ></TextInput>
            <DropDownPicker
              items={[
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
          </ScrollView>
        ) : (
          <View>
            <TextInput
              placeholder="Nome Aula Grupo"
              editable={visible}
              style={styles.inputGrey}
              defaultValue={nome}
              onChangeText={(txt) => setNome(txt)}
            ></TextInput>
            <DropDownPicker
              items={[
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
              containerStyle={{ height: 50, marginTop: "5%" }}
              style={{
                backgroundColor: "#fff",
                borderColor: "#B72727",
              }}
              itemStyle={{
                justifyContent: "flex-start",
                color: "grey",
              }}
              dropDownStyle={{ backgroundColor: "#fff" }}
              onChangeItem={(item) => setDiaSemana(item.value)}
            />
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
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  img: {
    height: "40%",
    alignSelf: "center",
    marginTop: "5%",
    resizeMode: "contain",
  },
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
  input: {
    height: 50,
    marginTop: "5%",
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
    marginTop: "5%",
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
    marginTop: "8%",
    height: 50,
    justifyContent: "center",
  },
  btnTextLogin: {
    fontSize: 20,
    fontFamily: "Poppins_Regular",
  },
});
