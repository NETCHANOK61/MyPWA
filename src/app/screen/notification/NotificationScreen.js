import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
  StyleSheet,
} from "react-native";

const { height: viewReportHeight, width: viewReportWidth } =
  Dimensions.get("window");

const NotificationScreen = (props) => {
  // Mock data สำหรับรายการการแจ้งเตือน
  const [notifications, setNotifications] = useState([
    { id: "1", title: "งานใหม่", description: "ตรวจสอบสถานะการทำงานล่าสุด" },
    { id: "2", title: "อัปเดตระบบ", description: "ระบบมีการอัปเดตเวอร์ชันใหม่" },
    { id: "3", title: "เตือนความจำ", description: "ตรวจสอบงานที่ยังไม่เสร็จสิ้น" },
  ]);

  // ฟังก์ชันสำหรับการคลิกดูรายละเอียด
  const handleNotificationPress = (notification) => {
    alert(`เปิดดูรายละเอียด: ${notification.title}`);
  };

  const renderNotificationItem = ({ item }) => (
    <TouchableOpacity
      style={styles.notificationItem}
      onPress={() => handleNotificationPress(item)}
    >
      <Text style={styles.notificationTitle}>{item.title}</Text>
      <Text style={styles.notificationDescription}>{item.description}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        style={styles.headerBackground}
        source={require("../../assets/images/bg_haed.png")}
      >
        {/* <Text style={styles.headerTitle}>การแจ้งเตือน</Text> */}
      </ImageBackground>
      <View style={styles.listContainer}>
        <FlatList
          data={notifications}
          keyExtractor={(item) => item.id}
          renderItem={renderNotificationItem}
          contentContainerStyle={styles.listContent}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerBackground: {
    width: "100%",
    height: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  listContainer: {
    flex: 1,
    padding: 10,
  },
  listContent: {
    paddingBottom: 20,
  },
  notificationItem: {
    backgroundColor: "#f9f9f9",
    padding: 15,
    marginVertical: 8,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  notificationDescription: {
    fontSize: 14,
    color: "#555",
  },
});

export default NotificationScreen;
