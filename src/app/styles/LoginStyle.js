import { StyleSheet, Dimensions, Platform } from 'react-native';
const { width } = Dimensions.get('window');
const { height } = Dimensions.get('window');
const aspectRatio = height / width;

export default StyleSheet.create({
  view_img_welcome_logo: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  bgCover: {
    flex: 1,
    resizeMode: 'cover',
  },
  loginbg: {
    marginLeft: 20,
    marginRight: 20,

    borderRadius: 5,
    elevation: 10,
    shadowOffset: {
      width: 15,
      height: 15,
    },
    shadowOpacity: 0.1,
    shadowRadius: 0,
    ...Platform.select({
      ios: {
        shadowOffset: {
          width: 5,
          height: 5,
        },
      },
    }),
    margin: 2,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconEye: {
    width: aspectRatio > 1.6 ? 0.075 * width : 0.05 * width,
    height: 0.035 * height,
    tintColor: 'rgba(0,0,0,0.2)',
  },
  btnEye: {
    position: 'absolute',
    top: aspectRatio > 1.6 ? 0.01 * height : 0.017 * height,
    right: 10,
    marginTop: 3
  },
});
