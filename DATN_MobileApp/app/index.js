import { createStackNavigator } from "@react-navigation/stack";
import Home from "./screen/home/Home";
import UpdateMeter from "./screen/updatemeter/UpdateMeter";
import QrScanner from "./screen/qrscanner/QrScanner";
import UpdateInfo from "./screen/updateinfo/UpdateInfo";
import InstallMeter from "./screen/installmeter/InstallMeter";

const Stack = createStackNavigator();

export default function App() {
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
      <Stack.Screen name="Trang chủ" component={Home} options={{ headerShown: false }} />
      <Stack.Screen name="Quét mã QR" component={QrScanner} />
      <Stack.Screen name="Ghi chỉ số nước" component={UpdateMeter} />
      <Stack.Screen name="Cập nhật thông tin" component={UpdateInfo} />
      <Stack.Screen name="Lắp đồng hồ mới" component={InstallMeter} />
    </Stack.Navigator>
  );
}
