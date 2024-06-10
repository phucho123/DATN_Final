import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  objectTitle: {
    marginVertical: 12,
    fontSize: 20,
    fontWeight: "bold",
    color: "#4285F4",
  },
  //   INFO
  // TYPE
  typeItem: {
    width: 180,
    height: 180,
    borderWidth: 1,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  titleWaterMeter: {
    backgroundColor: "#FFF",
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    width: 120,
    alignItems: "center",
    position: "absolute",
    zIndex: 10,
    top: "-10%",
  },
  //   MAP
  locationCoordBox: {
    borderColor: "#4285F4",
    borderWidth: 1,
    borderRadius: 20,
    padding: 20,
    marginBottom: 8,
    gap: 12,
  },
  locationCoord: {
    fontSize: 16,
    fontWeight: "bold",
  },
  locationCoordItem: {
    fontWeight: "400",
  },
  //   ACTION
  actions: {
    paddingBottom: 60,
    marginTop: 12,
    marginRight: 27,
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 12,
  },
  cancelBtn: {
    height: 40,
    width: 96,
    borderRadius: 4,
    backgroundColor: "#EEEEEE",
    justifyContent: "center",
    alignItems: "center",
  },
  createBtn: {
    height: 40,
    width: 120,
    borderRadius: 4,
    backgroundColor: "#4285F4",
    justifyContent: "center",
    alignItems: "center",
  },
  cancelText: {
    color: "#333",
    fontWeight: "bold",
  },
  createText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default styles;
