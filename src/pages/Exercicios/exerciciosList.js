import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, FlatList, BackHandler } from "react-native";
import { Button, Card } from "react-native-paper";
import { FAB } from "react-native-paper";
import * as Animatable from "react-native-animatable";

import ListExercicios from "../../components/Lists/ListExercicios";

import { database } from "../../constant/database";
import { styles } from "../../constant/styles";

export default function exercicioList({ navigation }) {
  const uri =
    "http://" + database.ip + ":" + database.port + "/php/getExercicios.php";

  const [userId, setUserId] = useState("");
  const [exercises, setExercises] = useState([]);

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

  function loadExercises() {
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
          setExercises(json.exercises);
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
      loadExercises();
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <View style={{ backgroundColor: "white", height: "100%" }}>
      <View style={styles.container}>
        <Text style={styles.pageTitle}>Exercícios</Text>
        <StatusBar style="auto" />
        <Animatable.View animation="fadeInUp" useNativeDriver>
          <FlatList
            data={exercises}
            extraData={loadExercises()}
            keyExtractor={({ id }, index) => id}
            renderItem={({ item }) => (
              <ListExercicios
                id={item.id}
                nome={item.nome}
                zonaMuscular={item.zonaMuscular}
                exercicio={item}
                navigation={navigation}
              />
            )}
          />
        </Animatable.View>
        <FAB
          style={styles.fab}
          icon="plus"
          onPress={() => navigation.navigate("AddExercicio")}
        />
      </View>
    </View>
  );
}
