import { TouchableOpacity, Modal, View, Text } from "react-native";
import CustomInput from "../customInput/CustomInput";
import { useState } from "react";

const ModalComp = ({ currentValue, onChangeValue, onCancelClick }) => {
  const [value, setValue] = useState("");

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={true}
      onRequestClose={() => {
        console.log("close");
      }}
    >
      <View
        style={{
          flex: 1,
          backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent black background
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            marginVertical: "50%",
            backgroundColor: "#FFF",
            borderWidth: 1,
            borderRadius: 8,
            paddingVertical: 20,
          }}
        >
          <View style={{ paddingHorizontal: 40 }}>
            <Text style={{ fontWeight: "bold", fontSize: 18, color: "#4285F4", marginBottom: 10 }}>
              THAY ĐỔI CHỈ SỐ NƯỚC
            </Text>
            <Text style={{ color: "#4285F4", fontSize: 16 }}>Chỉ số nước cũ</Text>
            <CustomInput
              containerStyle={{ marginVertical: 4 }}
              placeholder={"Old value:"}
              defaultValue={currentValue}
              isOnlySeen={true}
            />
            <Text style={{ color: "#4285F4", fontSize: 16, marginTop: 8 }}>Chỉ số nước mới</Text>
            <CustomInput
              containerStyle={{ marginVertical: 4 }}
              inputType={"number"}
              placeholder={"New value:"}
              onChangeText={setValue}
            />

            <View style={{ flexDirection: "row", gap: 8, marginTop: 12 }}>
              <TouchableOpacity
                style={{
                  height: 40,
                  width: 96,
                  borderRadius: 4,
                  backgroundColor: "#EEEEEE",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onPress={onCancelClick}
              >
                <Text>HỦY</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  height: 40,
                  width: 120,
                  borderRadius: 4,
                  backgroundColor: "#4285F4",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onPress={() => onChangeValue(value)}
              >
                <Text style={{ color: "#FFF" }}>XÁC NHẬN</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ModalComp;
