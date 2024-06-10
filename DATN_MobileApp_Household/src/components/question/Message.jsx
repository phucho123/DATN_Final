import React from "react";
import { Text, View } from "react-native";

const Message = ({ role, message }) => {
    return (
        <View style={{
            width: "100%",
            display: "flex",
            alignItems: `${role == "user" ? "flex-end" : "flex-start"}`,
            paddingVertical: 4,

        }}>
            <View style={{
                maxWidth: "60%",
                paddingVertical: 4,
                paddingHorizontal: 8,
                backgroundColor: `${role == "user" ? "blue" : "lightgray"}`,
                borderRadius: 16
            }}>
                <Text style={{ fontSize: 16, color: `${role == "user" ? "white" : "black"}` }}>{message}</Text>
            </View>
        </View>
    );
};

export default Message;
