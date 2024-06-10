import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  camera: {
    // flex: 1,
    width: 380,
    height: 380,
    padding: -17,
    alignSelf: "center",
  },
  overlay: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    alignItems: "center",
  },
  frame: {
    width: 380,
    height: 380,
    position: "absolute",
  },
  smallFrameGroup: {
    width: 110,
    height: 35,
    borderWidth: 1,
    borderColor: "white",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: -200,
    gap: 6,
  },
  action: {
    display: "flex",
    justifyContent: "center",
  },
  captureButton: {
    justifyContent: "center",
    alignItems: "center",
    height: 40,
    width: 120,
    borderRadius: 4,
    marginTop: 8,
    marginBottom: 8,
    backgroundColor: "#4285F4",
  },
  buttonText: {
    fontSize: 14,
    color: "#FFF",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default styles;
