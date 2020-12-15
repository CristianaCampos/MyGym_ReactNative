import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import * as Font from "expo-font";
import { View } from "react-native";

import Routes from "./navigation/navigation";

export default class App extends React.Component {
  state = {
    fontLoaded: false,
  };

  componentDidMount() {
    this.loadFonts();
  }

  async loadFonts() {
    await Font.loadAsync({
      Poppins_Regular: require("../assets/fonts/Poppins-Regular.ttf"),
      Poppins_Bold: require("../assets/fonts/Poppins-Bold.ttf"),
    });

    this.setState({ fontLoaded: true });
  }

  render() {
    if (!this.state.fontLoaded) {
      return null;
    }
    return (
      <View style={{ flex: 1, backgroundColor: "#B72727" }}>
        <NavigationContainer>
          <Routes />
        </NavigationContainer>
      </View>
    );
  }
}
