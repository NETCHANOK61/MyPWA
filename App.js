// App.js
import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./src/app/navigations/AppNavigator";
import { View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getProfile } from "./src/app/utils/Storage";

export default function App() {
  const [showLogin, setShowLogin] = useState(false);

  const init = () => {
    getProfile().then((profile) => {
      setShowLogin(profile == null ? true : false);
    });
  };

  useEffect(() => {
    init();
  });

  return (
    <NavigationContainer>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#ffffff"
        hidden={false}
      />
      <View style={{ flex: 1 }}>
        <AppNavigator showAuthen={showLogin} />
      </View>
    </NavigationContainer>
  );
}
