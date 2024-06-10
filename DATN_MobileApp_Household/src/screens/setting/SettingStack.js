import { createStackNavigator } from "@react-navigation/stack";
import SettingScreeen from "./SettingScreen";
import ChangeInfoScreeen from "./ChangeInfoScreen";
import ChangePasswordScreen from "./ChangePassword";

const Stack = createStackNavigator();

export default function SettingStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false, headerTitleStyle: { display: "none" } }}>
      <Stack.Screen name="Thông tin cá nhân" component={SettingScreeen} options={{ headerShown: false }} />
      <Stack.Screen name="Thay đổi thông tin cá nhân" component={ChangeInfoScreeen} options={{ headerShown: true }} />
      <Stack.Screen name="Thay đổi mật khẩu" component={ChangePasswordScreen} options={{ headerShown: true }} />
    </Stack.Navigator>
  );
}
