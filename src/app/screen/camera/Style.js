const React = require('react-native');
import {Dimensions} from 'react-native';
const {width: viewportWidth, height: viewportHeight} = Dimensions.get('window');
export default {
  container: {
    flex: 1,
    justifyContent: "center",
  },
    message: {
    textAlign: "center",
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
    justifyContent: "flex-end",
  },
  preview: {
    flex: 1,
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 10,
    borderRadius: 10,
  },
  text: {
    fontSize: 18,
    color: "white",
  },
  buttonTakecamera: {
    flex: 0.3,
    marginHorizontal: 2,
    marginBottom: 5,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnImg: {
    marginBottom: 0,
  },
  flipButton: {
    flex: 0.3,
    height: 40,
    marginHorizontal: 2,
    marginBottom: 20,
    marginTop: 20,
    borderRadius: 8,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  spinnerTextStyle: {
    fontFamily: 'THSarabunNew-Bold',
    color: '#FFF',
    fontSize: 24,
  },
  flipIcon: {
    flex: 0.3,
    height: 40,
    marginBottom: 3,
    marginTop: 20,
    alignItems: 'center',
  },
  flipText: {
    color: 'white',
    fontSize: 0.04 * viewportWidth,
  },
  zoomText: {
    position: 'absolute',
    bottom: 70,
    zIndex: 2,
    left: 2,
  },
  picButton: {
    backgroundColor: 'darkseagreen',
  },
};
