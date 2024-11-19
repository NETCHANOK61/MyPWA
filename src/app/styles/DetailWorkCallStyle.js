import {StyleSheet, Platform, Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');
export default StyleSheet.create({
  card: {
    padding: 0,
    marginLeft: 0,
    marginRight: 0,
    marginTop: 5,
    borderColor: 'white',
    shadowOffset: {height: 0, width: 0},
    shadowOpacity: 0,
    shadowRadius: 0,

    ...Platform.select({
      ios: {shadowColor: 'rgba(0,0,0, .2)'},
      android: {
        elevation: 0,
      },
    }),
  },
  buttonGroup: {
    borderWidth: 0,
    width: width,
    marginLeft: 0,
    marginBottom: 0,
    height: 0.07 * height,
    backgroundColor: '#3a405a',
  },
  picker: {
    width: 0.86 * width,
    height: 50,
    color: 'white',
    backgroundColor: 'transparent',
  },
  image: {
    alignItems: 'center',
    height: 0.28 * width,
    width: 0.28 * width,
  },
  textInputMultiImage: {
    fontFamily: 'Prompt-Regular',
    borderWidth: 1,
    borderColor: '#DDD',
    color: 'black',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    fontSize: 0.04 * width,
    width: '100%',
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
  sublable: {
    flex: 1,
    flexDirection: 'row',
    marginVertical: 2,
  },

  dropdown2BtnStyle: {
    width: '100%',
    height: 40,
    backgroundColor: '#FFF',
    borderRadius: 8,
    borderWidth: 1,

    borderColor: '#DDD',
  },
  dropdown2BtnTxtStyle: {
    color: '#444',
    textAlign: 'left',
    fontSize: 0.02 * height,
    fontFamily: 'Prompt-Regular',
  },
  dropdown2DropdownStyle: {backgroundColor: 'white'},
  dropdown2RowStyle: {backgroundColor: '#EFEFEF', borderBottomColor: '#C5C5C5'},
  dropdown2RowTxtStyle: {
    color: '#444',
    textAlign: 'left',
    fontSize: 0.02 * height,
    fontFamily: 'Prompt-Regular',
  },
});
