import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
function Menu({ route, navigation }) {
  /* 2. Get the param */
  const { mensagem } = route.params;
  return (
    <View style={styles.App}>
      <Text style={styles.texto}>Mensagem: {JSON.stringify(mensagem)}</Text>
    </View>
  );
}
const uri = "<endereço do servidor>login.php";
// Creating Login Activity.
function Login(props) {
  const [nomeUtilizador, setNomeUtilizador] = useState("");
  const [pass, setPass] = useState("");

  const login = async () => {
    try {
      const resp = await fetch(uri, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ usuario, senha }),
      });
      const json = await resp.json();
      props.navigation.navigate("MENU", { usuario: json });
    } catch (e) {
      console.log("erro on login...", e.message);
    }
  };
  return (
    <View style={styles.App}>
      <View></View>
      <TextInput
        placeholder="Digite seu usuário"
        onChangeText={(txt) => setUser(txt)}
        underlineColorAndroid="transparent"
        style={styles.TextInputStyleClass}
      />
      <TextInput
        placeholder="Digite sua senha"
        onChangeText={(text) => setPass(text)}
        underlineColorAndroid="transparent"
        style={styles.TextInputStyleClass}
        secureTextEntry={true}
      />
      <Button title="ENTRAR" onPress={() => login()} color="#FFCC33" />
      <View style={styles.espaco}></View>
    </View>
  );
}
const Stack = createStackNavigator();
function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="HOME" component={Login} />
        <Stack.Screen name="MENU" component={Menu} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
