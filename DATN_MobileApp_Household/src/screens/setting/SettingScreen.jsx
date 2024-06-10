import React, { useContext } from "react";
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import AuthenticationAPI from "../../context/authContext";
import { useNavigation } from "@react-navigation/native";

const SettingScreeen = () => {
  const { user, setUser, setIsLogin } = useContext(AuthenticationAPI);
  const navigation = useNavigation();

  const handleLogout = () => {
    setUser({
      fullName: "",
      email: "",
      address: "",
      phoneNumber: "",
      birthday: "",
    });
    setIsLogin(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>THÔNG TIN CÁ NHÂN</Text>
        <View style={styles.header}>
          <Image style={styles.avatar} source={require("../../../assets/images/logo.png")} />
        </View>
        <View style={styles.body}>
          <View style={styles.item}>
            <Ionicons name="person" size={28} color="#4285F4" />
            <Text style={styles.label}>Họ tên:</Text>
            <Text style={styles.value}>{user.fullName}</Text>
          </View>
          <View style={styles.item}>
            <Ionicons name="today" size={28} color="red" />
            <Text style={styles.label}>Ngày sinh:</Text>
            <Text style={styles.value}>{user.birthday}</Text>
          </View>
          <View style={styles.item}>
            <Ionicons name="mail" size={28} color="green" />
            <Text style={styles.label}>Email:</Text>
            <Text style={styles.value}>{user.email}</Text>
          </View>
          <View style={styles.item}>
            <Ionicons name="location-sharp" size={28} color="#F4B400" />
            <Text style={styles.label}>Địa chỉ:</Text>
            <Text style={styles.value}>{user.address}</Text>
          </View>
          <View style={styles.item}>
            <Ionicons name="call" size={28} color="gray" />
            <Text style={styles.label}>Số điện thoại:</Text>
            <Text style={styles.value}>{user.phoneNumber}</Text>
          </View>
        </View>
        <View style={styles.actions}>
          <TouchableOpacity style={styles.btnGroup} onPress={() => navigation.navigate("Thay đổi thông tin cá nhân")}>
            <View style={styles.btnSubGroup}>
              <Ionicons name="information-circle" size={28} color="blue" />
              <Text style={styles.btnText}>Thay đổi thông tin cá nhân</Text>
            </View>
            <Ionicons name="chevron-forward" size={28} color="#4285F4" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnGroup} onPress={() => navigation.navigate("Thay đổi mật khẩu")}>
            <View style={styles.btnSubGroup}>
              <Ionicons name="key" size={28} color="brown" />
              <Text style={styles.btnText}>Thay đổi mật khẩu</Text>
            </View>
            <Ionicons name="chevron-forward" size={28} color="#4285F4" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnLogout} onPress={() => handleLogout()}>
            <Text style={styles.btnTextLogout}>ĐĂNG XUẤT</Text>
          </TouchableOpacity>
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
  fullName: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 10,
  },
  phoneNumber: {
    fontSize: 16,
    marginTop: 5,
  },
  body: {
    marginTop: 30,
    paddingHorizontal: 20,
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#e6e6e6",
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 2,
    flex: 1,
  },
  value: {
    fontSize: 18,
    flex: 2,
    textAlign: "right",
  },
  button: {
    backgroundColor: "#007AFF",
    borderRadius: 20,
    padding: 6,
    marginTop: -22,
  },
  buttonText: {
    fontSize: 18,
    color: "#fff",
    textAlign: "center",
  },
  btnGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 20,
    padding: 8,
    marginTop: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#4285F4",
  },
  btnSubGroup: {
    flexDirection: "row",
    alignItems: "center",
  },
  btnText: {
    fontSize: 16,
    marginLeft: 2,
  },
  btnLogout: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 20,
    padding: 14,
    marginTop: 8,
    borderRadius: 8,
    backgroundColor: "#DB4437",
  },
  btnTextLogout: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default SettingScreeen;
