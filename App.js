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
// import AppContent from "./src/app/components/AppContent"; // ชื่อไฟล์ที่เหมาะสม
import store from "./src/app/store/store";
import AppNavigator from "./src/app/navigations/AppNavigator";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import { getProfile } from "./src/app/utils/Storage";

const App = () => {
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
    <Provider store={store}>
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
    </Provider>
  );
};

export default App;
