import React, { useState, createContext, useEffect, useContext } from "react";
import Paho from "paho-mqtt";
import { ADAFRUIT_USER, ADAFRUIT_KEY, SERVER_URL } from "../../secrete";
import axios from "axios";
import AuthenticationAPI, { AuthenticationContext, useAuth } from "./authContext";
import { apiCaller } from "../../api";

const MqttAPI = createContext();

const client = new Paho.Client("wss://io.adafruit.com:443/mqtt/", "");

client.connect({
  useSSL: true,
  userName: ADAFRUIT_USER,
  password: ADAFRUIT_KEY,
  onSuccess: () => {
    console.log("Connected to Adafruit");
    client.subscribe(`${ADAFRUIT_USER}/feeds/datn.water-sensor`);
  },
  onFailure: (message) => {
    console.log("Failed to connect to Adafruit: ", message.errorMessage);
  },
});

export const MqttContext = ({ children }) => {
  const [flowRateList, setFlowRateList] = useState([{ value: 0, time: "" }]);
  const [totalRateList, setTotalRateList] = useState([{ value: 0, time: "" }]);
  const { deviceID } = useContext(AuthenticationAPI);
  // console.log(deviceID);

  useEffect(() => {
    client.onMessageArrived = async (message) => {
      console.log("Message arrived on topic:", message.destinationName, message.payloadString);
      const data = JSON.parse(message.payloadString.replace(/\s/g, "").replace(/'/g, '"'));

      if (deviceID == data.waterMeterId) {
        const newFlowRate = data.flowRateValue;
        const newTotalRate = data.totalFlowValue;
        setFlowRateList((prevList) => [...prevList, { value: newFlowRate, time: new Date(Date.now()).toLocaleString() }]);
        setTotalRateList((prevList) => [...prevList, { value: newTotalRate, time: new Date(Date.now()).toLocaleString() }]);
      }

    };
  }, []);

  const { accessToken, user } = useContext(AuthenticationAPI);

  useEffect(() => {
    const fetchData = async () => {
      if (accessToken && user.id) {
        try {
          const res = await axios.get(`${SERVER_URL}/user/by-id?userId=${user.id}`, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });

          const flowRateData = res.data.listValue.map((item) => ({
            value: item.flowRateValue,
            time: new Date(item.updatedAt).toLocaleString(),
          }));
          const totalRateData = res.data.listValue.map((item) => ({
            value: item.totalFlowValue,
            time: new Date(item.updatedAt).toLocaleString(),
          }));


          setFlowRateList(flowRateData);
          setTotalRateList(totalRateData);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    };
    fetchData();
  }, [accessToken, user]);

  return (
    <MqttAPI.Provider value={{ flowRateList, setFlowRateList, totalRateList, setTotalRateList }}>
      {children}
    </MqttAPI.Provider>
  );
};

export default MqttAPI;