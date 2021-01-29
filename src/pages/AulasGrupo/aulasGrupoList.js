import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { View, Text, FlatList, BackHandler, ScrollView } from "react-native";
import { FAB } from "react-native-paper";
import * as Animatable from "react-native-animatable";
import ListAulas from "../../components/Lists/ListAulas";

import { database } from "../../constant/database";
import { styles } from "../../constant/styles";
import { storage } from "../../constant/storage";

export default function aulaGrupoList({ navigation }) {
  const uri =
    "http://" + database.ip + ":" + database.port + "/php/getAulas.php";

  const [user, setUser] = useState([]);

  const [aulas, setAulas] = useState([]);

  function loadAulas() {
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
    if (user) {
      loadAulas();
    }
  }, [user]);

  return (
    <View style={styles.containerPadding}>
      <Text style={styles.pageTitle}>Aulas Grupo</Text>
      <StatusBar style="auto" />
      <ScrollView>
        <Animatable.View animation="fadeInUp" useNativeDriver={true}>
          <FlatList
            data={aulas}
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
      </ScrollView>
      <FAB
        style={styles.fab}
        icon="plus"
        onPress={() => navigation.navigate("AddAulaGrupo")}
      />
    </View>
  );
}
