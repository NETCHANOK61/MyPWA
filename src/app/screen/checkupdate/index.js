import React, { Component } from "react";
import { StatusBar, Platform, ActivityIndicator, Linking, View, Text, Alert, TouchableOpacity } from "react-native";
import * as Updates from "expo-updates";
import { Button, Modal, Portal, Provider, Text as PaperText } from "react-native-paper";

export default class AppUpdateCheck extends Component {
  state = {
    isLoaded: false,
    showModalDialog: false,
    messageLoading: "กำลังตรวจอัพเดทเวอร์ชั่น",
  };

  async componentDidMount() {
    this.setState({ isLoaded: false });
    await this.checkForUpdates();
  }

  checkForUpdates = async () => {
    try {
      const update = await Updates.checkForUpdateAsync();
      if (update.isAvailable) {
        await Updates.fetchUpdateAsync();
        Alert.alert(
          "อัปเดตใหม่พร้อมใช้งาน",
          "กรุณารีสตาร์ทแอปเพื่อใช้งานเวอร์ชันล่าสุด",
          [{ text: "ตกลง", onPress: () => Updates.reloadAsync() }]
        );
      } else {
        this.setState({ isLoaded: true });
      }
    } catch (e) {
      Alert.alert("การตรวจสอบอัปเดตล้มเหลว", "โปรดลองอีกครั้ง");
      console.log("Error checking updates:", e);
    }
  };

  handleUpdateDialog = () => {
    this.setState({ showModalDialog: false });
    Linking.openURL(
      Platform.OS === "ios"
        ? "https://apps.apple.com/us/app/pwa-field-service/id1526115020"
        : "https://play.google.com/store/apps/details?id=com.pwa.smart1662.android"
    );
  };

  renderCheckUpdate = () => (
    <View style={{ height: "85%", justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator color={"#525F7F"} size={"large"} />
      <View style={{ marginTop: 10 }}>
        <Text>กำลังโหลด</Text>
      </View>
    </View>
  );

  render() {
    return (
      <Provider>
        <View style={{ flex: 1 }}>
          <View style={{ backgroundColor: "#ffffff" }}>
            <StatusBar backgroundColor={"#ffffff"} barStyle={"dark-content"} />
            {this.renderCheckUpdate()}
            <Portal>
              <Modal visible={this.state.showModalDialog} onDismiss={() => this.setState({ showModalDialog: false })}>
                <View style={{ padding: 20, backgroundColor: "white", borderRadius: 10 }}>
                  <StatusBar backgroundColor="rgba(0,0,0,0.5)" barStyle="dark-content" />
                  <PaperText style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>ข้อความแจ้งเตือน</PaperText>
                  <Button icon="close" mode="text" onPress={() => this.setState({ showModalDialog: false })}>
                    ปิด
                  </Button>
                  <PaperText style={{ textAlign: "center", fontSize: 16, color: "#000000" }}>
                    เรียนผู้ใช้บริการแอปพลิเคชัน PWA Field Service ขณะนี้มีการปรับปรุงรุ่นใหม่ ขอให้ท่านอัปเดตแอปพลิเคชันเพื่อใช้งานเวอร์ชันล่าสุด
                  </PaperText>
                  <Button mode="contained" onPress={this.handleUpdateDialog} style={{ marginTop: 20 }}>
                    ตกลง
                  </Button>
                </View>
              </Modal>
            </Portal>
          </View>
        </View>
      </Provider>
    );
  }
}