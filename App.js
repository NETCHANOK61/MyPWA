// // App.js
// import React, { useState, useEffect } from "react";
// import { StatusBar } from "expo-status-bar";
// import { NavigationContainer } from "@react-navigation/native";
// import AppNavigator from "./src/app/navigations/AppNavigator";
// import { View } from "react-native";
// import { getProfile } from "./src/app/utils/Storage";

// // Redux
// import { Provider } from "react-redux";
// import store from "./src/app/store/store"; // Import the store

// export default function App() {
//   const [showLogin, setShowLogin] = useState(false);

//   const init = () => {
//     getProfile().then((profile) => {
//       setShowLogin(profile == null ? true : false);
//     });
//   };

//   useEffect(() => {
//     init();
//   });

//   return (
//     <Provider store={store}>
//     <NavigationContainer>
//       <StatusBar
//         barStyle="dark-content"
//         backgroundColor="#ffffff"
//         hidden={false}
//       />
//       <View style={{ flex: 1 }}>
//         <AppNavigator showAuthen={showLogin} />
//       </View>
//     </NavigationContainer>
//     </Provider>
//   );
// }

import React, { useState, useEffect } from "react";
import { Provider } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { View, Text } from "react-native";
import store from "./src/app/store/store";
import AppNavigator from "./src/app/navigations/AppNavigator";
import { getProfile } from "./src/app/utils/Storage";
import { useFonts } from "expo-font";

const App = () => {
  const [showLogin, setShowLogin] = useState(false);

  const init = () => {
    getProfile().then((profile) => {
      setShowLogin(profile == null ? true : false);
    });
  };

  useEffect(() => {
    init();
  }, []);

  // โหลดฟอนต์
  const [fontsLoaded] = useFonts({
    "Prompt-Bold": require("./assets/fonts/Prompt-Bold.ttf"),
    "Prompt-Light": require("./assets/fonts/Prompt-Light.ttf"),
    "Prompt-Medium": require("./assets/fonts/Prompt-Medium.ttf"),
    "Prompt-Regular": require("./assets/fonts/Prompt-Regular.ttf"),
    "Prompt-Thin": require("./assets/fonts/Prompt-Thin.ttf"),
  });

  return (
    <Provider store={store}>
      <NavigationContainer>
        <StatusBar
          barStyle="dark-content"
          backgroundColor="#ffffff"
          hidden={false}
        />
        <View style={{ flex: 1 }}>
          {!fontsLoaded && <Text>Loading...</Text>}
          <AppNavigator showAuthen={showLogin} />
        </View>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
