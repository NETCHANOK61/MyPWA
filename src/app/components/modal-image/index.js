import React, {useState} from 'react';
import {Alert, Modal, TouchableOpacity, Image, View} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import styles from './style';

export default function index(props) {
  return (
    <View style={styles.centeredView}>
      <Modal animationType="slide" transparent={true} visible={props.visible}>
        <View style={styles.centeredView}>
          <TouchableOpacity
            style={styles.closeBtn}
            onPress={() => props.close()}>
            <FontAwesome5 name="times-circle" size={30} />
          </TouchableOpacity>
          <View style={styles.modalView}>
            {props.image != '' ? (
              <Image
                resizeMode="contain"
                style={styles.image}
                source={{uri: props.image}}
              />
            ) : null}
          </View>
        </View>
      </Modal>
    </View>
  );
}
