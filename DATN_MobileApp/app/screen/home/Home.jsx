import React from "react";
import { Image, Text, View, SafeAreaView } from "react-native";
import Button from "../../../components/button/Button";
import styles from "./home.style";
import { useNavigation } from "@react-navigation/native";

function Home() {
  const navigation = useNavigation();

  return (
    <>
      <SafeAreaView style={styles.wrapper}>
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
          <Button
            text={"Lắp đồng hồ mới"}
            onPress={() => navigation.navigate("Quét mã QR", { typeAction: "installMeter" })}
          />
          <Button
            text={"Ghi chỉ số nước"}
            color={"#0F9C58"}
            onPress={() => navigation.navigate("Quét mã QR", { typeAction: "updateMeter" })}
          />
          <Button
            text={"Cập nhật thông tin"}
            color={"#F4B400"}
            onPress={() => navigation.navigate("Quét mã QR", { typeAction: "updateInfo" })}
          />
          <Image source={require("../../../assets/images/logo.png")} style={{ height: 150, width: 150 }} />
        </View>
      </SafeAreaView>
    </>
  );
}

export default Home;
