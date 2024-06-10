import React, { useState, useEffect, useRef } from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { useNavigation } from "@react-navigation/native";
import Toast from "../../../components/toast/Toast";

import axios from "axios";

function QrScanner({ route }) {
  const { typeAction } = route.params;
  const navigation = useNavigation();
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getBarCodeScannerPermissions();
  }, []);

  const toastRef = useRef();

  const showToast = (content, type, delay, redirectTo) => {
    if (toastRef.current) {
      toastRef.current.hide(() => {
        toastRef.current.show(content, type, delay, redirectTo);
      });
    }
  };

  const handleBarCodeScanned = async ({ type, data }) => {
    setScanned(true);
    if (typeAction == "installMeter") {
      navigation.navigate("Lắp đồng hồ mới", { id: data });
    } else {
      try {
        const dataResponse = await axios.get(`http://192.168.1.5:8080/water-meter/by-id?waterMeterId=${data}`);

        if (dataResponse.status === 200) {
          const waterMeterData = {
            id: data,
            status: dataResponse.data.status,
            address: dataResponse.data.address,
            email: dataResponse.data.email,
            fullName: dataResponse.data.fullName,
            phoneNumber: dataResponse.data.phoneNumber,
          };

          switch (typeAction) {
            case "updateMeter":
              navigation.navigate("Ghi chỉ số nước", { id: data, waterMeter: waterMeterData });
              break;
            case "updateInfo":
              navigation.navigate("Cập nhật thông tin", { id: data, waterMeter: waterMeterData });
              break;
            default:
              navigation.navigate("Trang chủ");
              break;
          }
        }
      } catch (error) {
        setError(true);
        if (axios.isAxiosError(error) && error.response && error.response.status === 404) {
          showToast(error.response.data.message, "error", 200, "Trang chủ");
        } else {
          console.log(error);
        }
      }
    }
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <>
      <Toast ref={toastRef} />
      <View style={styles.container}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />
        {!error && scanned && (
          <View style={{ backgroundColor: "#FFF", padding: 12, borderRadius: 8 }}>
            <Button title={"Nhấn để quét lại QR Code"} onPress={() => setScanned(false)} />
          </View>
        )}
      </View>
    </>
  );
}
export default QrScanner;
