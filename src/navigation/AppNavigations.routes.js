import React, { useEffect, useState } from "react";
import { Text, Alert, TouchableOpacity, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import IconsFA from "react-native-vector-icons/FontAwesome";

import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import { Button, Modal, Portal, Divider, Provider } from "react-native-paper";
import * as Animatable from "react-native-animatable";

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

import { database } from "../constant/database";
import { storage } from "../constant/storage";
import { styles } from "../constant/styles";
import { colors } from "../constant/colors";

const PlanosTreinoListStack = createStackNavigator();
const ExerciciosListStack = createStackNavigator();
const AulasGrupoListStack = createStackNavigator();
const AccountConfigStack = createStackNavigator();

const BottomTab = createBottomTabNavigator();
const RootStack = createStackNavigator();
const TopTab = createMaterialTopTabNavigator();

function DadosTopTabNavigatorScreen() {
  return (
    <TopTab.Navigator
      backBehavior="none"
      tabBarOptions={{
        style: {
          backgroundColor: "#B72727",
        },
        activeTintColor: "white",
        pressColor: "white",
        indicatorStyle: {
          backgroundColor: "white",
          padding: 2,
        },
        labelStyle: { fontSize: 13 },
      }}
    >
      <TopTab.Screen
        name="AccountConfig"
        component={AccountConfigStackScreen}
        options={{
          title: "Dados da Conta",
        }}
      />
      <TopTab.Screen
        name="DadosCorporais"
        component={DadosCorporaisConfig}
        options={{
          title: "Dados Corporais",
        }}
      />
    </TopTab.Navigator>
  );
}

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
        inactiveTintColor: "#808080",
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
        component={DadosTopTabNavigatorScreen}
        options={{
          title: "Definições",
        }}
      />
    </BottomTab.Navigator>
  );
}

