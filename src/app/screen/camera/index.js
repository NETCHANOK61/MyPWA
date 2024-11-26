import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  Dimensions,
  Image,
} from 'react-native';
// import {
//   ifIphoneX,
//   getBottomSpace,
//   getStatusBarHeight,
// } from 'react-native-iphone-x-helper';
import { NativeBaseProvider, Box } from 'native-base'
import { useDispatch } from 'react-redux';
// import { RNCamera } from 'react-native-camera';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// import Permissions from 'react-native-permissions';
import ImageResizer from 'react-native-image-resizer';
import RNFS from 'react-native-fs';

import LoadingSpinner from '../../components/loading-spinner/loading-spinner';
import * as cameraAction from '../../actions/camera/CameraAction';

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

import styles from './Style';

export default index = props => {
  const dispatch = useDispatch();
  let cameraRef = useRef(null);
  const [flash, setFlash] = useState('off');
  const [zoom, setZoom] = useState(0);
  const [autoFocus, setAutoFocus] = useState('on');
  const [type, setType] = useState('back');
  const [whiteBalance, setWhiteBalance] = useState('auto');
  const [imageUrl, setImageUrl] = useState('');
  const [imageSEQ, setImageSEQ] = useState(0);
  const [imageType, setImageType] = useState('');
  const [permission, setPermission] = useState('undetermined');
  const [visibleLoading, setVisibleLoading] = useState(false);

  const [comment, setComment] = useState({
    comment_1: '',
    comment_2: '',
    comment_3: '',
  });

  const init = () => {
    setImageSEQ(props.route.params.ImageSEQ);
    setImageType(props.route.params.ImageType);
    setComment(current => ({
      ...current,
      comment_1: props.route.params.comment_1,
      comment_2: props.route.params.comment_2,
      comment_3: props.route.params.comment_3,
    }));

    Permissions.check('photo').then(response => {
      setPermission(response);
    });
  }

  useEffect(() => {
    init();
  }, []);

  const flashModeOrder = {
    off: 'on',
    on: 'auto',
    auto: 'torch',
    torch: 'off',
  };

  const wbOrder = {
    auto: 'sunny',
    sunny: 'cloudy',
    cloudy: 'shadow',
    shadow: 'fluorescent',
    fluorescent: 'incandescent',
    incandescent: 'auto',
  };

  const toggleFlash = () => {
    setFlash(flashModeOrder[flash]);
  };

  const toggleWB = () => {
    setWhiteBalance(wbOrder[whiteBalance]);
  };

  const toggleFacing = () => {
    setType(type === 'black' ? 'front' : 'back');
  };

  const toggleFocus = () => {
    setAutoFocus(autoFocus === 'on' ? 'off' : 'on');
  };

  const zoomOut = () => {
    setZoom(zoom - 0.1 < 0 ? 0 : zoom - 0.1);
  };

  const zoomIn = () => {
    setZoom(zoom + 0.1 > 1 ? 1 : zoom + 0.1);
  };

  const takePicture = async () => {
    if (cameraRef) {
      setVisibleLoading(true);
      // const options = {
      //   quality: 0.5,
      //   base64: true,
      //   forceUpOrientation: true,
      //   fixOrientation: true,
      //   // width: 720,
      //   // height: 960,
      // };
      const options = { quality: 100, doNotSave: false };

      await cameraRef.current.takePictureAsync(options)
        .then(async (data) => {
          let mode = 'contain';
          let onlyScaleDown = false;
          let resizedImage = await ImageResizer.createResizedImage(data.uri, 720, 960, 'JPEG', 100, 0, undefined, false, { mode, onlyScaleDown }).then(async (resizedImage) => {
            return resizedImage;
          }).catch(err => { console.error(err) });
          // console.log('imagePath', resizedImage);
          let base64Image = await RNFS.readFile(resizedImage.uri, 'base64').then(res => { return res });
          setTimeout(() => {
            setVisibleLoading(false);
            dispatch(
              cameraAction.setPhoto(base64Image, imageSEQ, imageType, comment),
            );
            props.navigation.goBack();
          }, 800);
        })
        .catch(err => console.error(err));
    }
  };

  // const renderCamera = () => {
  //   return (
  //     <RNCamera ref={cameraRef} style={{ flex: 1 }} type={type} flashMode={flash}>
  //       <View
  //         style={{
  //           flex: 0.5,
  //           backgroundColor: 'transparent',
  //           flexDirection: 'row',
  //           justifyContent: 'space-around',
  //           ...ifIphoneX(
  //             {
  //               paddingTop: getStatusBarHeight(),
  //             },
  //             {
  //               paddingTop: 0,
  //             },
  //           ),
  //         }}>
  //         <TouchableOpacity
  //           style={styles.flipIcon}
  //           onPress={() => {
  //             props.navigation.goBack();
  //           }}>
  //           <FontAwesome
  //             active
  //             name="arrow-left"
  //             style={{ color: 'white', fontSize: 0.06 * viewportWidth }}
  //           />
  //         </TouchableOpacity>

  //         <TouchableOpacity
  //           style={styles.flipIcon}
  //           onPress={() => {
  //             toggleFacing();
  //           }}>
  //           <FontAwesome
  //             name="refresh"
  //             type="FontAwesome"
  //             style={{ color: 'white', fontSize: 0.06 * viewportWidth }}
  //           />
  //         </TouchableOpacity>

  //         <TouchableOpacity
  //           style={styles.flipIcon}
  //           onPress={() => {
  //             toggleFlash();
  //           }}>
  //           <Ionicons
  //             name="ios-flash"
  //             type="Ionicons"
  //             style={{ color: 'white', fontSize: 0.06 * viewportWidth }}
  //           />
  //           <Text style={styles.flipText}> {flash} </Text>
  //         </TouchableOpacity>

  //         <TouchableOpacity
  //           style={styles.flipIcon}
  //           onPress={() => {
  //             toggleFocus();
  //           }}>
  //           <MaterialIcons
  //             name="center-focus-strong"
  //             style={{ color: 'white', fontSize: 0.06 * viewportWidth }}
  //           />
  //           <Text style={styles.flipText}> {autoFocus} </Text>
  //         </TouchableOpacity>

  //         <TouchableOpacity
  //           style={styles.flipIcon}
  //           onPress={() => {
  //             toggleWB();
  //           }}>
  //           <FontAwesome
  //             name="magic"
  //             style={{
  //               color: 'white',
  //               fontSize: 0.06 * viewportWidth,
  //             }}
  //           />
  //           <Text style={styles.flipText}> {whiteBalance}</Text>
  //         </TouchableOpacity>
  //       </View>
  //       <View
  //         style={{
  //           flex: 0.4,
  //           backgroundColor: 'transparent',
  //           flexDirection: 'row',
  //           alignSelf: 'flex-end',
  //         }}></View>
  //       <LoadingSpinner
  //         width={0.75 * viewportWidth}
  //         height={0.18 * viewportHeight}
  //         visible={visibleLoading}
  //         textContent="กำลังโหลด"
  //         color={'#0000ff'}
  //       />
  //       <View
  //         style={{
  //           flex: 0.3,
  //           backgroundColor: 'transparent',
  //           flexDirection: 'row',
  //           alignSelf: 'center',
  //           marginBottom: getBottomSpace(),
  //         }}>
  //         <TouchableOpacity
  //           style={[styles.flipButton, { flex: 0.1, alignSelf: 'flex-end' }]}
  //           onPress={() => {
  //             zoomIn();
  //           }}>
  //           {/* <Text style={styles.flipText}> + </Text> */}
  //           <MaterialIcons
  //             name="zoom-in"
  //             type="MaterialIcons"
  //             style={{ color: 'white', fontSize: 0.09 * viewportWidth }}
  //           />
  //         </TouchableOpacity>

  //         <TouchableOpacity
  //           style={[
  //             styles.buttonTakecamera,
  //             { flex: 0.3, alignSelf: 'flex-end' },
  //           ]}
  //           onPress={() => {
  //             takePicture();
  //           }}>
  //           <Image
  //             source={require('../../assets/images/btn_takecamera.png')}
  //             style={styles.btnImg}
  //           />
  //         </TouchableOpacity>

  //         <TouchableOpacity
  //           style={[styles.flipButton, { flex: 0.1, alignSelf: 'flex-end' }]}
  //           onPress={() => {
  //             zoomOut();
  //           }}>
  //           {/* <Text style={styles.flipText}> - </Text> */}
  //           <MaterialIcons
  //             name="zoom-out"
  //             type="MaterialIcons"
  //             style={{ color: 'white', fontSize: 0.09 * viewportWidth }}
  //           />
  //         </TouchableOpacity>
  //       </View>
  //     </RNCamera>
  //   );
  // };

  return (
    <NativeBaseProvider>
      <View style={{ flex: 1, backgroundColor: '#FFF' }}>
        <StatusBar backgroundColor="#000000" animated barStyle="light-content" />
        <Box safeAreaTop bg={'#000000'} />
        {/* {renderCamera()} */}
        <Box safeAreaBottom bg={'#000000'} />
      </View>
    </NativeBaseProvider>
  );
};
