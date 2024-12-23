import React from "react";
import PropTypes from "prop-types";
import { Dimensions, StyleSheet, View } from "react-native";
import Dialog from "react-native-dialog";

const { width } = Dimensions.get("window");

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
  if (titleIcon === 1) {
    titleText = "Success";
  } else if (titleIcon === 2) {
    titleText = "Question";
  } else if (titleIcon === 3) {
    titleText = "Warning";
  } else if (titleIcon === 4) {
    titleText = "Error";
  }

  return (
    <Dialog.Container visible={visible}>
      <Dialog.Title>{titleText}</Dialog.Title>
      <Dialog.Description style={styles.messageStyle}>
        {textBody}
      </Dialog.Description>
      {showConfirmButton && (
        <Dialog.Button
          label={confirmText}
          onPress={onConfirmPress}
          style={styles.confirmButton}
        />
      )}
      {showCancelButton && (
        <Dialog.Button
          label={cancelText}
          onPress={onCancelPress}
          style={styles.cancelButton}
        />
      )}
    </Dialog.Container>
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

export default Awesome;

const styles = StyleSheet.create({
  messageStyle: {
    fontSize: 17,
    color: "#000",
    textAlign: "center",
    fontFamily: "Prompt-Regular",
  },
  confirmButton: {
    color: "#28a745",
    fontFamily: "Prompt-Regular",
  },
  cancelButton: {
    color: "#dc3545",
    fontFamily: "Prompt-Regular",
  },
});
