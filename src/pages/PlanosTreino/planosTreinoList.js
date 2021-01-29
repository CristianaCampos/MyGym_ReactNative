import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { View, Text, FlatList, BackHandler } from "react-native";
import { FAB } from "react-native-paper";
import { database } from "../../constant/database";
import * as Animatable from "react-native-animatable";

import ListPlano from "../../components/Lists/ListPlanos";
import { styles } from "../../constant/styles";
import { storage } from "../../constant/storage";

export default function planoTreinoList({ navigation }) {
  const uri =
    "http://" + database.ip + ":" + database.port + "/php/getPlanos.php";

  const [user, setUser] = useState([]);
  const [planos, setPlanos] = useState([]);
  const [exercicios, setExercicios] = useState([]);

  function loadPlanos() {
    fetch(uri, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: user.id,
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

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      async function getUser() {
        try {
          let value = await AsyncStorage.getItem(storage.user);
          value = JSON.parse(value);

          if (value != null) {
            setUser(value);
          }
        } catch (error) {
          console.log(error);
        }
      }

      getUser().then();
    });

    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      async function getExercicios() {
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
      getExercicios().then();
    });

    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    if (user && exercicios) {
      loadPlanos();
    }
  }, [user, exercicios]);

  return (
    <View style={{ backgroundColor: "white", height: "100%" }}>
      <View style={styles.containerPadding}>
        <Text style={styles.pageTitle}>Planos Treino</Text>
        <StatusBar style="auto" />
        <Animatable.View animation="fadeInUp" useNativeDriver={true}>
          <FlatList
            data={planos}
            keyExtractor={({ id }, index) => id}
            renderItem={({ item }) => (
              <ListPlano
                id={item.id}
                nome={item.nome}
                diaSemana={item.diaSemana}
                plano={item}
                // exercicios={exercicios}
                navigation={navigation}
              />
            )}
          />
        </Animatable.View>
        <FAB
          style={styles.fab}
          icon="plus"
          onPress={() => navigation.navigate("AddPlanoTreino", { id: user.id })}
        />
      </View>
    </View>
  );
}
