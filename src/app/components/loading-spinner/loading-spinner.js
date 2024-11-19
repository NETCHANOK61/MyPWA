import React from 'react';
import {Modal, Text, ActivityIndicator, View} from 'react-native';
import styles from '../../styles/spinner-style';

export default function loadingspinner(props) {
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType={props.animation}
        transparent={true}
        visible={props.visible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <ActivityIndicator size="large" color={'#FFFFFF'} />
            <Text style={styles.modalText}>{props.textContent}</Text>
          </View>
        </View>
      </Modal>
    </View>
  );
}
