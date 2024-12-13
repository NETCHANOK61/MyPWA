import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {useIsFocused} from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
const {width: viewportWidth, height: viewportHeight} = Dimensions.get('window');
import workSurveyStyle from '../../styles/WorkSurveyStyle';
import * as workSurveyAction from '../../actions/jobsurvey/WorkSurveyAction';
export default function WorkSurveyScreen(props) {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  const workRepairDetailReducer = useSelector(
    state => state.workRepairDetailReducer,
  );
  const [colorPoint, setColorPoint] = useState('#999');

  useEffect(() => {
    if (isFocused) {
      getInitial();
    }
  }, [isFocused]);

  const getInitial = () => {
    if (workRepairDetailReducer.dataArray.survey != null) {
      if (
        workRepairDetailReducer.dataArray.survey.latitude != '' &&
        workRepairDetailReducer.dataArray.survey.longtitude != ''
      ) {
        setColorPoint('green');
      } else {
        setColorPoint('#999');
      }
    }
  };

  const tarGetTakePhoto = (key, files) => {
    if (key == 'point') {
      props.navigation.navigate('Savelocation', {
        rwId: workRepairDetailReducer.dataArray.rwId,
        rwCode: workRepairDetailReducer.dataArray.rwCode,
        data: props.data,
      });
    } else {
      dispatch(workSurveyAction.workSurveyTargetImage(key));
      props.navigation.navigate('WorkTakePhotoScreen', {
        rwId: workRepairDetailReducer.dataArray.rwId,
        rwCode: workRepairDetailReducer.dataArray.rwCode,
        no: key,
        image: files,
      });
    }
  };
  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <ScrollView scrollEnabled={false}>
        <View style={workSurveyStyle.section}>
          <View style={workSurveyStyle.row}>
            <TouchableOpacity
              style={{
                backgroundColor: colorPoint,
                borderRadius: 5,
                width: '49%',
                alignItems: 'center',
                height: 'auto',
              }}
              onPress={() => {
                tarGetTakePhoto('point', []);
              }}>
              <MaterialCommunityIcons
                name="map-marker-radius-outline"
                style={{
                  fontSize: 0.13 * viewportWidth,
                  marginTop: 20,
                  color: '#FFF',
                }}
              />
              <Text style={workSurveyStyle.label5}>ลงจุดซ่อม</Text>
            </TouchableOpacity>
            <View style={{width: '2%'}}></View>
            <TouchableOpacity
              style={{
                backgroundColor: '#999',
                borderRadius: 5,
                width: '49%',
                alignItems: 'center',
                height: 'auto',
              }}
              onPress={() => {
                tarGetTakePhoto(
                  '1',
                  workRepairDetailReducer.dataArray.process == null
                    ? []
                    : workRepairDetailReducer.dataArray.process.files1.files,
                );
              }}>
              <View style={{flexDirection: 'row', marginTop: 15}}>
                <FontAwesome5
                  name="image"
                  style={[
                    {
                      color: '#FFFFFF',
                      fontFamily: 'Montserrat-Regular',
                      fontSize: 0.05 * viewportWidth,
                    },
                    {fontSize: 0.15 * viewportWidth},
                  ]}
                />
                <Text style={workSurveyStyle.label4}>
                  {workRepairDetailReducer.dataArray.process == null
                    ? '0'
                    : workRepairDetailReducer.dataArray.process.files1.count}
                </Text>
              </View>
              <Text style={workSurveyStyle.label3}>ก่อนซ่อม</Text>
            </TouchableOpacity>
          </View>
          <View style={workSurveyStyle.row}>
            <TouchableOpacity
              style={{
                backgroundColor: '#999',
                borderRadius: 5,
                width: '49%',
                alignItems: 'center',
                height: 'auto',
              }}
              onPress={() => {
                tarGetTakePhoto(
                  '2',
                  workRepairDetailReducer.dataArray.process == null
                    ? []
                    : workRepairDetailReducer.dataArray.process.files2.files,
                );
              }}>
              <View style={{flexDirection: 'row', marginTop: 15}}>
                <FontAwesome5
                  name="image"
                  style={[
                    {
                      color: '#FFFFFF',
                      fontFamily: 'Montserrat-Regular',
                      fontSize: 0.05 * viewportWidth,
                    },
                    {fontSize: 0.15 * viewportWidth},
                  ]}
                />
                <Text style={workSurveyStyle.label4}>
                  {workRepairDetailReducer.dataArray.process == null
                    ? '0'
                    : workRepairDetailReducer.dataArray.process.files2.count}
                </Text>
              </View>
              <Text style={workSurveyStyle.label3}>เตรียมการก่อนซ่อม</Text>
            </TouchableOpacity>
            <View style={{width: '2%'}}></View>
            <TouchableOpacity
              style={{
                backgroundColor: '#999',
                borderRadius: 5,
                width: '49%',
                alignItems: 'center',
                height: 'auto',
              }}
              onPress={() => {
                tarGetTakePhoto(
                  '3',
                  workRepairDetailReducer.dataArray.process == null
                    ? []
                    : workRepairDetailReducer.dataArray.process.files3.files,
                );
              }}>
              <View style={{flexDirection: 'row', marginTop: 15}}>
                <FontAwesome5
                  name="image"
                  style={[
                    {
                      color: '#FFFFFF',
                      fontFamily: 'Montserrat-Regular',
                      fontSize: 0.05 * viewportWidth,
                    },
                    {fontSize: 0.15 * viewportWidth},
                  ]}
                />
                <Text style={workSurveyStyle.label4}>
                  {workRepairDetailReducer.dataArray.process == null
                    ? '0'
                    : workRepairDetailReducer.dataArray.process.files3.count}
                </Text>
              </View>
              <Text style={workSurveyStyle.label3}>ระหว่างซ่อม</Text>
            </TouchableOpacity>
          </View>
          <View style={workSurveyStyle.row}>
            <TouchableOpacity
              style={{
                backgroundColor: '#999',
                borderRadius: 5,
                width: '49%',
                alignItems: 'center',
                height: 'auto',
              }}
              onPress={() => {
                tarGetTakePhoto(
                  '4',
                  workRepairDetailReducer.dataArray.process == null
                    ? []
                    : workRepairDetailReducer.dataArray.process.files4.files,
                );
              }}>
              <View style={{flexDirection: 'row', marginTop: 15}}>
                <FontAwesome5
                  name="image"
                  style={[
                    {
                      color: '#FFFFFF',
                      fontFamily: 'Montserrat-Regular',
                      fontSize: 0.05 * viewportWidth,
                    },
                    {fontSize: 0.15 * viewportWidth},
                  ]}
                />
                <Text style={workSurveyStyle.label4}>
                  {workRepairDetailReducer.dataArray.process == null
                    ? '0'
                    : workRepairDetailReducer.dataArray.process.files4.count}
                </Text>
              </View>
              <Text style={workSurveyStyle.label3}>เก็บงานคืนซ่อม</Text>
            </TouchableOpacity>
            <View style={{width: '2%'}}></View>
            <TouchableOpacity
              style={{
                backgroundColor: '#999',
                borderRadius: 5,
                width: '49%',
                alignItems: 'center',
                height: 'auto',
              }}
              onPress={() => {
                tarGetTakePhoto(
                  '5',
                  workRepairDetailReducer.dataArray.process == null
                    ? []
                    : workRepairDetailReducer.dataArray.process.files5.files,
                );
              }}>
              <View style={{flexDirection: 'row', marginTop: 15}}>
                <FontAwesome5
                  name="image"
                  style={[
                    {
                      color: '#FFFFFF',
                      fontFamily: 'Montserrat-Regular',
                      fontSize: 0.05 * viewportWidth,
                    },
                    {fontSize: 0.15 * viewportWidth},
                  ]}
                />
                <Text style={workSurveyStyle.label4}>
                  {workRepairDetailReducer.dataArray.process == null
                    ? '0'
                    : workRepairDetailReducer.dataArray.process.files5.count}
                </Text>
              </View>
              <Text style={workSurveyStyle.label3}>หลังซ่อม</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
