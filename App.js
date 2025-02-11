import React, { useState, useEffect } from "react";
import { Provider } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import * as Font from "expo-font";
import store from "./src/app/store/store";
import AppNavigator from "./src/app/navigations/AppNavigator";
<<<<<<< HEAD
=======
import { getProfile } from "./src/app/utils/Storage";
// import { useFonts } from "expo-font";
>>>>>>> a3381a7 (fix bug #1)

const App = () => {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  const loadFonts = async () => {
    try {
      await Font.loadAsync({
        "Prompt-Bold": require("./assets/fonts/Prompt-Bold.ttf"),
        "Prompt-Regular": require("./assets/fonts/Prompt-Regular.ttf"),
      });
      setFontsLoaded(true);
    } catch (error) {
      console.error("Error loading fonts:", error);
    }
  };

  useEffect(() => {
    loadFonts();
  }, []);

<<<<<<< HEAD
  if (!fontsLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading Fonts...</Text>
      </View>
    );
  }
=======
  // โหลดฟอนต์
  // const [fontsLoaded] = useFonts({
  //   "Prompt-Bold": require("./assets/fonts/Prompt-Bold.ttf"),
  //   "Prompt-Light": require("./assets/fonts/Prompt-Light.ttf"),
  //   "Prompt-Medium": require("./assets/fonts/Prompt-Medium.ttf"),
  //   "Prompt-Regular": require("./assets/fonts/Prompt-Regular.ttf"),
  //   "Prompt-Thin": require("./assets/fonts/Prompt-Thin.ttf"),
  // });
>>>>>>> a3381a7 (fix bug #1)

  return (
    <Provider store={store}>
      <NavigationContainer>
        <StatusBar
          barStyle="dark-content"
          backgroundColor="#ffffff"
          hidden={false}
        />
        <View style={{ flex: 1 }}>
<<<<<<< HEAD
          <AppNavigator />
=======
          {/* {!fontsLoaded && <Text>Loading...</Text>} */}
          <AppNavigator showAuthen={showLogin} />
>>>>>>> a3381a7 (fix bug #1)
        </View>
      </NavigationContainer>
    </Provider>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default App;
