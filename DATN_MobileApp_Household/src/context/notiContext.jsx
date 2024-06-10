import React, { useState, createContext, useEffect } from "react";
import SSEClient from "react-native-sse";
import { SERVER_URL } from "../../secrete";

const NotificationAPI = createContext();

export const NotificationContext = ({ children }) => {
  const [notiList, setNotiList] = useState([]);

  const deleteNotification = (value) => {
    const newNotiList = notiList.filter((notiValue) => notiValue !== value);
    setNotiList(newNotiList);
  };

  const sseClient = new SSEClient(`${SERVER_URL}/auth/subscribe`);

  sseClient.addEventListener("notification", (event) => {
    console.log(event.data);
    if (!event?.data.startsWith("<")) {
      const eventData = JSON.parse(event.data);
      setNotiList([eventData.usageOfThisMonth, ...notiList]);
    }
  });

  return (
    <NotificationAPI.Provider value={{ notiList, setNotiList, deleteNotification }}>
      {children}
    </NotificationAPI.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default NotificationAPI;
