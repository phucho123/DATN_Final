import React, { useEffect, useState, useRef } from "react";
import styles from "./installMeter.style";
import { useNavigation } from "@react-navigation/native";
import { View, SafeAreaView, Text, TouchableOpacity, ScrollView, Image } from "react-native";
import MapView, { Marker } from "react-native-maps";
import Ionicons from "@expo/vector-icons/Ionicons";
import * as Location from "expo-location";
import CustomInput from "../../../components/customInput/CustomInput";
import Loading from "../../../components/loading/Loading";
import Toast from "../../../components/toast/Toast";
import axios from "axios";

function InstallMeter({ route }) {
  const { id } = route.params;
  const navigation = useNavigation();
  const [address, setAddress] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState();
  const [typeWaterMeter, setTypeWaterMeter] = useState(1);
  const [location, setLocation] = useState();
  const [errorMsg, setErrorMsg] = useState(null);
  const [errorInput, setErrorInput] = useState({
    address: "",
    email: "",
    fullName: "",
    phoneNumber: "",
  });

  const toastRef = useRef();

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  const showToast = (content, type, delay, redirectTo) => {
    if (toastRef.current) {
      toastRef.current.hide(() => {
        toastRef.current.show(content, type, delay, redirectTo);
      });
    }
  };

  const validateInput = () => {
    const emailRegex = /^\S+@\S+\.\S+$/;

    const isValidAddress = address.trim() !== "";
    const isValidEmail = emailRegex.test(email);
    const isValidFullName = fullName.trim() !== "";
    const isValidPhoneNumber = phoneNumber.trim() !== "";

    let newErrorInput = { address: "", email: "", fullName: "", phoneNumber: "" };

    if (!isValidAddress) newErrorInput = { ...newErrorInput, address: "Địa chỉ không được bỏ trống" };
    if (!isValidEmail) newErrorInput = { ...newErrorInput, email: "Email không hợp lệ" };
    if (!isValidFullName) newErrorInput = { ...newErrorInput, fullName: "Tên không được bỏ trống" };
    if (!isValidPhoneNumber) newErrorInput = { ...newErrorInput, phoneNumber: "Số điện thoại không được bỏ trống" };

    setErrorInput(newErrorInput);

    return isValidAddress && isValidEmail && isValidPhoneNumber && isValidFullName;
  };

  const handleCreateNewMeter = async () => {
    if (validateInput()) {
      const data = {
        waterMeterId: id,
        type: typeWaterMeter === 1 ? "mechanical" : "pulse",
        address: address,
        longitude: location.coords.longitude,
        latitude: location.coords.latitude,
        email: email,
        fullName: fullName,
        phoneNumber: phoneNumber.toString(),
      };

      try {
        const response = await axios.post("http://192.168.1.5:8080/water-meter/create", data);

        if (response.status === 200) {
          showToast("Tạo đồng hồ thành công", "success", 200, "Trang chủ");
        }
      } catch (error) {
        console.log("error", error);
        if (axios.isAxiosError(error) && error.response) {
          showToast(error.response.data.message, "error", 200, "Trang chủ");
        } else {
          console.log(error);
        }
      }
    }
  };

  if (!location) {
    return <Loading />;
  }

  return (
    <>
      <Toast ref={toastRef} />
      <ScrollView>
        <SafeAreaView style={styles.container}>
          {/* INFORMATION */}
          <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 4, paddingHorizontal: 16 }}>
            <Ionicons name="information-circle" size={28} color="#F4B400" />
            <Text style={styles.objectTitle}>Thông tin thiết bị</Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 4, paddingHorizontal: 20 }}>
            <Text style={{ fontSize: 18 }}>
              <Text style={{ fontWeight: "bold" }}>ID thiết bị: </Text>
              {id}
            </Text>
          </View>
          <View style={{ backgroundColor: "#FFFFFF", paddingHorizontal: 20 }}>
            <CustomInput
              containerStyle={{ marginVertical: 4 }}
              placeholder={"Địa chỉ"}
              onChangeText={setAddress}
              error={errorInput.address}
            />
            <CustomInput
              containerStyle={{ marginVertical: 4 }}
              placeholder={"Tên hộ dân"}
              onChangeText={setFullName}
              error={errorInput.fullName}
            />
            <CustomInput
              containerStyle={{ marginVertical: 4 }}
              placeholder={"Email"}
              onChangeText={setEmail}
              error={errorInput.email}
            />
            <CustomInput
              containerStyle={{ marginVertical: 4 }}
              placeholder={"Số điện thoại"}
              inputType={"number"}
              onChangeText={setPhoneNumber}
              error={errorInput.phoneNumber}
            />
          </View>
          {/* TYPE */}
          <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 4, paddingHorizontal: 16 }}>
            <Ionicons name="list-circle-sharp" size={28} color="#0F9C58" />
            <Text style={styles.objectTitle}>Chọn loại đồng hồ</Text>
          </View>
          <View style={{ paddingHorizontal: 20, flexDirection: "row", justifyContent: "space-between", marginTop: 12 }}>
            <TouchableOpacity onPress={() => setTypeWaterMeter(1)}>
              <View
                style={[
                  styles.titleWaterMeter,
                  {
                    borderColor: typeWaterMeter === 1 ? "green" : "#EEE",
                    left: "18%",
                  },
                ]}
              >
                <Text>Đồng hồ cơ</Text>
              </View>
              <View
                style={[
                  styles.typeItem,
                  {
                    backgroundColor: typeWaterMeter === 1 ? "#40FBA1" : "#FFF",
                    borderColor: typeWaterMeter === 1 ? "green" : "#EEE",
                  },
                ]}
              >
                <Image source={require("../../../assets/images/waterMeter.png")} style={{ height: 120, width: 120 }} />
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setTypeWaterMeter(2)}>
              <View
                style={[
                  styles.titleWaterMeter,
                  {
                    borderColor: typeWaterMeter === 2 ? "green" : "#EEE",
                    left: "18%",
                  },
                ]}
              >
                <Text>Đồng hồ xung</Text>
              </View>
              <View
                style={[
                  styles.typeItem,
                  {
                    backgroundColor: typeWaterMeter === 2 ? "#40FBA1" : "#FFF",
                    borderColor: typeWaterMeter === 2 ? "green" : "#EEE",
                  },
                ]}
              >
                <Image
                  source={require("../../../assets/images/electricWaterMeter.png")}
                  style={{ height: 70, width: 150 }}
                />
              </View>
            </TouchableOpacity>
          </View>

          {/* MAP VIEW */}
          <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 4, paddingHorizontal: 16 }}>
            <Ionicons name="md-location-sharp" size={28} color="#DB4437" />
            <Text style={styles.objectTitle}>Ví trị lắp đặt</Text>
          </View>
          <View style={{ padding: 20, paddingTop: 0 }}>
            <View style={styles.locationCoordBox}>
              <Text style={styles.locationCoord}>
                Kinh độ: <Text style={styles.locationCoordItem}>{location?.coords.latitude}</Text>
              </Text>
              <Text style={styles.locationCoord}>
                Vĩ độ: <Text style={styles.locationCoordItem}>{location?.coords.longitude}</Text>
              </Text>
            </View>
            {location && (
              <MapView
                style={{ width: "100%", height: 300, marginTop: 12 }}
                initialRegion={{
                  latitude: location?.coords.latitude,
                  longitude: location?.coords.longitude,
                  latitudeDelta: 0.0,
                  longitudeDelta: 0.0,
                }}
              >
                <Marker
                  coordinate={{
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                  }}
                  title={address}
                />
              </MapView>
            )}
          </View>

          <View style={styles.actions}>
            <TouchableOpacity style={styles.cancelBtn} onPress={() => navigation.navigate("Trang chủ")}>
              <Text style={styles.cancelText}>HỦY</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.createBtn} onPress={() => handleCreateNewMeter()}>
              <Text style={styles.createText}>TẠO MỚI</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </ScrollView>
    </>
  );
}

export default InstallMeter;
