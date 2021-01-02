import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, FlatList, BackHandler } from "react-native";
import { Button, Card } from "react-native-paper";
import { FAB } from "react-native-paper";
import { database } from "../../constant/database";

import ListPlano from "../../components/Lists/ListPlanos";

export default function planoTreinoList({ navigation }) {
  const uri =
    "http://" + database.ip + ":" + database.port + "/php/getPlanos.php";

  const [userId, setUserId] = useState("");
  const [planos, setPlanos] = useState([]);

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

  async function loadPlanos() {
    await fetch(uri, {
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
          setPlanos(json.planos);
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
    const unsubscribe = navigation.addListener("focus", (e) => {
      getAsyncUser();
      loadPlanos();
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <View style={{ backgroundColor: "white", height: "100%" }}>
      <View style={styles.container}>
        <Text style={styles.pageTitle}>Planos Treino</Text>
        <StatusBar style="auto" />
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
              navigation={navigation}
            />
          )}
        />
        <FAB
          style={styles.fab}
          icon="plus"
          onPress={() => navigation.navigate("AddPlanoTreino")}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  fab: {
    backgroundColor: "#B72727",
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
  },
  container: {
    flex: 1,
    marginHorizontal: "5%",
  },
  pageTitle: {
    fontSize: 25,
    fontFamily: "Poppins_Bold",
    marginTop: "3%",
    textAlign: "center",
  },
});
