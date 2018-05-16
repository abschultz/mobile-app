import React, { Component } from "react";
import { View } from "react-native";
import { Container, Content, Picker, Button, Text } from "native-base";
import Expo from "expo";

import Main from "./src/index.js";
import LoginScreen from "./src/LoginScreen/index.js";
export default class AwesomeApp extends Component {
  constructor() {
    super();
    this.state = {
      isReady: false,
      isLoggedIn: false
    };
  }
  async componentWillMount() {
    await Expo.Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      Ionicons: require("native-base/Fonts/Ionicons.ttf")
    });
    this.setState({ isReady: true });
  }
  render() {
    if (!this.state.isReady) {
      return <Expo.AppLoading />;
    }
    if (!this.state.isLoggedIn) {
      return <LoginScreen
        onLoginPress={() => this.setState({isLoggedIn: true})}
      />
    }
    return <Main
      onLogoutPress={() => this.setState({isLoggedIn: false})}
    />;
  }
}
