import React, { useContext, useRef, useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import styles from "./login.style";
import CustomInput from "../../components/customInput/CustomInput";
import AuthenticationAPI from "../../context/authContext";
import Toast from "../../components/toast/Toast";
import axios from "axios";
import { apiCaller } from "../../../api";
import { SERVER_URL } from "../../../secrete";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPasword] = useState("");
  const [errorInput, setErrorInput] = useState({
    email: "",
    password: "",
  });

  const { setIsLogin, setUser, setDeviceID, setAccessToken } = useContext(AuthenticationAPI);
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
    const isValidPassword = password.trim() !== "";

    let newErrorInput = { email: "", password: "" };

    if (!isValidEmail) newErrorInput = { ...newErrorInput, email: "Email không hợp lệ" };
    if (!isValidPassword) {
      newErrorInput = { ...newErrorInput, password: "Mật khẩu không được bỏ trống" };
    } else if (password.length < 6) {
      newErrorInput = { ...newErrorInput, password: "Mật khẩu tối thiểu 6 ký tự" };
    }

    setErrorInput(newErrorInput);

    return isValidEmail && isValidPassword;
  };

  const handleLogin = async () => {
    if (validateInput()) {
      const data = {
        email,
        password,
      };
      //   MOCK DATA ASSUME LOGIN SUCCESS
      const response = await apiCaller("POST", "/auth/login", data);
      // console.log(data);
      // const response = await fetch('http://192.168.120.88:8080/auth/login', {
      //   method: "POST",
      //   headers: {
      //     'Content-Type': 'application/json', // Set the content type to JSON
      //     // 'Authorization': 'Bearer YOUR_ACCESS_TOKEN' // If you need to include a token
      //   },
      //   body: JSON.stringify(data)
      // });
      // let res = await response.json();
      // console.log(res);

      console.log(response.data)
      if (response.status === 200) {

        setIsLogin(true);
        setAccessToken(response.data.accessToken);

        const axiosConfig = {
          headers: {
            Authorization: `Bearer ${response.data.accessToken}`,
          },
        };
        const userData = await axios.get(`${SERVER_URL}/user/by-id?userId=${response.data.userId}`, axiosConfig);
        console.log("Data:", userData.data);


        setDeviceID(userData.data.listValue[0].waterMeterId);

        console.log("device ID: ", userData.data.listValue[0].waterMeterId)

        setUser({
          id: response.data.userId,
          fullName: userData.data.fullName,
          email: userData.data.email,
          address: userData.data.address,
          phoneNumber: userData.data.phoneNumber,
        });
        showToast("Đăng nhập thành công", "success", 200, "Trang chủ");
      } else {
        showToast("Đăng nhập thất bại", "error", 200);
      }
    }
  };

  return (
    <View style={styles.wrapper}>
      <Toast ref={toastRef} />
      <ScrollView>
        <View style={styles.sloganBlock}>
          <Text style={styles.sloganText}>
            <Text style={styles.sloganTextRed}>Protect</Text> Our Water,
          </Text>
          <Text style={styles.sloganText}>
            <Text style={styles.sloganTextRed}>Sustain</Text> Our Future,
          </Text>
          <Text style={[styles.sloganText, styles.sloganTextRed]}>Every Drop Matters!</Text>
          <Image
            source={require("../../../assets/images/hcmut.png")}
            style={{ height: 150, width: 150, marginLeft: -28 }}
          />
        </View>
        <View style={styles.container}>
          <Text style={styles.title}>ĐĂNG NHẬP</Text>
          <CustomInput
            containerStyle={{ marginVertical: 4 }}
            placeholder={"Email"}
            onChangeText={setEmail}
            error={errorInput.email}
          />
          <CustomInput
            containerStyle={{ marginVertical: 4 }}
            placeholder={"Mật khẩu"}
            onChangeText={setPasword}
            error={errorInput.password}
            secureTextEntry
          />
          <TouchableOpacity style={styles.loginBtn} onPress={() => handleLogin()}>
            <Text style={styles.loginText}>ĐĂNG NHẬP</Text>
          </TouchableOpacity>
          <Image
            source={require("../../../assets/images/logo.png")}
            style={{ height: 150, width: 150, alignSelf: "center" }}
          />
        </View>
      </ScrollView>
    </View>
  );
}

export default Login;