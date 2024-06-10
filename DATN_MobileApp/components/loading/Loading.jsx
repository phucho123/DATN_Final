import React from "react";
import { View, Text, Image } from "react-native";
import * as Animatable from "react-native-animatable";

const Loading = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", gap: 8, backgroundColor: "#E0E8F7" }}>
      <Animatable.Text
        animation="pulse"
        delay={500}
        iterationCount="infinite"
        style={{ fontSize: 20, color: "#4285F4", fontWeight: "600" }}
      >
        Bạn chờ xíu nhé...
      </Animatable.Text>
      <Text style={{ fontSize: 20, color: "#4285F4", fontWeight: "600" }}>Hệ thống đang định vị vị trí lắp đặt</Text>
      <Image source={require("../../assets/images/logo.png")} style={{ height: 200, width: 200 }} />
    </View>
  );
};

export default Loading;
