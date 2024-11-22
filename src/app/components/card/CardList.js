import React from "react";
import { Image, Dimensions } from "react-native";
import { View, Text, Divider, NativeBaseProvider, HStack } from "native-base";
import { ListItem, Avatar } from "react-native-elements";
import profileStyle from "../../styles/ProfileStyle";
import textStyle from "../../styles/TextStyle";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
const { width: viewportWidth, height: viewportHeight } =
  Dimensions.get("window");

export default function CardList({ data, footerbutton }) {
  return (
    <NativeBaseProvider>
      <View>
        {data.map((l, i) => (
          <View key={i} bg={"#FFFF"} ml={2} mr={2}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                width: "100%",
                justifyContent: "space-between",
              }}
              p={3}
            >
              <HStack alignItems={"center"}>
                <MaterialCommunityIcons
                  name={l.icon_p}
                  color={profileStyle.icon_color.color}
                  size={30}
                />
                <Text
                  style={{
                    fontFamily: "Prompt-Bold",
                    fontSize: 15,
                    textAlign: "left",
                  }}
                >
                  {" " + l.name}
                </Text>
              </HStack>
              <Text
                style={[
                  textStyle.text_normal_bold_color_blue,
                  { fontSize: 15, textAlign: "left" },
                ]}
              >
                {l.lable}
              </Text>
            </View>
            <Divider w={"100%"} />
          </View>
        ))}
      </View>
      <View mt={3}>{footerbutton}</View>
    </NativeBaseProvider>
  );
}
