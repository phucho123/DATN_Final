import React, { useContext, useRef, useState } from "react";
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import AuthenticationAPI from "../../context/authContext";
import { useNavigation } from "@react-navigation/native";
import Toast from "../../components/toast/Toast";
import axios from "axios";
import CustomInput from "../../components/customInput/CustomInput";

const ChangePasswordScreen = () => {
  const navigation = useNavigation();
  const toastRef = useRef();
  const { user, setUser } = useContext(AuthenticationAPI);
  const [password, setPassword] = useState();
  const [newPassword, setNewPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [errorInput, setErrorInput] = useState({
    password: "",
    newPassword: "",
    confirmPassword: "",
  });

  const showToast = (content, type, delay, redirectTo) => {
    if (toastRef.current) {
      toastRef.current.hide(() => {
        toastRef.current.show(content, type, delay, redirectTo);
      });
    }
  };

  const validateInput = () => {
    const isValidPassword = password.trim() !== "";
    const isValidNewPassword = newPassword.trim() !== "";
    const isValidConfirmPassword = confirmPassword.trim() !== "";

    let newErrorInput = { password: "", newPassword: "", confirmPassword: "" };

    if (!isValidPassword) {
      newErrorInput = { ...newErrorInput, password: "Mật khẩu không được bỏ trống" };
    } else if (password.length() < 6) {
      newErrorInput = { ...newErrorInput, password: "Mật khẩu tối thiểu 6 ký tự" };
    }
    if (!isValidNewPassword) {
      newErrorInput = { ...newErrorInput, password: "Mật khẩu không được bỏ trống" };
    } else if (newPassword.length() < 6) {
      newErrorInput = { ...newErrorInput, newPassword: "Mật khẩu tối thiểu 6 ký tự" };
    }
    if (!isValidConfirmPassword) {
      newErrorInput = { ...newErrorInput, password: "Mật khẩu không được bỏ trống" };
    } else if (confirmPassword.length() < 6) {
      newErrorInput = { ...newErrorInput, confirmPassword: "Mật khẩu tối thiểu 6 ký tự" };
    } else if (confirmPassword !== newPassword) {
      newErrorInput = { ...newErrorInput, confirmPassword: "Xác nhận mật khẩu không đúng" };
    }

    setErrorInput(newErrorInput);

    return isValidPassword && isValidNewPassword && isValidConfirmPassword;
  };

  const handleChangePassword = () => {
    if (validateInput()) {
      const data = {
        password,
        newPassword,
        confirmPassword,
      };

      console.log(data);
      //   const response = axios.put("http://192.168.1.5:8080/", data);

      //   if (response.status === 200) {
      //     showToast("Thay đổi mật khẩu thành công", "success", 200, "Thông tin cá nhân");
      //   } else {
      //     showToast("Thay đổi mật khẩu thất bại", "error", 200);
      //   }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>THAY ĐỔI MẬT KHẨU</Text>
        <View style={styles.header}>
          <Image style={styles.avatar} source={require("../../../assets/images/logo.png")} />
        </View>
        <View style={styles.content}>
          <View style={styles.contentGroup}>
            <View style={styles.contentItem}>
              <Ionicons name="key" size={28} color="red" />
              <Text style={styles.label}>Mật khẩu hiện tại:</Text>
            </View>
            <CustomInput
              containerStyle={{ marginVertical: 4 }}
              onChangeText={setPassword}
              defaultValue={password}
              error={errorInput.password}
              secureTextEntry
            />
          </View>
          <View style={styles.contentGroup}>
            <View style={styles.contentItem}>
              <Ionicons name="key" size={28} color="green" />
              <Text style={styles.label}>Mật khẩu mới:</Text>
            </View>
            <CustomInput
              containerStyle={{ marginVertical: 4 }}
              onChangeText={setNewPassword}
              defaultValue={newPassword}
              error={errorInput.newPassword}
              secureTextEntry
            />
          </View>

          <View style={styles.contentGroup}>
            <View style={styles.contentItem}>
              <Ionicons name="key" size={28} color="pink" />
              <Text style={styles.label}>Xác nhận mật khẩu mới:</Text>
            </View>
            <CustomInput
              containerStyle={{ marginVertical: 4 }}
              onChangeText={setConfirmPassword}
              defaultValue={confirmPassword}
              error={errorInput.confirmPassword}
              secureTextEntry
            />
          </View>
          <View style={styles.actions}>
            <TouchableOpacity style={styles.cancelBtn} onPress={() => navigation.navigate("Thông tin cá nhân")}>
              <Text style={styles.cancelText}>HỦY</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.saveBtn} onPress={() => handleChangePassword()}>
              <Text style={styles.saveText}>XÁC NHẬN</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
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

export default ChangePasswordScreen;
