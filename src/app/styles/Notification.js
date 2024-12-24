import { StyleSheet } from 'react-native';
export default StyleSheet.create({
    badgeContainer: {
      position: "absolute",
      right: -6,
      top: -4,
      backgroundColor: "red",
      borderRadius: 10,
      width: 20,
      height: 20,
      justifyContent: "center",
      alignItems: "center",
    },
    badgeText: {
      color: "white",
      fontSize: 12,
      fontWeight: "bold",
    },
  });