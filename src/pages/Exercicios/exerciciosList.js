import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { View, Text, FlatList, BackHandler } from "react-native";
import { FAB } from "react-native-paper";
import * as Animatable from "react-native-animatable";
import { Entypo } from "@expo/vector-icons";

import ListExercicios from "../../components/Lists/ListExercicios";

import { database } from "../../constant/database";
import { styles } from "../../constant/styles";
import { colors } from "../../constant/colors";
import { storage } from "../../constant/storage";

export default function exercicioList({ navigation }) {
  const uri =
    "http://" +
    database.ip +
    ":" +
    database.port +
    "/Backend_MyGym/php/getExercicios.php";

  const [user, setUser] = useState([]);

  const [exercises, setExercises] = useState([]);

  const [seeExercicios, setSeeExercicios] = useState(false);

  function seeExerciciosList() {
    if (seeExercicios) {
      return (
        <Animatable.View
          style={{ marginBottom: 55 }}
          animation="bounceInUp"
          useNativeDriver={true}
        >
          <Text style={styles.pageTitle}>Exercícios</Text>
          <FlatList
            data={exercises}
            keyExtractor={({ id }, index) => id}
            renderItem={({ item }) => (
              <ListExercicios
                id={item.id}
                nome={item.nome}
                zonaMuscular={item.zonaMuscular}
                exercicio={item}
                user={user}
                navigation={navigation}
              />
            )}
          />
        </Animatable.View>
      );
    } else {
      return (
        <Animatable.View
          style={{ marginBottom: 55 }}
          animation="bounceInUp"
          useNativeDriver={true}
        >
          <Entypo
            name="emoji-sad"
            size={80}
            color={colors.textBlack}
            style={{ textAlign: "center", marginTop: "35%" }}
          />
          <Text
            style={{
              textAlign: "center",
              marginTop: "5%",
              fontFamily: "Poppins_Bold",
              fontSize: 30,
              color: colors.textBlack,
            }}
          >
            Não tem Exercícios registados.
          </Text>
        </Animatable.View>
      );
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
        userId: user.id,
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.message == "success") {
          setExercises(json.exercises);
          setSeeExercicios(true);
        } else {
          setExercises([]);
          setSeeExercicios(false);
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
      loadExercises();
    }
  }, [user]);

  return (
    <View style={styles.containerPadding}>
      <StatusBar style="auto" />
      {seeExerciciosList()}
      <FAB
        style={styles.fab}
        icon="plus"
        onPress={() => navigation.navigate("AddExercicio")}
      />
    </View>
  );
}
