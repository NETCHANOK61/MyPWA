import React from 'react';
import {StyleSheet, Dimensions} from 'react-native';
const {height: viewportHeight, width: viewportWidth} = Dimensions.get('window');

export default StyleSheet.create({
  image: {width: 0.8 * viewportWidth, height: 0.6 * viewportHeight},
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  closeBtn: {
    flexDirection: 'column',
    alignContent: 'flex-end',
    marginLeft: 0.85 * viewportWidth,
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
