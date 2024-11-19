import React from 'react';
import {StyleSheet, Dimensions, Platform} from 'react-native';
const {width: viewportWidth, height: viewportHeight} = Dimensions.get('window');

export default StyleSheet.create({
  section: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  step: {
    paddingHorizontal: 5,
    marginBottom: 5,
    borderLeftWidth: 5,
    borderColor: '#39405B',
    backgroundColor: '#f0f0f0',
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
  },
  stepText: {
    fontFamily: 'Prompt-Regular',
    color: '#39405B',
    fontSize: 0.035 * viewportWidth,
  },
  row: {
    marginBottom: 5,
    paddingLeft: 10,
    paddingRight: 10,
    paddingVertical: 5,
    borderLeftWidth: 5,
    borderColor: '#bdbdbd',
    flexDirection: 'row',
  },
  label5: {
    fontFamily: 'Prompt-Regular',
    fontSize: 0.035 * viewportWidth,
    marginTop: 5,
    color: '#fff',
    marginLeft: 5,
  },
  photoDelete: {
    position: 'absolute',
    backgroundColor: '#FFF',
    right: 0,
    top: 0,
    marginRight: 10,
    marginTop: 10,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 0,
    borderRadius: 15,
  },
  photoDeleteIcon: {
    color: '#28a745',
    fontSize: 18,
    ...Platform.select({
      ios: {
        width: 16,
        height: 16,
        marginBottom: 5,
      },
      android: {
        width: 16,
        height: 16,
      },
    }),
    justifyContent: 'center',
    alignItems: 'center',
  },
  photoText: {
    fontFamily: 'Prompt-Regular',
    fontSize: 11,
  },
  label3: {
    fontFamily: 'Prompt-Regular',
    fontSize: 0.035 * viewportWidth,
    color: '#fff',
    marginLeft: 5,
    marginBottom: 20,
  },
  label4: {
    fontSize: 50,
    color: '#fff',
    alignSelf: 'center',
    marginLeft: 10,
    fontSize: 0.13 * viewportWidth,
  },
});
