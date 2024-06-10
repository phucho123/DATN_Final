import React, { useContext } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "./home/Home";
import Question from "./question/Question";
import Notification from "./notification/Notification";
import TabBar from "../components/TabBar";
import Login from "./login/Login";
import AuthenticationAPI from "../context/authContext";
import SettingStack from "./setting/SettingStack";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const MainTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: TabBar,
        tabBarStyle: {
          height: 80,
          paddingBottom: 20,
        },
        tabBarActiveTintColor: "#384EC7",
        tabBarInactiveTintColor: "gray",
        headerStyle: {
          height: 80,
        },
        headerTitleStyle: { display: "none" },
      })}
    >
      <Tab.Screen name="Trang chủ" component={Home} />
      <Tab.Screen name="Thông báo" component={Notification} />
      <Tab.Screen name="Hỏi đáp" component={Question} />
      <Tab.Screen name="Cài đặt" component={SettingStack} />
    </Tab.Navigator>
  );
};

const AppNavigator = () => {
  const { isLogin } = useContext(AuthenticationAPI);

  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: "center",
        headerStyle: {
          height: 60,
        },
        headerShadowVisible: true,
        headerStatusBarHeight: 0,
      }}
    >
      {isLogin === false ? (
        <Stack.Screen name="Đăng nhập" component={Login} options={{ headerShown: false }} />
      ) : (
        <Stack.Screen name="Main" component={MainTabNavigator} options={{ headerShown: false }} />
      )}
    </Stack.Navigator>
  );
};

export default AppNavigator;
