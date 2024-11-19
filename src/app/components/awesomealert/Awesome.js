import React, { Component } from "react";
import PropTypes from "prop-types";
import { StyleSheet, Dimensions } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import AwesomeAlert from "react-native-awesome-alerts";

const { width } = Dimensions.get("window");
const { height } = Dimensions.get("window");

function Awesome({
  visible = false,
  titleIcon = 1,
  showCancelButton = true,
  showConfirmButton = true,
  confirmText = "ยืนยัน",
  cancelText = "ปิด",
  textBody = "",
  onConfirmPress = () => {},
  onCancelPress = () => {},
}) {
  let titleText = ""; // ตั้งค่าเป็นข้อความเปล่าเริ่มต้น

  // กำหนดข้อความให้ title ตาม titleIcon
  if (titleIcon == 1) {
    titleText = "Success";
  } else if (titleIcon == 2) {
    titleText = "Question";
  } else if (titleIcon == 3) {
    titleText = "Warning";
  } else if (titleIcon == 4) {
    titleText = "Error";
  }

  return (
    <AwesomeAlert
      show={visible}
      showProgress={false}
      contentContainerStyle={{ width: "100%" }}
      title={titleText}
      titleStyle={{ fontSize: 20, fontWeight: "bold" }}
      message={textBody}
      messageStyle={{
        fontSize: 17,
        color: "#000",
        textAlign: "center",
        fontFamily: "Prompt-Regular",
      }}
      closeOnTouchOutside={false}
      closeOnHardwareBackPress={false}
      showCancelButton={showCancelButton}
      showConfirmButton={showConfirmButton}
      tintColor="#fff"
      confirmText={confirmText}
      confirmButtonColor="#28a745"
      confirmButtonStyle={{
        width: 90,
        height: 45,
        alignItems: "center",
        borderRadius: 10,
        justifyContent: "center",
      }}
      confirmButtonTextStyle={{
        fontFamily: "Prompt-Regular",
        fontSize: 20,
        color: "#FFF",
        textAlign: "center",
      }}
      onConfirmPressed={onConfirmPress}
      onCancelPressed={onCancelPress}
      cancelText={cancelText}
      cancelButtonColor="#dc3545"
      cancelButtonStyle={{
        width: 90,
        height: 45,
        alignItems: "center",
        borderRadius: 10,
        justifyContent: "center",
      }}
      cancelButtonTextStyle={{
        fontFamily: "Prompt-Regular",
        fontSize: 20,
        color: "#FFF",
        textAlign: "center",
      }}
    />
  );
}

Awesome.propTypes = {
  visible: PropTypes.bool,
  titleIcon: PropTypes.number,
  onConfirmPress: PropTypes.func,
  onCancelPress: PropTypes.func,
  showCancelButton: PropTypes.bool,
  showConfirmButton: PropTypes.bool,
  confirmText: PropTypes.string,
  cancelText: PropTypes.string,
  textBody: PropTypes.string,
};

// Awesome.defaultProps = {
//   visible: false,
//   titleIcon: 1,
//   showCancelButton: true,
//   showConfirmButton: true,
//   confirmText: "ยืนยัน",
//   cancelText: "ปิด",
//   textBody: "",
//   onConfirmPress: () => {},
//   onCancelPress: () => {},
// };

export default Awesome;
const styles = StyleSheet.create({
  popupBtnClose: {
    color: "#FFF",
    fontSize: 22,
  },
  iconColorGreen: {
    color: "#28a745",
    fontSize: 0.23 * width,
  },
  iconColorRed: {
    color: "#dc3545",
    fontSize: 0.23 * width,
  },
  iconColorYellow: {
    color: "#ec971f",
    fontSize: 0.2 * width,
  },
  iconColorBlue: {
    color: "#2196F3",
    fontSize: 0.23 * width,
  },
});
