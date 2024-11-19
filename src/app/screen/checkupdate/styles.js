import { Platform, Dimensions } from 'react-native';
const { width: viewportWidth, height: viewportHeight } = Dimensions.get("window");

export default {
  layoutFx: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? 0 : 0
  },
  viewTop: {
    alignItems: 'center',
    marginTop: '5%'
  },
  boxVersion: {
    marginRight: 3,
    ...ifIphoneX(
      { marginBottom: getBottomSpace() },
      { marginBottom: Platform.isPad == false ? 0 : 10 }
    ),
    alignSelf: 'center',
  },
  textReload: {
    fontFamily: 'Prompt-Regular',
    color: '#272a2f',
    fontSize: Platform.isPad == false ? 0.04 * viewportWidth : 0.025 * viewportWidth,
    padding: 10,
  },
  textversion: {
    fontFamily: 'Prompt-Regular',
    fontSize: Platform.isPad == false ? 0.03 * viewportWidth : 0.025 * viewportWidth,
    padding: 10,
  },
  boxCenter: {
    flex: 4,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center'
  },
  innerContainer: {
    width: '100%',
    margin: 10,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  textTitleModal: {
    fontFamily: 'Prompt-Bold',
    color: '#194f90'
  },
  textDescModal: {
    fontFamily: 'Prompt-Regular',
    color: '#194f90'
  },
  iconPopup: {
    fontSize: Platform.isPad == false ? 0.1 * viewportWidth : 0.04 * viewportWidth,
    color: '#ffa530'
  },
  btnClenJob: {
    backgroundColor: '#dc3545',
    borderRadius: 10,
    width: 90,
    alignItems: 'center',
    marginRight: 4,
  },
  textSearch: {
    color: '#FFFFFF',
    fontFamily: 'Prompt-Bold',
    paddingVertical: 2,
  },
};
