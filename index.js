// index.js
import React from "react";
import { AppRegistry, LogBox } from "react-native";
import App from "./App";
import { name as appName } from "./app.json";

// Redux
import { Provider } from "react-redux";
import store from "./src/app/store/store"; // Import the store

const ReduxApp = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

LogBox.ignoreLogs([
  'Warning: Each child in a list should have a unique "key" prop.',
  "Warning: Cannot update a component (`BottomTabNavigator`) while rendering a different component (`ReceiveRepairStackScreen`).",
  "Accessing the 'state' property of the 'route' object is not supported.",
  "Warning: Cannot update a component (`BottomTabNavigator`) while rendering a different component (`WorkRepairStackScreen`).",
  "Warning: Cannot update a component (`StackNavigator`) while rendering a different component (`MyTab`).",
  "Warning: Failed prop type: Invalid prop `children` of type `object` supplied to `DialogActionList`, expected an array.",
  "Warning: Failed prop type: Invalid prop `width` of type `string` supplied to `PopupDialog`, expected `number`.",
  "Warning: Failed prop type: Invalid prop `title` of type `object` supplied to `AwesomeAlert`, expected `string`.",
  "Warning: Cannot update a component (`index`) while rendering a different component (`Map`). To locate the bad setState() call inside `Map`, follow the stack trace as described in https://reactjs.org/link/setstate-in-render",
]);

AppRegistry.registerComponent(appName, () => ReduxApp);
