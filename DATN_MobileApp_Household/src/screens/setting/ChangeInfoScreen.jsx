import React, { useContext, useRef, useState } from "react";
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import AuthenticationAPI from "../../context/authContext";
import CustomInput from "../../components/customInput/CustomInput";
import { useNavigation } from "@react-navigation/native";
import Toast from "../../components/toast/Toast";
import axios from "axios";

const ChangeInfoScreeen = () => {
  const navigation = useNavigation();
  const toastRef = useRef();
  const { user, setUser } = useContext(AuthenticationAPI);
  const [address, setAddress] = useState(user.address);
  const [fullName, setFullName] = useState(user.fullName);
  const [email, setEmail] = useState(user.email);
  const [birthday, setBirthday] = useState(user.birthday);
  const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber);
  const [errorInput, setErrorInput] = useState({
    email: "",
    address: "",
    fullName: "",
    birthday: "",
    phoneNumber: "",
  });

  const showToast = (content, type, delay, redirectTo) => {
    if (toastRef.current) {
      toastRef.current.hide(() => {
        toastRef.current.show(content, type, delay, redirectTo);
      });
    }
  };

  const validateInput = () => {
    const emailRegex = /^\S+@\S+\.\S+$/;

    const isValidFullName = fullName.trim() !== "";
    const isValidEmail = emailRegex.test(email);
    const isValidAddress = address.trim() !== "";
    const isValidPhoneNumber = phoneNumber.trim() !== "";

    let newErrorInput = { address: "", email: "", fullName: "", phoneNumber: "" };

    if (!isValidAddress) newErrorInput = { ...newErrorInput, address: "Địa chỉ không được bỏ trống" };
    if (!isValidEmail) newErrorInput = { ...newErrorInput, email: "Email không hợp lệ" };
    if (!isValidFullName) newErrorInput = { ...newErrorInput, fullName: "Tên không được bỏ trống" };
    if (!isValidPhoneNumber) newErrorInput = { ...newErrorInput, phoneNumber: "Số điện thoại không được bỏ trống" };

    setErrorInput(newErrorInput);

    return isValidAddress && isValidEmail && isValidPhoneNumber && isValidFullName;
  };

  const handleChangeInfor = () => {
    if (validateInput()) {
      const newUser = {
        email,
        address,
        fullName,
        birthday,
        phoneNumber,
      };

      console.log(newUser);
      //   const response = axios.put("http://192.168.1.5:8080/", newUser);

      //   if (response.status === 200) {
      //     showToast("Cập nhật thông tin thành công", "success", 200, "Thông tin cá nhân");
      //   } else {
      //     showToast("Cập nhật thông tin thất bại", "error", 200);
      //   }
    }
  };

  return (
    <>
      <Toast ref={toastRef} />
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <Text style={styles.title}>THAY ĐỔI THÔNG TIN</Text>
          <View style={styles.header}>
            <Image style={styles.avatar} source={require("../../../assets/images/logo.png")} />
          </View>
          <View style={styles.content}>
            <View style={styles.contentGroup}>
              <View style={styles.contentItem}>
                <Ionicons name="person" size={28} color="#4285F4" />
                <Text style={styles.label}>Họ và tên:</Text>
              </View>
              <CustomInput
                containerStyle={{ marginVertical: 4 }}
                onChangeText={setFullName}
                defaultValue={fullName}
                error={errorInput.fullName}
              />
            </View>
            <View style={styles.contentGroup}>
              <View style={styles.contentItem}>
                <Ionicons name="mail" size={28} color="green" />
                <Text style={styles.label}>Email:</Text>
              </View>
              <CustomInput
                containerStyle={{ marginVertical: 4 }}
                onChangeText={setEmail}
                defaultValue={email}
                error={errorInput.email}
              />
            </View>
            <View style={styles.contentGroup}>
              <View style={styles.contentItem}>
                <Ionicons name="location-sharp" size={28} color="#F4B400" />
                <Text style={styles.label}>Địa chỉ:</Text>
              </View>
              <CustomInput
                containerStyle={{ marginVertical: 4 }}
                onChangeText={setAddress}
                defaultValue={address}
                error={errorInput.address}
              />
            </View>
            <View style={styles.contentGroup}>
              <View style={styles.contentItem}>
                <Ionicons name="today" size={28} color="red" />
                <Text style={styles.label}>Ngày sinh:</Text>
              </View>
              <CustomInput
                containerStyle={{ marginVertical: 4 }}
                onChangeText={setBirthday}
                defaultValue={birthday}
                error={errorInput.birthday}
              />
            </View>
            <View style={styles.contentGroup}>
              <View style={styles.contentItem}>
                <Ionicons name="call" size={28} color="gray" />
                <Text style={styles.label}>Số điện thoại:</Text>
              </View>
              <CustomInput
                containerStyle={{ marginVertical: 4 }}
                onChangeText={setPhoneNumber}
                defaultValue={phoneNumber}
                error={errorInput.phoneNumber}
              />
            </View>
            <View style={styles.actions}>
              <TouchableOpacity style={styles.cancelBtn} onPress={() => navigation.navigate("Thông tin cá nhân")}>
                <Text style={styles.cancelText}>HỦY</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.saveBtn} onPress={() => handleChangeInfor()}>
                <Text style={styles.saveText}>LƯU</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingVertical: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    color: "#4285F4",
    marginBottom: 8,
  },
  header: {
    alignItems: "center",
    marginTop: 30,
  },
  avatar: {
    width: 120,
    height: 120,
    borderWidth: 1,
    borderColor: "#4285F4",
    borderRadius: 60,
  },
  content: {
    marginHorizontal: 20,
  },
  contentItem: {
    alignItems: "flex-end",
    flexDirection: "row",
  },
  actions: {
    flexDirection: "row",
    gap: 8,
    justifyContent: "flex-end",
  },
  cancelBtn: {
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 28,
    backgroundColor: "#EEE",
  },
  cancelText: {
    color: "#333",
    fontWeight: "bold",
  },
  saveBtn: {
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 28,
    backgroundColor: "#4285F4",
  },
  saveText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
});

export default ChangeInfoScreeen;
