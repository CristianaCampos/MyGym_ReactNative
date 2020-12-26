import React from "react";
import { Image } from "react-native";

// import { Ionicons } from "@expo/vector-icons";

export default function MainTabIcon({ focused, color, route }) {
  switch (route) {
    case "PlanosTreinoList":
      if (focused) {
        return (
          <Image
            source={require("../../../assets/menu/planostreino/iconPlanosTreinoSelected.png")}
            resizeMode="contain"
            style={{ height: 30 }}
          />
        );
      } else {
        return (
          <Image
            source={require("../../../assets/menu/planostreino/iconPlanosTreino.png")}
            resizeMode="contain"
            style={{ height: 30 }}
          />
        );
      }
      // iconName = `${focused ? "ios-list" : "ios-list"}`;
      // iconSize = 22;
      break;
    case "ExerciciosList":
      if (focused) {
        return (
          <Image
            source={require("../../../assets/menu/exercicios/iconExerciciosSelected.png")}
            resizeMode="contain"
            style={{ height: 30 }}
          />
        );
      } else {
        return (
          <Image
            source={require("../../../assets/menu/exercicios/iconExercicios.png")}
            resizeMode="contain"
            style={{ height: 30 }}
          />
        );
      }
      // iconName = `${focused ? "ios-list" : "ios-list"}`;
      // iconSize = 22;
      break;
    case "AulasGrupoList":
      if (focused) {
        return (
          <Image
            source={require("../../../assets/menu/aulasgrupo/iconAulasGrupoSelected.png")}
            resizeMode="contain"
            style={{ height: 30 }}
          />
        );
      } else {
        return (
          <Image
            source={require("../../../assets/menu/aulasgrupo/iconAulasGrupo.png")}
            resizeMode="contain"
            style={{ height: 35 }}
          />
        );
      }
      // iconName = `${focused ? "ios-list" : "ios-list"}`;
      // iconSize = 22;
      break;
    case "AccountConfig":
      if (focused) {
        return (
          <Image
            source={require("../../../assets/menu/definicoes/iconDefinicoesSelected.png")}
            resizeMode="contain"
            style={{ height: 30 }}
          />
        );
      } else {
        return (
          <Image
            source={require("../../../assets/menu/definicoes/iconDefinicoes.png")}
            resizeMode="contain"
            style={{ height: 30 }}
          />
        );
      }
      // iconName = `${focused ? "ios-list" : "ios-list"}`;
      // iconSize = 22;
      break;
    default:
      iconName = "alert-octagram";
      iconSize = 25;
      break;
  }

  // return <Ionicons name={iconName} color={color} size={iconSize} />;
}
