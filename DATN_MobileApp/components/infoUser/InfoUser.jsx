import React from "react";
import { View, Text } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

const InfoUser = ({ id, data }) => {
  return (
    <View style={{ backgroundColor: "#FFFFFF", paddingHorizontal: 20, paddingVertical: 20 }}>
      <View style={{ padding: 16, backgroundColor: "#CDDEFD", borderRadius: 20 }}>
        <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 4 }}>
          <Ionicons name="information-circle" size={28} color="green" />
          <Text style={{ fontSize: 18 }}>
            <Text style={{ fontWeight: 600 }}>ID thiết bị: </Text>
            {id}
          </Text>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 4 }}>
          <Ionicons name="location-sharp" size={28} color="#DB4437" />
          <Text style={{ fontSize: 18 }}>
            <Text style={{ fontWeight: 600 }}>Địa chỉ: </Text>
            {data.address}
          </Text>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 4 }}>
          <Ionicons name="person-circle" size={28} color="#F4B400" />
          <Text style={{ fontSize: 18 }}>
            <Text style={{ fontWeight: 600 }}>Tên hộ dân: </Text>
            {data.fullName}
          </Text>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 4 }}>
          <Ionicons name="mail" size={28} color="purple" />
          <Text style={{ fontSize: 18 }}>
            <Text style={{ fontWeight: 600 }}>Email: </Text>
            {data.email}
          </Text>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 4 }}>
          <Ionicons name="call-sharp" size={28} color="#4285F4" />
          <Text style={{ fontSize: 18 }}>
            <Text style={{ fontWeight: 600 }}>Số điện thoại: </Text>
            {data.phoneNumber}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default InfoUser;
