import { StyleSheet, Dimensions, Platform } from 'react-native';
const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    width: 150,
    height: 120,
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    ...Platform.select({
      ios: {
        elevation: 5,
      },
    }),
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginTop: 20,
    textAlign: 'center',
    color: 'white',
    fontSize: 0.034 * width,
    fontFamily: 'Prompt-Bold',
  },
});
