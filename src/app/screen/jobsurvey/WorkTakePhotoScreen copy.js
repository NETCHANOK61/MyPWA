import React, { useState, useEffect, useCallback } from 'react';
import {
  TextInput,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Image,
  BackHandler,
} from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ImagePicker from 'react-native-image-crop-picker';
import ImageResizer from 'react-native-image-resizer';
import RNFS from 'react-native-fs';
import Ionicons from 'react-native-vector-icons/Ionicons';

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');
import Awesome from '../../components/awesomealert/Awesome';
import * as workTakePhotoAction from '../../actions/jobsurvey/WorkTakePhotoAction';
import * as cameraAction from '../../actions/camera/CameraAction';
import Styles from '../../styles/WorkTakePhotoStyle';
import textStyle from '../../styles/TextStyle';
import ModalImage from '../../components/modal-image/index';
import LoadingSpinner from '../../components/loading-spinner/loading-spinner';

export default function WorkTakePhotoScreen(props) {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  const cameraReducer = useSelector(state => state.cameraReducer);
  const workSurveyReducer = useSelector(state => state.workSurveyReducer);
  const workTakePhotoReducer = useSelector(state => state.workTakePhotoReducer);
  const workRepairDetailReducer = useSelector(
    state => state.workRepairDetailReducer,
  );

  const [visibleLoading, setVisibleLoading] = useState(false);
  const [loadingText, setLoadingText] = useState('กำลังบันทึก');
  const [imagePreview, setImagePreview] = useState('');
  const [image_1, setImage_1] = useState('');
  const [image_2, setImage_2] = useState('');
  const [image_3, setImage_3] = useState('');
  const [imageApi_1, setImageApi_1] = useState('');
  const [imageApi_2, setImageApi_2] = useState('');
  const [imageApi_3, setImageApi_3] = useState('');

  const [comment_1, setComment_1] = useState('');
  const [comment_2, setComment_2] = useState('');
  const [comment_3, setComment_3] = useState('');
  const [imageSeq, setImageSeq] = useState(0);
  const [visableAlert, setVisibleAlert] = useState(false);
  const [customAlert, setCustomAlert] = useState({
    titleIcon: 0,
    showConfirmButton: false,
    showCancelButton: false,
    textBody: '',
    confirmText: '',
    cancelText: '',
    onConfirmPress: () => { },
    onCancelPress: () => { },
  });
  const [visiblePreviewImg, setVisiblePreviewImg] = useState(false);

  const init = async (isFocused) => {
    if (isFocused) {
      await setNavigationOption();
      await getInitialImage();
      await setStateCommentBegin();
    }
  }

  useEffect(() => {
    init(isFocused)
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );
    return () => {
      dispatch(cameraAction.setPhotoReset());
      backHandler.remove();
    };
  }, [isFocused]);

  const backAction = () => {
    handleCheckChange();
    return true;
  };

  const setStateCommentBegin = () => {
    if (props.route.params.image.length > 0) {
      setComment_1(props.route.params.image[0].comment);
    }

    if (props.route.params.image.length > 1) {
      setComment_2(props.route.params.image[1].comment);
    }

    if (props.route.params.image.length > 2) {
      setComment_3(props.route.params.image[2].comment);
    }
  };

  const setNavigationOption = () => {
    props.navigation.setOptions({
      title: setTitle(workSurveyReducer.target),
      headerTintColor: '#2c689e',
      headerTitleAlign: 'center',
      headerTitleStyle: {
        fontFamily: 'Prompt-Bold',
        fontSize: 0.02 * viewportHeight,
      },
      headerBackTitle: ' ',
      headerLeft: () => (
        <TouchableOpacity
          activeOpacity={0.1}
          onPress={() => handleCheckChange()}
          style={{ padding: 10 }}>
          <Ionicons
            name="chevron-back-outline"
            size={30}
            color="#2c689e"
            style={{
              height: 40,
              width: 25,
            }}
          />
        </TouchableOpacity>
      ),
    });
  };

  const handleCheckChange = () => {
    if (cameraReducer.photoseq != '0') {
      settingAlert('ALERT_BACK_STEP');
    } else {
      props.navigation.goBack();
    }
  };
  const setTitle = key => {
    let _title = '';
    switch (key) {
      case '1':
        _title = 'ก่อนซ่อม';
        break;

      case '2':
        _title = 'เตรียมการก่อนซ่อม';
        break;

      case '3':
        _title = 'ระหว่างซ่อม ';
        break;

      case '4':
        _title = 'เก็บงานคืนซ่อม';
        break;

      case '5':
        _title = 'หลังซ่อม';
        break;

      default:
        break;
    }
    return `แนบรูปภาพ${_title}`;
  };

  const getInitialImage = () => {
    setImageSeq(cameraReducer.photoseq);
    if (cameraReducer.photoseq != 0) {
      switch (cameraReducer.photoseq) {
        case 1:
          setImage_1(cameraReducer.base64);
          break;
        case 2:
          setImage_2(cameraReducer.base64);
          break;
        case 3:
          setImage_3(cameraReducer.base64);
          break;
        default:
          break;
      }

      setComment_1(cameraReducer.comment.comment_1);
      setComment_2(cameraReducer.comment.comment_2);
      setComment_3(cameraReducer.comment.comment_3);
    } else {
      // switch (props.route.params.image.length) {
      //   case 1:
      //     setImageApi_1(props.route.params.image[0]);
      //     break;
      //   case 2:
      //     setImageApi_1(props.route.params.image[0]);
      //     setImageApi_2(props.route.params.image[1]);
      //     break;
      //   case 3:
      //     setImageApi_1(props.route.params.image[0]);
      //     setImageApi_2(props.route.params.image[1]);
      //     setImageApi_3(props.route.params.image[2]);
      //     break;
      //   default:
      //     break;
      // }
      props.route.params.image.map((value, index) => {
        if (value.orderNo == '1') {
          setImageApi_1(value);
        }
        if (value.orderNo == '2') {
          setImageApi_2(value);
        }
        if (value.orderNo == '3') {
          setImageApi_3(value);
        }
      });
    }
  };

  const handleClickTaskCamera = imageSeq => {
    props.navigation.navigate('camera', {
      ImageSEQ: imageSeq,
      ImageType: 'LD',
      comment_1: comment_1,
      comment_2: comment_2,
      comment_3: comment_3,
    });
  };

  const selectPhotoTapped = imageSeq => {
    ImagePicker.openPicker({
      // width: 720,
      // height: 960,
      cropping: false,
      includeBase64: true,
      includeExif: true,
    }).then(async (image) => {
      let mode = 'contain';
      let onlyScaleDown = false;
      let resizedImage = await ImageResizer.createResizedImage(image.path, 720, 960, 'JPEG', 100, 0, undefined, false, { mode, onlyScaleDown }).then(async (resizedImage) => {
        return resizedImage;
      }).catch(err => { console.error(err) });
      // console.log('imagePath', resizedImage);
      let base64Image = await RNFS.readFile(resizedImage.uri, 'base64').then(res => { return res });
      // const ImageBase64 = image.data;
      setTimeout(() => {
        switch (imageSeq) {
          case 1:
            return setImage_1(base64Image);
          case 2:
            return setImage_2(base64Image);
          case 3:
            return setImage_3(base64Image);
          default:
            break;
        }
      }, 800);
    })
      .catch(e => console.log(e));
  };

  const setStateAlert = (
    _titleIcon,
    _showConfirmButton,
    _showCancelButton,
    _textBody,
    _confirmText,
    _cancelText,
    _onConfirmPress,
    _onCancelPress,
  ) => {
    setCustomAlert(state => ({
      ...state,
      titleIcon: _titleIcon,
      showConfirmButton: _showConfirmButton,
      showCancelButton: _showCancelButton,
      textBody: _textBody,
      confirmText: _confirmText,
      cancelText: _cancelText,
      onConfirmPress: _onConfirmPress,
      onCancelPress: _onCancelPress,
    }));
  };

  const settingAlert = key => {
    setVisibleLoading(false);
    if (key == 'ALERT_CONFIRM_SAVE_IMAGE') {
      setVisibleAlert(true);
      setStateAlert(
        2,
        true,
        true,
        'คุณต้องการบันทึกรูปภาพหรือไม่',
        'ตกลง',
        'ยกเลิก',
        () => {
          setVisibleAlert(false);
          setTimeout(() => {
            setVisibleLoading(true);
            handleSaveImages();
          }, 500);
        },
        () => {
          setVisibleAlert(false);
        },
      );
    } else {
      setTimeout(() => {
        switch (key) {
          case 'ALERT_LOAD_REPAIR_WORK':
            props.navigation.goBack();
            break;
          case 'ALERT_INSERT_SUCCESS':
            setVisibleAlert(true);
            setStateAlert(
              1,
              true,
              false,
              'บันทึกรูปภาพเรียบร้อย',
              'ตกลง',
              '',
              () => {
                setVisibleAlert(false);
                setTimeout(() => {
                  setLoadingText('กำลังโหลด');
                  setVisibleLoading(true);
                  dispatch(workTakePhotoAction.loadDataGetRepairWorkByID(props, settingAlert));
                }, 500);
              },
              () => { },
            );
            break;

          case 'ALERT_INSERT_FAILED':
            setVisibleAlert(true);
            setStateAlert(
              4,
              true,
              false,
              'ไม่สามารถบันทึกรูปภาพได้',
              'ตกลง',
              '',
              () => {
                setVisibleAlert(false);
              },
              () => { },
            );
            break;

          case 'ALERT_PREVIEW_IMAGE_FAILED':
            setVisibleAlert(true);
            setStateAlert(
              3,
              true,
              false,
              'ไม่สามารถแสดงรูปภาพได้',
              'ตกลง',
              '',
              () => {
                setVisibleAlert(false);
              },
              () => { },
            );
            break;

          case 'ALERT_BACK_STEP':
            setVisibleAlert(true);
            setStateAlert(
              2,
              true,
              true,
              'กด "ตกลง" เพื่อทำการบันทึกข้อมูลต่อ หรือ กด "ยกเลิก" สำหรับยกเลิกการรายการ',
              'ตกลง',
              'ยกเลิก',
              () => {
                setVisibleAlert(false);
              },
              () => {
                setVisibleAlert(false);
                setTimeout(() => {
                  props.navigation.goBack();
                }, 800);
              },
            );
            break;
          default:
            break;
        }
      }, 800);
    }
  };

  const handleSaveImages = () => {
    const file = [];

    if ((image_1 != '' && typeof image_1 === 'string') || comment_1 != '') {
      file.push({
        FileName: 'image1.jpg',
        No: props.route.params.no,
        OrderNo: '1',
        Comment: comment_1,
        Base64File: image_1,
      });
    }
    if ((image_2 != '' && typeof image_2 === 'string') || comment_2 != '') {
      file.push({
        FileName: 'image2.jpg',
        No: props.route.params.no,
        OrderNo: '2',
        Comment: comment_2,
        Base64File: image_2,
      });
    }

    if ((image_3 != '' && typeof image_3 === 'string') || comment_3 != '') {
      file.push({
        FileName: 'image3.jpg',
        No: props.route.params.no,
        OrderNo: '3',
        Comment: comment_3,
        Base64File: image_3,
      });
    }

    dispatch(workTakePhotoAction.savePhoto(props, file, settingAlert));
  };

  const openPreviewImage = image => {
    if (image == '') {
      settingAlert('ALERT_PREVIEW_IMAGE_FAILED');
    } else {
      setImagePreview(image);
      setVisiblePreviewImg(true);
    }
  };

  const closePreviewImage = () => {
    setVisiblePreviewImg(false);
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', backgroundColor: 'white' }}>
      <ScrollView>
        <View style={Styles.section}>
          <View style={Styles.step}>
            <Text style={textStyle.text_normal_bold_color_blue}>รูปที่ 1</Text>
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity
                onPress={() => {
                  openPreviewImage(
                    imageApi_1 != ''
                      ? props.route.params.image[0].htmlFile
                      : image_1 != ''
                        ? 'data:image/jpeg;base64,' + image_1
                        : '',
                  );
                }}>
                <FontAwesome5
                  name="image"
                  style={[{ fontSize: 0.06 * viewportWidth, color: '#2c689e' }]}
                />
              </TouchableOpacity>
              <View style={{ paddingHorizontal: 5 }} />
              <TouchableOpacity
                onPress={() => {
                  selectPhotoTapped(1);
                }}>
                <FontAwesome5
                  name="download"
                  style={[{ fontSize: 0.05 * viewportWidth, color: '#f44336' }]}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={Styles.row}>
            {image_1 == '' && imageApi_1 == '' ? (
              <TouchableOpacity
                style={Styles.itemboxImage}
                onPress={() => {
                  handleClickTaskCamera(1);
                }}>
                <FontAwesome5
                  name="camera"
                  style={[{ fontSize: 0.15 * viewportWidth, color: '#FFF' }]}
                />
              </TouchableOpacity>
            ) : imageApi_1 != '' && image_1 == '' ? (
              <TouchableOpacity
                style={Styles.itemboxImage}
                onPress={() => {
                  handleClickTaskCamera(1);
                }}>
                <Image
                  style={Styles.itemboxImage2}
                  source={{ uri: props.route.params.image[0].htmlFile }}
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={Styles.itemboxImage}
                onPress={() => {
                  handleClickTaskCamera(1);
                }}>
                <Image
                  style={Styles.itemboxImage2}
                  source={{ uri: 'data:image/jpeg;base64,' + image_1 }}
                />
              </TouchableOpacity>
            )}
            <TextInput
              style={[Styles.textInputMultiImage, { color: 'black' }]}
              multiline={true}
              numberOfLines={5}
              textAlignVertical={'top'}
              placeholder={'รายละเอียดรูปภาพ'}
              placeholderTextColor={'#ddd'}
              value={comment_1}
              onChangeText={text => {
                setComment_1(text);
              }}
            />
          </View>
          <View style={Styles.step}>
            <Text style={textStyle.text_normal_bold_color_blue}>รูปที่ 2</Text>
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity
                onPress={() => {
                  openPreviewImage(
                    imageApi_2 != ''
                      ? props.route.params.image[1].htmlFile
                      : image_2 != ''
                        ? 'data:image/jpeg;base64,' + image_2
                        : '',
                  );
                }}>
                <FontAwesome5
                  name="image"
                  style={[{ fontSize: 0.06 * viewportWidth, color: '#2c689e' }]}
                />
              </TouchableOpacity>
              <View style={{ paddingHorizontal: 5 }} />
              <TouchableOpacity
                onPress={() => {
                  selectPhotoTapped(2);
                }}>
                <FontAwesome5
                  name="download"
                  style={[{ fontSize: 0.05 * viewportWidth, color: '#f44336' }]}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={Styles.row}>
            {image_2 == '' && imageApi_2 == '' ? (
              <TouchableOpacity
                style={Styles.itemboxImage}
                onPress={() => {
                  handleClickTaskCamera(2);
                }}>
                <FontAwesome5
                  name="camera"
                  style={[{ fontSize: 0.15 * viewportWidth, color: '#FFF' }]}
                />
              </TouchableOpacity>
            ) : imageApi_2 != '' && image_2 == '' ? (
              <TouchableOpacity
                style={Styles.itemboxImage}
                onPress={() => {
                  handleClickTaskCamera(2);
                }}>
                <Image
                  style={Styles.itemboxImage2}
                  source={{ uri: props.route.params.image[1].htmlFile }}
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={Styles.itemboxImage}
                onPress={() => {
                  handleClickTaskCamera(2);
                }}>
                <Image
                  style={Styles.itemboxImage2}
                  source={{ uri: 'data:image/jpeg;base64,' + image_2 }}
                />
              </TouchableOpacity>
            )}
            <TextInput
              style={[Styles.textInputMultiImage, { color: 'black' }]}
              multiline={true}
              numberOfLines={5}
              textAlignVertical={'top'}
              placeholder={'รายละเอียดรูปภาพ'}
              placeholderTextColor={'#ddd'}
              value={comment_2}
              onChangeText={text => {
                setComment_2(text);
              }}
            />
          </View>

          <View style={Styles.step}>
            <Text style={textStyle.text_normal_bold_color_blue}>รูปที่ 3</Text>
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity
                onPress={() => {
                  openPreviewImage(
                    imageApi_3 != ''
                      ? props.route.params.image[2].htmlFile
                      : image_3 != ''
                        ? 'data:image/jpeg;base64,' + image_3
                        : '',
                  );
                }}>
                <FontAwesome5
                  name="image"
                  style={[{ fontSize: 0.06 * viewportWidth, color: '#2c689e' }]}
                />
              </TouchableOpacity>
              <View style={{ paddingHorizontal: 5 }} />
              <TouchableOpacity
                onPress={() => {
                  selectPhotoTapped(3);
                }}>
                <FontAwesome5
                  name="download"
                  style={[{ fontSize: 0.05 * viewportWidth, color: '#f44336' }]}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={Styles.row}>
            {image_3 == '' && imageApi_3 == '' ? (
              <TouchableOpacity
                style={Styles.itemboxImage}
                onPress={() => {
                  handleClickTaskCamera(3);
                }}>
                <FontAwesome5
                  name="camera"
                  style={[{ fontSize: 0.15 * viewportWidth, color: '#FFF' }]}
                />
              </TouchableOpacity>
            ) : imageApi_3 != '' && image_3 == '' ? (
              <TouchableOpacity
                style={Styles.itemboxImage}
                onPress={() => {
                  handleClickTaskCamera(3);
                }}>
                <Image
                  style={Styles.itemboxImage2}
                  source={{ uri: props.route.params.image[2].htmlFile }}
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={Styles.itemboxImage}
                onPress={() => {
                  handleClickTaskCamera(3);
                }}>
                <Image
                  style={Styles.itemboxImage2}
                  source={{ uri: 'data:image/jpeg;base64,' + image_3 }}
                />
              </TouchableOpacity>
            )}
            <TextInput
              style={[Styles.textInputMultiImage, { color: 'black' }]}
              multiline={true}
              numberOfLines={5}
              textAlignVertical={'top'}
              placeholder={'รายละเอียดรูปภาพ'}
              placeholderTextColor={'#ddd'}
              value={comment_3}
              onChangeText={text => {
                setComment_3(text);
              }}
            />
          </View>
        </View>
        <View style={Styles.itemFooter}>
          <TouchableOpacity
            iconLeft
            transparent
            style={Styles.itemBtnActive}
            onPress={() => {
              settingAlert('ALERT_CONFIRM_SAVE_IMAGE');
            }}>
            <MaterialIcons name="save" style={Styles.itemIcon} />
            <Text style={[{ color: 'white' }, textStyle.text_normal_bold]}>
              บันทึกรูปภาพ
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <LoadingSpinner
        visible={visibleLoading}
        textContent={loadingText}
        animation={'fade'}
        color={'#0000ff'}
      />
      <Awesome
        visible={visableAlert}
        titleIcon={customAlert.titleIcon}
        showConfirmButton={customAlert.showConfirmButton}
        showCancelButton={customAlert.showCancelButton}
        textBody={customAlert.textBody}
        confirmText={customAlert.confirmText}
        cancelText={customAlert.cancelText}
        onConfirmPress={customAlert.onConfirmPress}
        onCancelPress={customAlert.onCancelPress}
      />

      <ModalImage
        visible={visiblePreviewImg}
        close={closePreviewImage}
        image={imagePreview}
      />
    </View>
  );
}
