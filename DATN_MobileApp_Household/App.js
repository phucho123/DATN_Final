import AppNavigator from "./src/screens/Navigation";
import { AuthenticationContext } from "./src/context/authContext";
import { NavigationContainer } from "@react-navigation/native";
import { MqttContext } from "./src/context/mqttContext";
import { NotificationContext } from "./src/context/notiContext";

export default function App() {
  return (
    <NavigationContainer>
      <AuthenticationContext>
        <MqttContext>
          <NotificationContext>
            <AppNavigator />
          </NotificationContext>
        </MqttContext>
      </AuthenticationContext>
    </NavigationContainer>
  );
}
