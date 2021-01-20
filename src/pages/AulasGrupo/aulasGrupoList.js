import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { View, Text, FlatList, BackHandler } from "react-native";
import { FAB } from "react-native-paper";
import { database } from "../../constant/database";
import * as Animatable from "react-native-animatable";

import ListAulas from "../../components/Lists/ListAulas";
import { styles } from "../../constant/styles";

export default function aulaGrupoList({ navigation }) {
  const uri =
    "http://" + database.ip + ":" + database.port + "/php/getAulas.php";

  const [userId, setUserId] = useState("");
  const [aulas, setAulas] = useState([]);

  async function getAsyncUser() {
    try {
      let id = await AsyncStorage.getItem("user_id");
      id = JSON.parse(id);

      if (id != null) {
        setUserId(id);
      }
    } catch (error) {
      console.log(error);
    }
  }

  function loadAulas() {
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
          setAulas(json.aulas);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", () => true);
    return () =>
      BackHandler.removeEventListener("hardwareBackPress", () => true);
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", (e) => {
      getAsyncUser();
      loadAulas();
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <View style={{ backgroundColor: "white", height: "100%" }}>
      <View style={styles.container}>
        <Text style={styles.pageTitle}>Aulas Grupo</Text>
        <StatusBar style="auto" />
        <Animatable.View animation="fadeInUp">
          <FlatList
            data={aulas}
            extraData={loadAulas()}
            keyExtractor={({ id }, index) => id}
            renderItem={({ item }) => (
              <ListAulas
                id={item.id}
                nome={item.nome}
                diaSemana={item.diaSemana}
                aula={item}
                navigation={navigation}
              />
            )}
          />
        </Animatable.View>
        <FAB
          style={styles.fab}
          icon="plus"
          onPress={() => navigation.navigate("AddAulaGrupo")}
        />
      </View>
    </View>
  );
}
