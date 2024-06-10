import React, { useState, useRef } from "react";
import styles from "./updateInfo.style";
import { View, SafeAreaView, Text, TouchableOpacity, ScrollView } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import CustomInput from "../../../components/customInput/CustomInput";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import Toast from "../../../components/toast/Toast";

function UpdateInfo({ route }) {
  const { id, waterMeter } = route.params;
  const navigation = useNavigation();
  const [address, setAddress] = useState(waterMeter.address);
  const [fullName, setFullName] = useState(waterMeter.fullName);
  const [email, setEmail] = useState(waterMeter.email);
  const [phoneNumber, setPhoneNumber] = useState(waterMeter.phoneNumber);
  const [status, setStatus] = useState(waterMeter.status);
  const [errorInput, setErrorInput] = useState({
    email: "",
    fullName: "",
    phoneNumber: "",
  });

  const toastRef = useRef();

  const showToast = (content, type, delay, redirectTo) => {
    if (toastRef.current) {
      toastRef.current.hide(() => {
        toastRef.current.show(content, type, delay, redirectTo);
      });
    }
  };

  const validateInput = () => {
    const emailRegex = /^\S+@\S+\.\S+$/;

    const isValidEmail = emailRegex.test(email);
    const isValidFullName = fullName.trim() !== "";
    const isValidPhoneNumber = phoneNumber.trim() !== "";

    let newErrorInput = { email: "", fullName: "", phoneNumber: "" };

    if (!isValidEmail) newErrorInput = { ...newErrorInput, email: "Email không hợp lệ" };
    if (!isValidFullName) newErrorInput = { ...newErrorInput, fullName: "Tên không được bỏ trống" };
    if (!isValidPhoneNumber) newErrorInput = { ...newErrorInput, phoneNumber: "Số điện thoại không được bỏ trống" };

    setErrorInput(newErrorInput);

    return isValidEmail && isValidPhoneNumber && isValidFullName;
  };

  const handleUpdateInfo = async () => {
    if (validateInput()) {
      const data = {
        waterMeterId: id,
        status: status,
        fullName: fullName,
        email: email,
        phoneNumber: phoneNumber.toString(),
      };

      const response = await axios.post("http://192.168.1.5:8080/water-meter/update-info", data);

      if (response.status === 200) {
        showToast("Cập nhật thông tin thành công", "success", 200, "Trang chủ");
      } else {
        showToast("Cập nhật thông tin thất bại", "error", 200);
      }
    }
  };

  return (
    <>
      <Toast ref={toastRef} />
      <ScrollView>
        <SafeAreaView style={styles.container}>
          {/* <InfoUser /> */}
          <View style={[styles.card, styles.shadowProp]}>
            {/* ID */}
            <View style={styles.cardItem}>
              <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 4 }}>
                <Ionicons name="information-circle" size={28} color="green" />
                <Text style={{ fontSize: 18, fontWeight: "600" }}>ID thiết bị </Text>
              </View>
              <CustomInput
                containerStyle={{ marginVertical: 4 }}
                onChangeText={setAddress}
                defaultValue={id}
                isOnlySeen={true}
              />
            </View>
            {/* ADDRESS */}
            <View style={styles.cardItem}>
              <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 4 }}>
                <Ionicons name="location-sharp" size={28} color="#DB4437" />
                <Text style={{ fontSize: 18, fontWeight: "600" }}>Địa chỉ </Text>
              </View>
              <CustomInput
                containerStyle={{ marginVertical: 4 }}
                onChangeText={setAddress}
                defaultValue={address}
                isOnlySeen={true}
              />
            </View>
            {/* EMAIL */}
            <View style={styles.cardItem}>
              <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 4 }}>
                <Ionicons name="mail" size={28} color="purple" />
                <Text style={{ fontSize: 18, fontWeight: "600" }}>Email </Text>
              </View>
              <CustomInput
                containerStyle={{ marginVertical: 4 }}
                onChangeText={setEmail}
                defaultValue={email}
                error={errorInput.email}
              />
            </View>
            {/* FULLNAME */}
            <View style={styles.cardItem}>
              <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 4 }}>
                <Ionicons name="person-circle" size={28} color="#F4B400" />
                <Text style={{ fontSize: 18, fontWeight: "600" }}>Tên hộ dân </Text>
              </View>
              <CustomInput
                containerStyle={{ marginVertical: 4 }}
                onChangeText={setFullName}
                defaultValue={fullName}
                error={errorInput.fullName}
              />
            </View>
            {/* PHONE NUMBER */}
            <View style={styles.cardItem}>
              <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 4 }}>
                <Ionicons name="call-sharp" size={28} color="#4285F4" />
                <Text style={{ fontSize: 18, fontWeight: "600" }}>Số điện thoại </Text>
              </View>
              <CustomInput
                containerStyle={{ marginVertical: 4 }}
                onChangeText={setPhoneNumber}
                defaultValue={phoneNumber}
                error={errorInput.phoneNumber}
              />
            </View>
            {/* STATUS */}
            <View style={styles.cardItem}>
              <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 4 }}>
                <Ionicons name="water-sharp" size={30} color="#4285F4" />
                <Text style={{ fontSize: 18, fontWeight: "600" }}>Tình trạng đồng hồ </Text>
              </View>
              <View style={{ flexDirection: "row", justifyContent: "center", gap: 12 }}>
                <TouchableOpacity onPress={() => setStatus(1)}>
                  <View
                    style={{
                      backgroundColor: status === true ? "#40FBA1" : "#EEE",
                      borderWidth: 1,
                      borderRadius: 8,
                      borderColor: status === true ? "green" : "gray",
                      padding: 12,
                      alignItems: "center",
                    }}
                  >
                    <Ionicons name="ios-checkmark-circle" size={32} color="green" />
                    <Text>Đang hoạt động</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setStatus(0)}>
                  <View
                    style={{
                      backgroundColor: status === false ? "#EC9B97" : "#EEE",
                      borderWidth: 1,
                      borderRadius: 8,
                      borderColor: status === false ? "red" : "gray",
                      padding: 12,
                      alignItems: "center",
                    }}
                  >
                    <Ionicons name="md-close-circle" size={32} color="red" />
                    <Text>Đang sửa chữa</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          {/* //////////////// */}
          <View style={styles.actions}>
            <TouchableOpacity style={styles.cancelBtn} onPress={() => navigation.navigate("Trang chủ")}>
              <Text style={styles.cancelText}>HỦY</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.createBtn} onPress={handleUpdateInfo}>
              <Text style={styles.createText}>CẬP NHẬT</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </ScrollView>
    </>
  );
}

export default UpdateInfo;
