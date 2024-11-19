import { Platform } from 'react-native';
import { StyleSheet, Dimensions } from 'react-native';
const { width, height } = Dimensions.get('screen');
const aspectRatio = height / width;

export default StyleSheet.create({
  picker: {
    width: 0.35 * width,
    height: 0.035 * height,
    color: 'white',
    backgroundColor: 'transparent',
  },
  input: {
    fontFamily: 'Prompt-Regular',
    backgroundColor: 'red',
    borderBottomWidth: 2,
    borderColor: '#DDD',
    paddingHorizontal: 20,
    fontSize: 0.02 * height,
    borderRadius: 5,
    width: '100%',
    height: 0.08 * height,
  },
  iconPikker: {
    position: 'absolute',
    bottom: 2,
    right: 10,
    fontSize: 20,
  },

  iconDate: {
    position: 'absolute',
    bottom: 0,
    top: 2,
    right: 10,
    fontSize: 20,
  },

  panalPiker: {
    borderColor: 'black',
    borderWidth: 1,
    backgroundColor: 'white',
    borderRadius: 4,
    paddingLeft: 10,
  },

  panalPikerDis: {
    borderColor: 'black',
    borderWidth: 1,
    backgroundColor: '#efefef',
    borderRadius: 4,
    paddingLeft: 10,
  },

  textinput: {
    fontFamily: 'Prompt-Regular',
    fontSize: 0.02 * height,
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 5,
    paddingTop: 0,
    paddingBottom: 0,
    backgroundColor: 'white',
    ...Platform.select({
      ios: { height: aspectRatio > 1.8 ? 0.04 * height : 0.05 * height },
      android: { height: aspectRatio > 1.8 ? 0.04 * height : 0.05 * height },
    }),
  },
  space: {
    height: 5,
  },
  lableDate: {
    flex: 1,
    alignSelf: 'stretch',
    paddingTop: 5,
    alignItems: 'flex-end',
  },
  inputDate: { flex: 1, alignSelf: 'stretch' },
  inpuTime: { flex: 1, alignSelf: 'stretch' },
  lableTime: {
    alignSelf: 'stretch',
    alignItems: 'flex-end',
    paddingTop: 5,
  },
  inputDate: { flex: 1, alignSelf: 'stretch' },
  inpuTime: { flex: 1, alignSelf: 'stretch' },
  textInput: {
    fontFamily: 'Prompt-Regular',
    fontSize: 0.015 * height,
  },
});
