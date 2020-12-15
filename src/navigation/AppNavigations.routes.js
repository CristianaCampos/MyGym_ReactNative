import React from "react";
import { Image } from "react-native";

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

import PlanosTreinoDetails from "../pages/PlanosTreino/planosTreinoDetails";

import AddPlanoTreino from "../pages/PlanosTreino/addPlanoTreino";
import AddExercicio from "../pages/Exercicios/addExercicio";
import AddAulaGrupo from "../pages/AulasGrupo/addAulaGrupo";

import { Button } from "react-native-paper";
import Icon from "react-native-vector-icons/FontAwesome";

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

function getHeaderTitle(route) {
  // If the focused route is not found, we need to assume it's the initial screen
  // This can happen during if there hasn't been any navigation inside the screen
  // In our case, it's "Feed" as that's the first screen inside the navigator
  const routeName = getFocusedRouteNameFromRoute(route) ?? "PlanosTreinoList";

  switch (routeName) {
    case "PlanosTreinoList":
      return "Planos Treino";
    case "ExerciciosList":
      return "Exercícios";
    case "AulasGrupoList":
      return "Aulas Grupo";
    case "AccountConfig":
      return "Definições da Conta";
  }
}

export default function AppNavigations() {
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
        options={({ route }) => ({
          headerTitle: getHeaderTitle(route),
          headerLeft: () => (
            <Button>
              <Icon name="home" size={30} color="#fff" />
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
        component={PlanosTreinoDetails}
        options={({ route }) => ({
          headerTitle: "Detalhes Plano Treino",
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
