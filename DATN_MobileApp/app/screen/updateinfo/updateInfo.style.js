import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  actions: {
    marginTop: 12,
    marginRight: 27,
    paddingBottom: 40,
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
  card: {
    marginHorizontal: 20,
    marginVertical: 10,
    padding: 12,
    backgroundColor: "white",
    borderRadius: 8,
  },
  cardItem: {
    marginBottom: 12,
  },
  shadowProp: {
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
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
});

export default styles;
