import React, { useContext } from "react";
import styles from "./notiCard.style";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Text, TouchableOpacity, View } from "react-native";
import NotificationAPI from "../../context/notiContext";

const NotiCard = ({ thresholdValue }) => {
  const { deleteNotification } = useContext(NotificationAPI);

  return (
    <View style={styles.cardBox}>
      <TouchableOpacity onPress={() => deleteNotification(thresholdValue)} style={styles.cardIcon}>
        <Ionicons name="close" size={28} color="#DB4437" />
      </TouchableOpacity>

      <View style={styles.cardGroup}>
        <Text style={styles.cardItem}>
          Người gửi: <Text style={styles.cardContent}>Admin</Text>
        </Text>
        <Text style={styles.cardItem}>
          Thời gian gửi: <Text style={styles.cardContent}>12/12/2023</Text>
        </Text>
        <Text style={styles.cardItem}>
          Nội dung: <Text style={styles.cardContent}>Lưu lượng nước vượt ngưỡng cho phép</Text>
        </Text>
        <Text style={styles.cardItem}>
          Lưu lượng nước tiêu thụ: <Text style={styles.cardContent}>{thresholdValue} m3</Text>
        </Text>
      </View>
    </View>
  );
};

export default NotiCard;
