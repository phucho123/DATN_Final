import React, { useContext, useEffect } from "react";
import styles from "./notification.style";
import { SafeAreaView, ScrollView, Text, View } from "react-native";
import NotiCard from "../../components/notiCard/NotiCard";
import NotificationAPI from "../../context/notiContext";

const Notification = () => {
  const { notiList } = useContext(NotificationAPI);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>THÔNG BÁO</Text>
        {notiList?.map((noti, index) => (
          <NotiCard thresholdValue={noti} key={index} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Notification;
