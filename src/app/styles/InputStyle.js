import {StyleSheet, Platform, Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');

export default StyleSheet.create({
  passwordContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#000',
    paddingBottom: 10,
  },
  inputStyle: {
    flex: 1,
  },
  input_1: {
    borderColor: '#2c689e',
    borderWidth: 1,
    borderBottomWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    height: 0.05 * height,
    marginHorizontal: 0,
    width: '100%',
  },
  input_2: {
    borderWidth: 1,
    borderBottomWidth: 1,
    borderRadius: 5,
    height: 30,
    backgroundColor: '#FFFFFF',
    marginVertical: 0,
  },
  input_3: {
    borderWidth: 1,
    borderBottomWidth: 1,
    borderRadius: 5,
    height: 30,
    backgroundColor: '#bdbdbd',
  },
  textInput: {
    fontFamily: 'Prompt-Regular',
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 2,
    borderColor: '#DDD',
    paddingHorizontal: 20,
    fontSize: 0.02 * height,
    borderRadius: 0,
    width: '100%',
    height: 0.06 * height,
    padding: 0
  },
  input_md: {
    borderWidth: 1,
    borderBottomWidth: 1,
    borderRadius: 5,
    height: 0.05 * height,
  },
});
