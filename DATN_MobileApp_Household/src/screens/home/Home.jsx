import React, { useContext } from "react";
import styles from "./home.style";
import { Image, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import AuthenticationAPI from "../../context/authContext";
import ChartComp from "../../components/chart/ChartComp";
import MqttAPI from "../../context/mqttContext";

const Home = () => {
  const { user, setUser } = useContext(AuthenticationAPI);
  const { flowRateList, totalRateList } = useContext(MqttAPI);

  return (
      <SafeAreaView style={styles.container}>
        <View
          style={{
            width: "100%",
            height: 250,
            backgroundColor: "#294B83",
            position: "absolute",
            borderBottomLeftRadius: 50,
            borderBottomRightRadius: 50,
          }}
        ></View>
        <ScrollView>
          <View style={styles.wrapper}>
            <View style={styles.infoGroup}>
              <Image style={styles.avatar} source={require("../../../assets/images/logo.png")} />
              <Text style={styles.infoItem}>
                Xin chào, <Text style={styles.fullName}>{user.fullName}</Text>
              </Text>
            </View>
            {/* STATUS */}
            <View style={styles.section}>
              <View style={styles.heading}>
                <View style={styles.iconWrapper}>
                  <Ionicons name="water" size={32} color="#4285F4" />
                </View>
                <Text style={styles.headingText}>Thông tin đồng hồ</Text>
              </View>
              <View style={styles.waterMeterGroup}>
                <View style={styles.waterMeterItem}>
                  <View style={styles.waterMeterTitle}>
                    <Text style={{ color: "#0f9d58", fontWeight: "bold" }}>Ngưỡng cho phép</Text>
                  </View>
                  <View style={styles.waterMeterBox}>
                    <Image
                      source={require("../../../assets/images/threshold.png")}
                      style={{ height: 60, width: 60, alignSelf: "center" }}
                    />
                    <View>
                      <Text style={styles.waterMeterValue}>1000</Text>
                      <Text style={styles.waterMeterUnit}>m³</Text>
                    </View>
                  </View>
                </View>
                <View style={styles.waterMeterItem}>
                  <View style={styles.waterMeterTitle}>
                    <Text style={{ color: "#0f9d58", fontWeight: "bold" }}>Trạng thái</Text>
                  </View>
                  <View style={styles.waterMeterBox}>
                    <Image
                      source={require("../../../assets/images/status.png")}
                      style={{ height: 60, width: 60, alignSelf: "center" }}
                    />
                    <Text style={[styles.waterMeterUnit, { color: "#F4B400", width: 50, fontWeight: "600" }]}>
                      Đang hoạt động
                    </Text>
                  </View>
                </View>
              </View>
            </View>
            {/* WATERFLOW */}
            <View style={styles.section}>
              <View style={styles.heading}>
                <View style={styles.iconWrapper}>
                  <Ionicons name="water" size={32} color="#4285F4" />
                </View>
                <Text style={styles.headingText}>Tình trạng nước</Text>
              </View>
              <View style={styles.flowRateGroup}>
                <View style={styles.flowRateItem}>
                  <Image
                    source={require("../../../assets/images/flowrate.png")}
                    style={{ height: 80, width: 80, alignSelf: "center" }}
                  />
                  <Text style={styles.flowRateTitle}>Lưu lượng tức thời</Text>
                  <Text style={styles.flowRateValue}>{flowRateList[flowRateList.length - 1].value}</Text>
                  <Text style={styles.flowRateUnit}>m³</Text>
                </View>
                <View style={styles.flowRateItem}>
                  <Image
                    source={require("../../../assets/images/totalRate.png")}
                    style={{ height: 80, width: 80, alignSelf: "center" }}
                  />
                  <Text style={styles.flowRateTitle}>Tổng lưu lượng</Text>
                  <Text style={styles.flowRateValue}>{totalRateList[totalRateList.length - 1].value}</Text>
                  <Text style={styles.flowRateUnit}>m³</Text>
                </View>
              </View>
            </View>
            {/* STATISTIC */}
            <View style={styles.section}>
              <View style={styles.heading}>
                <View style={styles.iconWrapper}>
                  <Ionicons name="bar-chart" size={32} color="#4285F4" />
                </View>
                <Text style={styles.headingText}>Thống kê</Text>
              </View>
              <View style={{ width: "100%" }}>
                <View style={{ width: "100%" }}>
                  <ChartComp
                    title={"Biểu đồ lưu lượng tức thời"}
                    colorFrom={"#4285F4"}
                    colorTo={"#C7DCFE"}
                    data={flowRateList}
                  />
                </View>
                <View style={{ width: "100%" }}>
                  <ChartComp
                    title={"Biểu đồ tổng lưu lượng"}
                    colorFrom={"#4285F4"}
                    colorTo={"#C7DCFE"}
                    data={totalRateList}
                  />
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
  );
};

export default Home;
