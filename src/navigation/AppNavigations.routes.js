import React, { useEffect } from "react";
import { Image, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import IconsFA from "react-native-vector-icons/FontAwesome";

import {
  getFocusedRouteNameFromRoute,
  NavigationContainer,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import TabBarIcon from "../components/BottomTabBarIcon";

import InitialPage from "../pages/Initial/Initial";
import Login from "../pages/Initial/Login";
import Register from "../pages/Initial/Register";

import PlanosTreinoList from "../pages/PlanosTreino/planosTreinoList";
import ExerciciosList from "../pages/Exercicios/exerciciosList";
import AulasGrupoList from "../pages/AulasGrupo/aulasGrupoList";
import AccountConfig from "../pages/DefinicoesConta/definicoesConta";

import DadosCorporaisConfig from "../pages/DadosCorporais/dadosCorporais";

import PlanoTreinoDetails from "../pages/PlanosTreino/detailsPlanoTreino";
import ExercicioDetails from "../pages/Exercicios/detailsExercicio";
import AulaGrupoDetails from "../pages/AulasGrupo/detailsAulaGrupo";

import AddPlanoTreino from "../pages/PlanosTreino/addPlanoTreino";
import AddExercicio from "../pages/Exercicios/addExercicio";
import AddAulaGrupo from "../pages/AulasGrupo/addAulaGrupo";

import { Button } from "react-native-paper";
import Icon from "react-native-vector-icons/FontAwesome";
import { useState } from "react/cjs/react.development";
import { database } from "../constant/database";
import AppTitles from "./AppTitles";

const PlanosTreinoListStack = createStackNavigator();
const ExerciciosListStack = createStackNavigator();
const AulasGrupoListStack = createStackNavigator();
const AccountConfigStack = createStackNavigator();

const BottomTab = createBottomTabNavigator();
const RootStack = createStackNavigator();

function PlanosTreinoListStackScreen() {
  return (
    <PlanosTreinoListStack.Navigator>
      <PlanosTreinoListStack.Screen
        name="PlanosTreino"
        component={PlanosTreinoList}
      />
    </PlanosTreinoListStack.Navigator>
  );
}

function ExerciciosListStackScreen() {
  return (
    <ExerciciosListStack.Navigator>
      <ExerciciosListStack.Screen
        name="Exercicios"
        component={ExerciciosList}
      />
    </ExerciciosListStack.Navigator>
  );
}
function AulasGrupoListStackScreen() {
  return (
    <AulasGrupoListStack.Navigator>
      <AulasGrupoListStack.Screen
        name="AulasGrupo"
        component={AulasGrupoList}
      />
    </AulasGrupoListStack.Navigator>
  );
}
function AccountConfigStackScreen() {
  return (
    <AccountConfigStack.Navigator>
      <AccountConfigStack.Screen
        name="AccountConfig"
        component={AccountConfig}
      />
    </AccountConfigStack.Navigator>
  );
}

function Tabs() {
  return (
    <BottomTab.Navigator
      tabBarOptions={{
        tintColor: "#B72727",
        activeTintColor: "#B72727",
        inactiveTintColor: "#B72727",
        labelStyle: {
          fontSize: 13,
          fontFamily: "Poppins_Regular",
        },
        style: {
          height: 80,
          paddingBottom: 10,
          paddingTop: 10,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "white",
          borderTopColor: "#B72727",
          overflow: "hidden",
          elevation: 0,
          shadowOpacity: 0,
        },
      }}
      screenOptions={({ route }) => ({
        tabBarIcon: (props) => <TabBarIcon {...props} route={route.name} />,
      })}
    >
      <BottomTab.Screen
        name="PlanosTreinoList"
        component={PlanosTreinoListStackScreen}
        options={{
          title: "Planos Treino",
        }}
      />
      <BottomTab.Screen
        name="ExerciciosList"
        component={ExerciciosListStackScreen}
        options={{
          title: "Exercícios",
        }}
      />
      <BottomTab.Screen
        name="AulasGrupoList"
        component={AulasGrupoListStackScreen}
        options={{
          title: "Aulas Grupo",
        }}
      />
      <BottomTab.Screen
        name="AccountConfig"
        component={AccountConfigStackScreen}
        options={{
          title: "Definições",
        }}
      />
    </BottomTab.Navigator>
  );
}

async function clearUserId() {
  try {
    await AsyncStorage.clear();
  } catch (error) {
    console.log(error);
  }
}

export default function AppNavigations() {
  const [username, setUsername] = useState("");
  const [userId, setUserId] = useState("");

  const uri =
    "http://" + database.ip + ":" + database.port + "/php/getUsername.php";

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

  function getUsername() {
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
          setUsername(json.user);
        }
      })
      .catch((error) => {
        alert(error);
      });
  }

  function getHeaderTitle(route) {
    getAsyncUser();
    getUsername();
    const routeName = getFocusedRouteNameFromRoute(route) ?? "PlanosTreinoList";

    switch (routeName) {
      case "PlanosTreinoList":
        return <AppTitles username={username} />;
      case "ExerciciosList":
        return <AppTitles username={username} />;
      case "AulasGrupoList":
        return <AppTitles username={username} />;
      case "AccountConfig":
        return <AppTitles username={username} />;
    }
  }

  return (
    <RootStack.Navigator initialRouteName="Initial">
      <RootStack.Screen
        name="Inital"
        component={InitialPage}
        options={({ route }) => ({
          headerShown: false,
        })}
      />
      <RootStack.Screen
        name="Login"
        component={Login}
        options={({ route }) => ({
          headerShown: false,
        })}
      />
      <RootStack.Screen
        name="Register"
        component={Register}
        options={({ route }) => ({
          headerShown: false,
        })}
      />
      <RootStack.Screen
        name="Main"
        component={Tabs}
        options={({ route, navigation }) => ({
          headerTitle: () => getHeaderTitle(route),
          headerLeft: () => (
            <Button
              onPress={() => {
                navigation.navigate("PlanosTreinoList");
              }}
            >
              <Icon name="home" size={30} color="#fff" />
            </Button>
          ),
          headerRight: () => (
            <Button
              onPress={() => {
                clearUserId();
                navigation.navigate("Login");
              }}
            >
              <IconsFA name="sign-out" size={30} color="#fff" />
            </Button>
          ),
          headerTintColor: "white",
          headerStyle: {
            backgroundColor: "#B72727",
          },
        })}
      />
      <RootStack.Screen
        name="PlanoTreinoDetails"
        component={PlanoTreinoDetails}
        options={({ route }) => ({
          headerTitle: "Detalhes Plano Treino",
        })}
      />
      <RootStack.Screen
        name="ExercicioDetails"
        component={ExercicioDetails}
        options={({ route }) => ({
          headerTitle: "Detalhes Exercício",
        })}
      />
      <RootStack.Screen
        name="AulaGrupoDetails"
        component={AulaGrupoDetails}
        options={({ route }) => ({
          headerTitle: "Detalhes Aula Grupo",
        })}
      />
      <RootStack.Screen
        name="AddPlanoTreino"
        component={AddPlanoTreino}
        options={({ route }) => ({
          headerTitle: "Adicionar Plano Treino",
        })}
      />
      <RootStack.Screen
        name="AddExercicio"
        component={AddExercicio}
        options={({ route }) => ({
          headerTitle: "Adicionar Exercicio",
        })}
      />
      <RootStack.Screen
        name="AddAulaGrupo"
        component={AddAulaGrupo}
        options={({ route }) => ({
          headerTitle: "Adicionar Aula Grupo",
        })}
      />
      <RootStack.Screen
        name="DadosCorporais"
        component={DadosCorporaisConfig}
        options={({ route }) => ({
          headerTitle: "Dados Corporais",
        })}
      />
    </RootStack.Navigator>
  );
}
