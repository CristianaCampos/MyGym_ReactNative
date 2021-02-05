import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { View, Text, FlatList, BackHandler } from "react-native";
import { FAB } from "react-native-paper";
import * as Animatable from "react-native-animatable";
import { Entypo } from "@expo/vector-icons";
import ListAulas from "../../components/Lists/ListAulas";

import { database } from "../../constant/database";
import { styles } from "../../constant/styles";
import { colors } from "../../constant/colors";
import { storage } from "../../constant/storage";

export default function aulaGrupoList({ navigation }) {
  const uri =
    "http://" +
    database.ip +
    ":" +
    database.port +
    "/Backend_MyGym/php/getAulas.php";

  const [user, setUser] = useState([]);

  const [aulas, setAulas] = useState([]);

  const [seeAulas, setSeeAulas] = useState(false);

  function seeAulasList() {
    if (seeAulas) {
      return (
        <Animatable.View
          style={{ marginBottom: 55 }}
          animation="bounceInUp"
          useNativeDriver={true}
        >
          <Text style={styles.pageTitle}>Aulas de Grupo</Text>
          <FlatList
            data={aulas}
            keyExtractor={({ id }, index) => id}
            renderItem={({ item }) => (
              <ListAulas
                id={item.id}
                nome={item.nome}
                diaSemana={item.diaSemana}
                aula={item}
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
            Não tem Aulas de Grupo registadas.
          </Text>
        </Animatable.View>
      );
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
        userId: user.id,
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.message == "success") {
          setAulas(json.aulas);
          setSeeAulas(true);
        } else {
          setAulas([]);
          setSeeAulas(false);
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
      <StatusBar style="auto" />
      {seeAulasList()}
      <FAB
        style={styles.fab}
        icon="plus"
        onPress={() => navigation.navigate("AddAulaGrupo")}
      />
    </View>
  );
}
