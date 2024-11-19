import {StyleSheet, Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');
export default StyleSheet.create({
  btn_menu: {
    flex: 1,
    alignItems: 'center',
  },
  img: {
    height: 0.15 * width,
    width: 0.15 * width,
  },
  card: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,

    elevation: 10,
  },
  icon_color: {
    color: '#3a405a',
  },
});
