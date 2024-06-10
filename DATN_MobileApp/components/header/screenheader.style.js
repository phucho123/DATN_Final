import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    btnContainer: {
        width: 40,
        height: 40,
        backgroundColor: "white",
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
    },
    btnImg: (dimension) => ({
        width: dimension,
        height: dimension,
        borderRadius: 25,
    }),
});

export default styles;