export default function AppNavigations() {
  const [username, setUsername] = useState("");
  const [userId, setUserId] = useState("");
  const [user, setUser] = useState("");
  const [newNavigation, setNewNavigation] = useState("");

  const [plano, setPlano] = useState("");
  const [exercicio, setExercicio] = useState("");
  const [aula, setAula] = useState("");

  const [modalErro, setModalErro] = useState(false);
  const [modalSucesso, setModalSucesso] = useState(false);
  const [modalUltimoRegisto, setModalUltimoRegisto] = useState(false);

  const [modalEliminarPlano, setModalEliminarPlano] = useState(false);
  const [modalEliminarExercicio, setModalEliminarExercicio] = useState(false);
  const [modalEliminarAula, setModalEliminarAula] = useState(false);

  const showModalErro = () => setModalErro(true);
  const hideModalErro = () => {
    setModalErro(false);
  };

  const showModalSucesso = () => setModalSucesso(true);
  const hideModalSucesso = () => {
    setModalSucesso(false);
  };

  const showModalUltimoRegisto = () => setModalUltimoRegisto(true);
  const hideModalUltimoRegisto = () => {
    setModalUltimoRegisto(false);
  };

  const showModalEliminarPlano = () => setModalEliminarPlano(true);
  const hideModalEliminarPlano = () => {
    setModalEliminarPlano(false);
  };

  const showModalEliminarExercicio = () => setModalEliminarExercicio(true);
  const hideModalEliminarExercicio = () => {
    setModalEliminarExercicio(false);
  };

  const showModalEliminarAula = () => setModalEliminarAula(true);
  const hideModalEliminarAula = () => {
    setModalEliminarAula(false);
  };

  const uri =
    "http://" + database.ip + ":" + database.port + "/php/getUsername.php";

  const uriDeletePlano =
    "http://" + database.ip + ":" + database.port + "/php/deletePlano.php";

  const uriDeleteExercicio =
    "http://" + database.ip + ":" + database.port + "/php/deleteExercicio.php";

  const uriDeleteAula =
    "http://" + database.ip + ":" + database.port + "/php/deleteAula.php";

  async function clearUserId() {
    try {
      await AsyncStorage.clear();
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    async function getPlano() {
      try {
        let id = await AsyncStorage.getItem(storage.plano);
        id = JSON.parse(id);

        if (id != null) {
          setPlano(id);
        }
      } catch (error) {
        console.log(error);
      }
    }

    getPlano().then();
  }, []);

  useEffect(() => {
    async function getExercicio() {
      try {
        let id = await AsyncStorage.getItem(storage.exercicio);
        id = JSON.parse(id);

        if (id != null) {
          setExercicio(id);
        }
      } catch (error) {
        console.log(error);
      }
    }

    getExercicio().then();
  }, []);

  useEffect(() => {
    async function getAula() {
      try {
        let id = await AsyncStorage.getItem(storage.aula);
        id = JSON.parse(id);

        if (id != null) {
          setAula(id);
        }
      } catch (error) {
        console.log(error);
      }
    }

    getAula().then();
  }, []);

  const alertPlano = (navigation) => {
    setNewNavigation(navigation);
    showModalEliminarPlano(true);
  };
  // Alert.alert(
  //   "Eliminar Plano Treino",
  //   "Tem a certeza?",
  //   [
  //     {
  //       text: "Sim",
  //       onPress: () => deletePlano(navigation),
  //     },
  //     { text: "Não", style: "destructive" },
  //   ],
  //   { cancelable: false }
  // );

  async function deletePlano(navigation) {
    let planoNovo = "";

    try {
      let id = await AsyncStorage.getItem(storage.plano);
      id = JSON.parse(id);

      if (id != null) {
        planoNovo = id;
      }
    } catch (error) {
      console.log(error);
    }

    // console.log(user);
    // console.log("----------");
    // console.log(planoNovo);
    fetch(uriDeletePlano, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: planoNovo.id,
        userId: user.id,
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        switch (json.message) {
          case "success":
            showModalSucesso(true);
            // Alert.alert(
            //   "Sucesso",
            //   "Registo eliminado.",
            //   [
            //     {
            //       text: "OK",
            //       style: "default",
            //       // onPress: () => navigation.navigate("PlanosTreinoList"),
            //     },
            //   ],
            //   { cancelable: true }
            // );
            navigation.goBack();
            break;
          case "delete_failed":
            showModalErro(true);
            // Alert.alert(
            //   "Erro",
            //   "Não foi possível eliminar.",
            //   [
            //     {
            //       text: "OK",
            //       style: "default",
            //       // onPress: () => navigation.navigate("PlanosTreinoList"),
            //     },
            //   ],
            //   { cancelable: true }
            // );
            break;
          case "is_last_result":
            showModalUltimoRegisto(true);
            // Alert.alert(
            //   "Erro",
            //   "Não pode eliminar o último plano. Prefira editá-lo.",
            //   [
            //     {
            //       text: "OK",
            //       style: "default",
            //       // onPress: () => navigation.navigate("PlanosTreinoList"),
            //     },
            //   ],
            //   { cancelable: true }
            // );
            break;
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const alertExercicio = (navigation) => {
    setNewNavigation(navigation);
    showModalEliminarExercicio(true);
  };
  // Alert.alert(
  //   "Eliminar Exercício",
  //   "Tem a certeza?",
  //   [
  //     {
  //       text: "Sim",
  //       onPress: () => deleteExercicio(navigation),
  //     },
  //     { text: "Não", style: "destructive" },
  //   ],
  //   { cancelable: false }
  // );

  async function deleteExercicio(navigation) {
    let exercicioNovo = "";

    try {
      let id = await AsyncStorage.getItem(storage.exercicio);
      id = JSON.parse(id);

      if (id != null) {
        exercicioNovo = id;
      }
    } catch (error) {
      console.log(error);
    }

    // getUser();
    // getExercicio();
    fetch(uriDeleteExercicio, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: exercicioNovo.id,
        userId: user.id,
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        switch (json.message) {
          case "success":
            showModalSucesso(true);
            // Alert.alert(
            //   "Erro",
            //   "Registo eliminado.",
            //   [
            //     {
            //       text: "OK",
            //       style: "default",
            //       // onPress: () => navigation.navigate("PlanosTreinoList"),
            //     },
            //   ],
            //   { cancelable: true }
            // );
            navigation.goBack();
            break;
          case "delete_failed":
            showModalErro(true);
            // Alert.alert(
            //   "Erro",
            //   "Não foi possível eliminar.",
            //   [
            //     {
            //       text: "OK",
            //       style: "default",
            //       // onPress: () => navigation.navigate("PlanosTreinoList"),
            //     },
            //   ],
            //   { cancelable: true }
            // );
            break;
          case "is_last_result":
            showModalUltimoRegisto(true); //liga o carregador please, tá impossivel too laggy
            // Alert.alert(
            //   "Erro",
            //   "Não pode eliminar o último exercício. Prefira editá-lo.",
            //   [
            //     {
            //       text: "OK",
            //       style: "default",
            //       // onPress: () => navigation.navigate("PlanosTreinoList"),
            //     },
            //   ],
            //   { cancelable: true }
            // );
            break;
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const alertAula = (navigation) => {
    setNewNavigation(navigation);
    showModalEliminarAula(true);
  };
  // Alert.alert(
  //   "Eliminar Aula Grupo",
  //   "Tem a certeza?",
  //   [
  //     {
  //       text: "Sim",
  //       onPress: () => deleteAula(navigation),
  //     },
  //     { text: "Não", style: "destructive" },
  //   ],
  //   { cancelable: false }
  // );

  async function deleteAula(navigation) {
    let aulaNovo = "";

    try {
      let id = await AsyncStorage.getItem(storage.aula);
      id = JSON.parse(id);

      if (id != null) {
        aulaNovo = id;
      }
    } catch (error) {
      console.log(error);
    }

    // getUser();
    // getAula();
    fetch(uriDeleteAula, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: aulaNovo.id,
        userId: user.id,
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        switch (json.message) {
          case "success":
            showModalSucesso(true);
            // Alert.alert(
            //   "Erro",
            //   "Registo eliminado.",
            //   [
            //     {
            //       text: "OK",
            //       style: "default",
            //       // onPress: () => navigation.navigate("PlanosTreinoList"),
            //     },
            //   ],
            //   { cancelable: true }
            // );
            navigation.goBack();
            break;
          case "delete_failed":
            showModalErro(true);
            // Alert.alert(
            //   "Erro",
            //   "Não foi possível eliminar.",
            //   [
            //     {
            //       text: "OK",
            //       style: "default",
            //       // onPress: () => navigation.navigate("PlanosTreinoList"),
            //     },
            //   ],
            //   { cancelable: true }
            // );
            break;
          case "is_last_result":
            showModalUltimoRegisto(true);
            // Alert.alert(
            //   "Erro",
            //   "Não pode eliminar a última aula. Prefira editá-la.",
            //   [
            //     {
            //       text: "OK",
            //       style: "default",
            //       // onPress: () => navigation.navigate("PlanosTreinoList"),
            //     },
            //   ],
            //   { cancelable: true }
            // );
            break;
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
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
  }, []);

  function getUsername() {
    fetch(uri, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: JSON.stringify(user.id),
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.message == "success") {
          setUsername(json.user);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function getHeaderTitle(route) {
    getUsername();
    return <Text style={styles.titleNome}>{username}</Text>;
  }

  return (
    <Provider>
      {/* modal sucesso */}
      <Portal>
        <Modal
          visible={modalSucesso}
          onDismiss={hideModalSucesso}
          contentContainerStyle={styles.modal}
        >
          <View
            style={{
              padding: 20,
              flexDirection: "column",
              flex: 1,
            }}
          >
            <Text style={styles.modalTitle}>Sucesso!</Text>
            <Divider style={{ backgroundColor: "black", borderWidth: 1 }} />
            <View style={{ flexDirection: "row", marginTop: 20 }}>
              <Animatable.View animation="tada" useNativeDriver={true}>
                <IconsFA
                  style={styles.modalIcon}
                  size={30}
                  color="white"
                  name="check"
                />
              </Animatable.View>
              <View>
                <Text style={styles.modalMensagem}>
                  Registo eliminado com {"\n"}sucesso.
                </Text>
              </View>
            </View>
            <TouchableOpacity style={{ alignSelf: "flex-end", marginTop: 5 }}>
              <Text
                style={{
                  color: colors.main,
                  fontFamily: "Poppins_Bold",
                  fontSize: 16,
                }}
                onPress={() => {
                  hideModalSucesso();
                }}
              >
                OK
              </Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </Portal>
      {/*  */}
      {/* modal erro */}
      <Portal>
        <Modal
          visible={modalErro}
          onDismiss={hideModalErro}
          contentContainerStyle={styles.modal}
        >
          <View
            style={{
              padding: 20,
              flexDirection: "column",
              flex: 1,
            }}
          >
            <Text style={styles.modalTitle}>Erro!</Text>
            <Divider style={{ backgroundColor: "black", borderWidth: 1 }} />
            <View style={{ flexDirection: "row", marginTop: 20 }}>
              <Animatable.View animation="tada" useNativeDriver={true}>
                <IconsFA
                  style={styles.modalIcon}
                  size={30}
                  color="white"
                  name="remove"
                />
              </Animatable.View>
              <View>
                <Text style={styles.modalMensagem}>
                  Não foi possível eliminar.
                </Text>
              </View>
            </View>
            <TouchableOpacity style={{ alignSelf: "flex-end", marginTop: 5 }}>
              <Text
                style={{
                  color: colors.main,
                  fontFamily: "Poppins_Bold",
                  fontSize: 16,
                }}
                onPress={() => hideModalErro()}
              >
                OK
              </Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </Portal>
      {/*  */}
      {/* modal ultimo registo */}
      <Portal>
        <Modal
          visible={modalUltimoRegisto}
          onDismiss={hideModalUltimoRegisto}
          contentContainerStyle={styles.modal}
        >
          <View
            style={{
              padding: 20,
              flexDirection: "column",
              flex: 1,
            }}
          >
            <Text style={styles.modalTitle}>Erro!</Text>
            <Divider style={{ backgroundColor: "black", borderWidth: 1 }} />
            <View style={{ flexDirection: "row", marginTop: 20 }}>
              <Animatable.View animation="tada" useNativeDriver={true}>
                <IconsFA
                  style={styles.modalIcon}
                  size={30}
                  color="white"
                  name="warning"
                />
              </Animatable.View>
              <View>
                <Text style={styles.modalMensagem}>
                  Não pode eliminar o último {"\n"}registo. Prefira editá-lo.
                </Text>
              </View>
            </View>
            <TouchableOpacity style={{ alignSelf: "flex-end", marginTop: 5 }}>
              <Text
                style={{
                  color: colors.main,
                  fontFamily: "Poppins_Bold",
                  fontSize: 16,
                }}
                onPress={() => hideModalUltimoRegisto()}
              >
                OK
              </Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </Portal>
      {/*  */}
      {/* modal eliminar plano */}
      <Portal>
        <Modal
          visible={modalEliminarPlano}
          onDismiss={hideModalEliminarPlano}
          contentContainerStyle={styles.modal}
        >
          <View
            style={{
              padding: 20,
              flexDirection: "column",
              flex: 1,
            }}
          >
            <Text style={styles.modalTitle}>Eliminar Plano de Treino</Text>
            <Divider style={{ backgroundColor: "black", borderWidth: 1 }} />
            <View style={{ flexDirection: "row", marginTop: 20 }}>
              <Animatable.View animation="tada" useNativeDriver={true}>
                <IconsFA
                  style={styles.modalIcon}
                  size={30}
                  color="white"
                  name="warning"
                />
              </Animatable.View>
              <View>
                <Text style={styles.modalMensagem}>Tem a certeza?</Text>
              </View>
            </View>
            <View style={{ flexDirection: "row", alignSelf: "flex-end" }}>
              <TouchableOpacity
                style={{
                  marginTop: 10,
                  marginRight: 10,
                }}
              >
                <Text
                  style={{
                    color: colors.main,
                    fontFamily: "Poppins_Bold",
                    fontSize: 16,
                  }}
                  onPress={() => {
                    hideModalEliminarPlano(), deletePlano(newNavigation);
                  }}
                >
                  SIM
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={{ marginTop: 10 }}>
                <Text
                  style={{
                    color: colors.main,
                    fontFamily: "Poppins_Bold",
                    fontSize: 16,
                  }}
                  onPress={() => hideModalEliminarPlano()}
                >
                  NÃO
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </Portal>
      {/*  */}
      {/* modal eliminar plano */}
      <Portal>
        <Modal
          visible={modalEliminarExercicio}
          onDismiss={hideModalEliminarExercicio}
          contentContainerStyle={styles.modal}
        >
          <View
            style={{
              padding: 20,
              flexDirection: "column",
              flex: 1,
            }}
          >
            <Text style={styles.modalTitle}>Eliminar Exercício</Text>
            <Divider style={{ backgroundColor: "black", borderWidth: 1 }} />
            <View style={{ flexDirection: "row", marginTop: 20 }}>
              <Animatable.View animation="tada" useNativeDriver={true}>
                <IconsFA
                  style={styles.modalIcon}
                  size={30}
                  color="white"
                  name="warning"
                />
              </Animatable.View>
              <View>
                <Text style={styles.modalMensagem}>Tem a certeza?</Text>
              </View>
            </View>
            <View style={{ flexDirection: "row", alignSelf: "flex-end" }}>
              <TouchableOpacity
                style={{
                  marginTop: 10,
                  marginRight: 10,
                }}
              >
                <Text
                  style={{
                    color: colors.main,
                    fontFamily: "Poppins_Bold",
                    fontSize: 16,
                  }}
                  onPress={() => {
                    hideModalEliminarExercicio(),
                      deleteExercicio(newNavigation);
                  }}
                >
                  SIM
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={{ marginTop: 10 }}>
                <Text
                  style={{
                    color: colors.main,
                    fontFamily: "Poppins_Bold",
                    fontSize: 16,
                  }}
                  onPress={() => hideModalEliminarExercicio()}
                >
                  NÃO
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </Portal>
      {/*  */}
      {/* modal eliminar aula */}
      <Portal>
        <Modal
          visible={modalEliminarAula}
          onDismiss={hideModalEliminarAula}
          contentContainerStyle={styles.modal}
        >
          <View
            style={{
              padding: 20,
              flexDirection: "column",
              flex: 1,
            }}
          >
            <Text style={styles.modalTitle}>Eliminar Aula de Grupo</Text>
            <Divider style={{ backgroundColor: "black", borderWidth: 1 }} />
            <View style={{ flexDirection: "row", marginTop: 20 }}>
              <Animatable.View animation="tada" useNativeDriver={true}>
                <IconsFA
                  style={styles.modalIcon}
                  size={30}
                  color="white"
                  name="warning"
                />
              </Animatable.View>
              <View>
                <Text style={styles.modalMensagem}>Tem a certeza?</Text>
              </View>
            </View>
            <View style={{ flexDirection: "row", alignSelf: "flex-end" }}>
              <TouchableOpacity
                style={{
                  marginTop: 10,
                  marginRight: 10,
                }}
              >
                <Text
                  style={{
                    color: colors.main,
                    fontFamily: "Poppins_Bold",
                    fontSize: 16,
                  }}
                  onPress={() => {
                    hideModalEliminarAula(), deleteAula(newNavigation);
                  }}
                >
                  SIM
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={{ marginTop: 10 }}>
                <Text
                  style={{
                    color: colors.main,
                    fontFamily: "Poppins_Bold",
                    fontSize: 16,
                  }}
                  onPress={() => hideModalEliminarAula()}
                >
                  NÃO
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </Portal>
      {/*  */}

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
                <IconsFA name="home" size={30} color="#fff" />
              </Button>
            ),
            headerRight: () => (
              <Button
                onPress={() => {
                  navigation.navigate("Login");
                  clearUserId();
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
          options={({ route, navigation }) => ({
            headerTitle: () => getHeaderTitle(route),
            headerLeft: () => (
              <Button
                onPress={() => {
                  navigation.goBack();
                }}
              >
                <IconsFA name="arrow-left" size={23} color="#fff" />
              </Button>
            ),
            headerRight: () => (
              <Button onPress={() => alertPlano(navigation)}>
                <IconsFA name="trash" size={30} color="#fff" />
              </Button>
            ),
            headerStyle: {
              backgroundColor: "#B72727",
            },
          })}
        />
        <RootStack.Screen
          name="ExercicioDetails"
          component={ExercicioDetails}
          options={({ route, navigation }) => ({
            headerTitle: () => getHeaderTitle(route),
            headerLeft: () => (
              <Button
                onPress={() => {
                  navigation.goBack();
                }}
              >
                <IconsFA name="arrow-left" size={23} color="#fff" />
              </Button>
            ),
            headerRight: () => (
              <Button onPress={() => alertExercicio(navigation)}>
                <IconsFA name="trash" size={30} color="#fff" />
              </Button>
            ),
            headerStyle: {
              backgroundColor: "#B72727",
            },
          })}
        />
        <RootStack.Screen
          name="AulaGrupoDetails"
          component={AulaGrupoDetails}
          options={({ route, navigation }) => ({
            headerTitle: () => getHeaderTitle(route),
            headerLeft: () => (
              <Button
                onPress={() => {
                  navigation.goBack();
                }}
              >
                <IconsFA name="arrow-left" size={23} color="#fff" />
              </Button>
            ),
            headerRight: () => (
              <Button onPress={() => alertAula(navigation)}>
                <IconsFA name="trash" size={30} color="#fff" />
              </Button>
            ),
            headerStyle: {
              backgroundColor: "#B72727",
            },
          })}
        />
        <RootStack.Screen
          name="AddPlanoTreino"
          component={AddPlanoTreino}
          options={({ route, navigation }) => ({
            headerTitle: () => getHeaderTitle(route),
            headerLeft: () => (
              <Button
                onPress={() => {
                  navigation.goBack();
                }}
              >
                <IconsFA name="arrow-left" size={23} color="#fff" />
              </Button>
            ),
            headerStyle: {
              backgroundColor: "#B72727",
            },
          })}
        />
        <RootStack.Screen
          name="AddExercicio"
          component={AddExercicio}
          options={({ route, navigation }) => ({
            headerTitle: () => getHeaderTitle(route),
            headerLeft: () => (
              <Button
                onPress={() => {
                  navigation.goBack();
                }}
              >
                <IconsFA name="arrow-left" size={23} color="#fff" />
              </Button>
            ),
            headerStyle: {
              backgroundColor: "#B72727",
            },
          })}
        />
        <RootStack.Screen
          name="AddAulaGrupo"
          component={AddAulaGrupo}
          options={({ route, navigation }) => ({
            headerTitle: () => getHeaderTitle(route),
            headerLeft: () => (
              <Button
                onPress={() => {
                  navigation.goBack();
                }}
              >
                <IconsFA name="arrow-left" size={23} color="#fff" />
              </Button>
            ),
            headerStyle: {
              backgroundColor: "#B72727",
            },
          })}
        />
        <RootStack.Screen
          name="DadosCorporais"
          component={DadosCorporaisConfig}
          options={({ route }) => ({
            headerTitle: () => getHeaderTitle(route),
            headerStyle: {
              backgroundColor: "#B72727",
            },
          })}
        />
      </RootStack.Navigator>
    </Provider>
  );
}
