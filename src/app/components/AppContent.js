import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { INCREMENT, DECREMENT } from '../store/store'; // นำเข้า action creators

const AppContent = () => {
  const counter = useSelector((state) => state.counter); // อ่านค่า counter จาก store
  const dispatch = useDispatch(); // ใช้ dispatch เพื่อนำ action ไปใช้งาน

  return (
    <View style={styles.container}>
      <Text style={styles.counter}>Counter: {counter}</Text>
      <Button
        title="Increment"
        onPress={() => dispatch(INCREMENT())} // ส่ง action INCREMENT
      />
      <Button
        title="Decrement"
        onPress={() => dispatch(DECREMENT())} // ส่ง action DECREMENT
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  counter: {
    fontSize: 30,
    marginBottom: 20,
  },
});

export default AppContent;
