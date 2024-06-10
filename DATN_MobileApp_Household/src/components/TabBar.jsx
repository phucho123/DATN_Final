import { View } from "react-native";
import { useRoute } from '@react-navigation/native';
import Ionicons from "react-native-vector-icons/Ionicons";

export default function TabBar({ focused, color, size }) {
    var iconName = "";
    const route = useRoute();
    switch (route.name) {
        case "Trang chủ":
            iconName = focused ? "home" : "home-outline";
            break;
        case "Thông báo":
            iconName = focused ? "notifications" : "notifications-outline";
            break;
        case "Hỏi đáp":
            iconName = focused ? "chatbox" : "chatbox-outline";
            break;
        case "Cài đặt":
            iconName = focused ? "settings" : "settings-outline";
            break;
    }

    return (
        <View
            style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Ionicons name={iconName} color={color} size={size} />
        </View>
    );
}