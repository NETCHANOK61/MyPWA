// Counter.js
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { View, Text, Button } from "react-native";

const Counter = () => {
  // ใช้ useSelector เพื่อเข้าถึง state ใน Redux store
  const count = useSelector((state) => state.counter.count);

  // ใช้ useDispatch เพื่อส่ง action
  const dispatch = useDispatch();

  return (
    <Provider store={store}>
      <View>
        <Text>Count: {count}</Text>
        <Button
          title="Increment"
          onPress={() => dispatch({ type: "increment" })}
        />
        <Button
          title="Decrement"
          onPress={() => dispatch({ type: "decrement" })}
        />
      </View>
    </Provider>
  );
};

export default Counter;
