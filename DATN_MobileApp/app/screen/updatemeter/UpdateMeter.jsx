import React, { useState, useRef } from "react";
import { View, Text, TouchableOpacity, ScrollView, Modal } from "react-native";
import MyCamera from "../../../components/camera/Camera";
import styles from "./updatemeter.style";
import InfoUser from "../../../components/infoUser/InfoUser";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import ModalComp from "../../../components/modal/Modal";
import Toast from "../../../components/toast/Toast";

const UpdateMeter = ({ route }) => {
  const { id, waterMeter } = route.params;
  const navigation = useNavigation();
  const [isDisplayResult, setIsDisplayResult] = useState(false);
  const [isDisplayModal, setIsDisplayModal] = useState(false);
  const [resultOfAI, setResultOfAI] = useState(0);
  const [confirmResult, setconfirmResult] = useState(0);
  const [url, setUrl] = useState("");

  const toastRef = useRef();

  const showToast = (content, type, delay) => {
    if (toastRef.current) {
      toastRef.current.hide(() => {
        toastRef.current.show(content, type, delay);
      });
    }
  };

  const handleGetResultFromAI = (valueAIDetect, url) => {
    console.log("value: ", valueAIDetect);
    setResultOfAI(valueAIDetect);
    setconfirmResult(valueAIDetect);
    setUrl(url);
  };

  const displayResult = () => {
    setIsDisplayResult(true);
  };

  const handleUpdateResult = (manualResult) => {
    setconfirmResult(Number(manualResult));
    setIsDisplayModal(false);
  };

  const handleUpdateWaterMeter = () => {
    const data = {
      waterMeterId: id,
      totalRateValue: confirmResult,
      imageUrl: url,
    };

    console.log(data);
    const response = axios.post("http://192.168.1.11:8080/water-meter/save-digital-value", data);

    if (response.status === 200) {
      showToast("Ghi chỉ số nước thành công", "success", 200);
    } else {
      showToast("Ghi chỉ số nước thất bại", "error", 200);
    }
  };

  const handleCloseModal = () => {
    setIsDisplayModal(false);
  };

  return (
    <>
      <Toast ref={toastRef} />
      <View style={styles.container}>
        <ScrollView style={{ flex: 1, backgroundColor: "#FFF" }}>
          <InfoUser id={id} data={waterMeter} />

          <View>
            <MyCamera onChangeResultAI={handleGetResultFromAI} displayResult={displayResult} />

            {isDisplayResult && (
              <>
                <View style={styles.resultGroup}>
                  <View style={styles.resultItem}>
                    <Text style={styles.resultTitle}>AI nhận diện</Text>
                    <Text style={styles.result}>{resultOfAI}</Text>
                    <Text style={styles.resultUnit}>m³</Text>
                  </View>
                  <View style={styles.resultItem}>
                    <Text style={styles.resultTitle}>Thực tế</Text>
                    <Text style={styles.result}>{confirmResult}</Text>
                    <Text style={styles.resultUnit}>m³</Text>
                  </View>
                </View>
                <View style={styles.actions}>
                  <TouchableOpacity style={styles.cancelBtn} onPress={() => navigation.navigate("Trang chủ")}>
                    <Text style={styles.cancelText}>HỦY</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.updateBtn} onPress={() => setIsDisplayModal(true)}>
                    <Text style={styles.updateText}>CHỈNH SỬA</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.confirmBtn} onPress={() => handleUpdateWaterMeter()}>
                    <Text style={styles.confirmText}>XÁC NHẬN</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </View>
          {/* MODAL */}
          {isDisplayModal && (
            <ModalComp
              currentValue={confirmResult.toString()}
              onChangeValue={handleUpdateResult}
              onCancelClick={handleCloseModal}
            />
          )}
        </ScrollView>
      </View>
    </>
  );
};

export default UpdateMeter;
