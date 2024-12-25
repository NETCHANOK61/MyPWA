import React from 'react';
import { View, StyleSheet } from 'react-native';

const DotElement = () => {
  return (
    <View style={styles.container}>
      <View style={styles.dot} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#f0f0f0',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 10,
    backgroundColor: 'red',
  },
});

export default DotElement;
