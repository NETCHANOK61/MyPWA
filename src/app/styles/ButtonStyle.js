import { StyleSheet, Dimensions, Platform } from 'react-native';
const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
  btn_1: {
    backgroundColor: '#001064',
    height: 50,
    borderColor: '#001064',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn_login: {
    backgroundColor: '#3a405a',
    height: Platform.OS == 'ios' ? 0.05 * height : 0.055 * height,
    borderColor: '#3a405a',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn_finger: {
    backgroundColor: '#0077c2',
    height: 0.08 * height,
    borderColor: '#0077c2',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  btn_3: {
    backgroundColor: '#ffb300',
    height: 50,
    borderRadius: 10,
    borderColor: '#ffb300',
    marginTop: 20,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn_4: {
    backgroundColor: '#FFF',
    height: 50,
    borderRadius: 10,
    borderColor: '#283593',
    marginTop: 20,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
