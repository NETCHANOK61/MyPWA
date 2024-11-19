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
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 15,
    borderLeftWidth: 5,
    borderColor: '#39405B',
    backgroundColor: '#f0f0f0',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  stepText: {
    fontFamily: 'Prompt-Regular',
    color: '#39405B',
    fontSize: 0.04 * viewportWidth,
  },
  row: {
    marginBottom: 10,
    paddingLeft: 10,
    borderLeftWidth: 5,
    borderColor: '#f0f0f0',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  itemboxImage: {
    backgroundColor: '#999',
    borderRadius: 5,
    width: '42%',
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInputMultiImage: {
    fontFamily: 'Prompt-Regular',
    borderWidth: 1,
    borderColor: '#DDD',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    fontSize: 0.04 * viewportWidth,
    width: '56%',
    ...Platform.select({
      ios: {
        textAlignVertical: 'top',
        height: 100,
      },
      android: {
        textAlignVertical: 'top',
        height: 100,
      },
    }),
  },
  itemFooter: {
    marginVertical: 20,
    justifyContent: 'flex-end',
    paddingHorizontal: 10,
  },
  itemIcon: {
    color: '#FFF',
    fontSize: 0.06 * viewportWidth,
  },
  itemBtnActive: {
    backgroundColor: '#28a745',
    color: '#FFF',
    paddingHorizontal: 5,
    borderRadius: 5,
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    width: '50%',
  },
  itemboxImage2: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
