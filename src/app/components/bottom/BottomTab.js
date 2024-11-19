import React, {useEffect, useState} from 'react';
import {Dimensions, SafeAreaView} from 'react-native';
import {ButtonGroup} from 'react-native-elements';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
const {width, height} = Dimensions.get('window');

export default function BottomTab(props) {
  const icon_1 = () => (
    <MaterialCommunityIcons
      name="clipboard-text-outline"
      color="white"
      size={20}
    />
  );

  const icon_2 = () => (
    <MaterialCommunityIcons name="image-outline" color="white" size={20} />
  );
  const icon_3 = () => (
    <MaterialCommunityIcons name="wrench-outline" color="white" size={20} />
  );

  const buttons = [{element: icon_1}, {element: icon_2}, {element: icon_3}];
  return (
    <ButtonGroup
      onPress={bind => {
        props.switchTab(bind);
      }}
      selectedIndex={props.tab}
      buttons={buttons}
      containerStyle={{
        borderWidth: 0,
        width: width,
        marginLeft: 0,
        marginBottom: 0,
        height: 0.06 * height,
        backgroundColor: '#2c689e',
        borderRadius: 0,
      }}
      innerBorderStyle={{color: '#3a405a'}}
      buttonStyle={{backgroundColor: '#3a405a'}}>
      <SafeAreaView />
    </ButtonGroup>
  );
}
