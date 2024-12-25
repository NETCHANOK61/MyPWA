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

import textsty from "../../styles/TextStyle";
import DotElement from "../../components/dot/Dot";

const { height: viewReportHeight, width: viewReportWidth } =
  Dimensions.get("window");

const NotificationScreen = (props) => {
  // Mock data สำหรับรายการการแจ้งเตือน
  const [notifications, setNotifications] = useState([
    {
      id: "1",
      topic: "เรื่องร้องเรียนใหม่",
      no: "เลขที่แจ้งเตือน: S2024122000374",
      sub: "กปภ. สาขา: คลองหลวง",
      start_SLA: "20/12/2567 10:52:00",
      end_SLA: "21/12/2567 10:52:00",
      informer: "ผู้แจ้ง: ปราณี ทิศทอง เบอร์โทร: -",
      address:
        "สถานที่เกิดเหตุ: 39/210 หมู่ที่ พรธ หมู่บ้าน/อาคาร พรธิสาร4 คลองเจ็ด คลองหลวง ปทุมธานี",
      save_by: "ผู้รับแจ้ง: ณัฐพงศ์ แก้วจำเริญ",
    },
    {
      id: "2",
      topic: "เรื่องร้องเรียนใหม่",
      no: "เลขที่แจ้งเตือน: ...............",
      sub: "กปภ. สาขา: ......",
      start_SLA: "DD/MM/YYYY HH:MM:SS",
      end_SLA: "DD/MM/YYYY HH:MM:SS",
      informer: "ผู้แจ้ง: ........ เบอร์โทร: ...-...-....",
      address: "สถานที่เกิดเหตุ: ..............",
      save_by: "ผู้รับแจ้ง: ........",
    },
    {
      id: "3",
      topic: "เรื่องร้องเรียนใหม่",
      no: "เลขที่แจ้งเตือน: ...............",
      sub: "กปภ. สาขา: ......",
      start_SLA: "DD/MM/YYYY HH:MM:SS",
      end_SLA: "DD/MM/YYYY HH:MM:SS",
      informer: "ผู้แจ้ง: ........ เบอร์โทร: ...-...-....",
      address: "สถานที่เกิดเหตุ: ..............",
      save_by: "ผู้รับแจ้ง: ........",
    },
    {
      id: "4",
      topic: "เรื่องร้องเรียนใหม่",
      no: "เลขที่แจ้งเตือน: ...............",
      sub: "กปภ. สาขา: ......",
      start_SLA: "DD/MM/YYYY HH:MM:SS",
      end_SLA: "DD/MM/YYYY HH:MM:SS",
      informer: "ผู้แจ้ง: ........ เบอร์โทร: ...-...-....",
      address: "สถานที่เกิดเหตุ: ..............",
      save_by: "ผู้รับแจ้ง: ........",
    },
  ]);

  // ฟังก์ชันสำหรับการคลิกดูรายละเอียด
  const handleNotificationPress = (notification) => {
    alert(`เปิดดูรายละเอียด: ${notification.topic}`);
  };

  const renderNotificationItem = ({ item }) => (
    <TouchableOpacity style={styles.notificationItem}>
      <View style={{ flex: 1, alignItems: "flex-end" }}>
        {(item.id == 1 || item.id == 2) && <DotElement />}
        {(item.id == 3 || item.id == 4) && <Text style={textsty.read}>อ่านเมื่อ 19/12/2567</Text>}
      </View>
      <Text style={textsty.text_normal_bold_color_indigo}>{item.topic}</Text>
      <Text style={textsty.text_normal_bold_color_blue}>{item.no}</Text>
      <Text style={textsty.text_12}>{item.sub}</Text>
      <Text style={textsty.text_12}>{item.informer}</Text>
      <Text style={textsty.text_12}>{item.address}</Text>
      <Text style={textsty.text_12}>{item.save_by}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        style={styles.headerBackground}
        source={require("../../assets/images/bg_haed.png")}
      >
        {/* <Text style={styles.headerTitle}>การแจ้งเตือน</Text> */}
        <View style={styles.listContainer}>
          <FlatList
            data={notifications}
            keyExtractor={(item) => item.id}
            renderItem={renderNotificationItem}
            contentContainerStyle={styles.listContent}
          />
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  headerBackground: {
    flex: 1,
    justifyContent: "flex-start",
    height: 100,
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
});

export default NotificationScreen;
