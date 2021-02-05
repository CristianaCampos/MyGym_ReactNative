import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { View, Text, FlatList, BackHandler } from "react-native";
import { FAB } from "react-native-paper";
import { database } from "../../constant/database";
import * as Animatable from "react-native-animatable";
import { Entypo } from "@expo/vector-icons";

import ListPlano from "../../components/Lists/ListPlanos";
import { styles } from "../../constant/styles";
import { colors } from "../../constant/colors";
import { storage } from "../../constant/storage";

export default function planoTreinoList({ route, navigation }) {
  const uri =
    "http://" +
    database.ip +
    ":" +
    database.port +
    "/Backend_MyGym/php/getPlanos.php";
  const uriExercicios =
    "http://" +
    database.ip +
    ":" +
    database.port +
    "/Backend_MyGym/php/getExercicios.php";
  const uriAulas =
    "http://" +
    database.ip +
    ":" +
    database.port +
    "/Backend_MyGym/php/getAulas.php";

  const [planos, setPlanos] = useState([]);
  const [exercicios, setExercicios] = useState([]);
  const [aulas, setAulas] = useState([]);

  const { user } = route.params;

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
        } else {
          setPlanos([]);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function getExercicios() {
    fetch(uriExercicios, {
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
          setExercicios(json.exercises);
        } else {
          setExercicios([]);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
  function getAulas() {
    fetch(uriAulas, {
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
        } else {
          setAulas([]);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function seePlanosList() {
    if (planos.length > 0) {
      return (
        <Animatable.View
          style={{ marginBottom: 55 }}
          animation="bounceInUp"
          useNativeDriver={true}
        >
          <Text style={styles.pageTitle}>Planos de Treino</Text>
          <FlatList
            data={planos}
            keyExtractor={({ id }, index) => id}
            renderItem={({ item }) => (
              <ListPlano
                id={item.id}
                nome={item.nome}
                diaSemana={item.diaSemana}
                plano={item}
                exercicios={exercicios}
                aulas={aulas}
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
            Não tem Planos de Treino registados.
          </Text>
        </Animatable.View>
      );
    }
  }

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", () => true);
    return () =>
      BackHandler.removeEventListener("hardwareBackPress", () => true);
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      loadPlanos();
      getExercicios();
      getAulas();
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <View style={{ backgroundColor: "white", height: "100%" }}>
      <View style={styles.containerPadding}>
        <StatusBar style="auto" />
        {seePlanosList()}
        <FAB
          style={styles.fab}
          icon="plus"
          onPress={() => {
            navigation.navigate("AddPlanoTreino", {
              user: user,
              exercicios: exercicios,
              aulas: aulas,
            });
          }}
        />
      </View>
    </View>
  );
}
