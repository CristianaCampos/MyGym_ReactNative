import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState, useRef } from "react";
import { StyleSheet, View, Text, FlatList, BackHandler } from "react-native";
import { Button, Card } from "react-native-paper";
import { FAB } from "react-native-paper";
import { database } from "../../constant/database";
import * as Animatable from "react-native-animatable";

import ListPlano from "../../components/Lists/ListPlanos";
import { styles } from "../../constant/styles";
import { storage } from "../../constant/storage";

export default function planoTreinoList({ navigation }) {
  const uri =
    "http://" + database.ip + ":" + database.port + "/php/getPlanos.php";

  const uriExercicios =
    "http://" + database.ip + ":" + database.port + "/php/getExercicios.php";

  const [userId, setUserId] = useState("");
  const [planos, setPlanos] = useState([]);
  const [exercicios, setExercicios] = useState([]);

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

  async function getAsyncExercicios() {
    try {
      let id = await AsyncStorage.getItem(storage.exercicios);
      id = JSON.parse(id);

      if (id != null) {
        setExercicios(id);
      }
    } catch (error) {
      console.log(error);
    }
  }

  function loadPlanos() {
    fetch(uri, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: userId,
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.message == "success") {
          setPlanos(json.planos);
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

  function getData() {
    getAsyncUser();
    getAsyncExercicios();
  }

  let isRendered = useRef(false);

  useEffect(() => {
    isRendered = true;
    const unsubscribe = navigation.addListener("focus", (e) => {
      getData();
    });
    return () => {
      isRendered = false;
      unsubscribe;
    };
  }, []);

  return (
    <View style={{ backgroundColor: "white", height: "100%" }}>
      <View style={styles.container}>
        <Text style={styles.pageTitle}>Planos Treino</Text>
        <StatusBar style="auto" />
        <Animatable.View animation="fadeInUp">
          <FlatList
            data={planos}
            keyExtractor={({ id }, index) => id}
            extraData={loadPlanos()}
            renderItem={({ item }) => (
              <ListPlano
                id={item.id}
                nome={item.nome}
                diaSemana={item.diaSemana}
                plano={item}
                exercicios={exercicios}
                navigation={navigation}
              />
            )}
          />
        </Animatable.View>
        <FAB
          style={styles.fab}
          icon="plus"
          onPress={() => navigation.navigate("AddPlanoTreino", { id: userId })}
        />
      </View>
    </View>
  );
}
