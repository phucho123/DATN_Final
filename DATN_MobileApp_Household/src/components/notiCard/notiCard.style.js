import { StyleSheet } from "react-native";

export default styles = StyleSheet.create({
  cardBox: {
    borderWidth: 1,
    borderColor: "#4285F4",
    borderRadius: 8,
    width: "90%",
    left: "5%",
    backgroundColor: "#FFFFFF",
    shadowColor: "#999",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 5,
    position: "relative",
    marginBottom: 16,
  },
  cardIcon: {
    marginLeft: "auto",
    zIndex: 9999,
    padding: 12,
  },
  cardGroup: {
    marginTop: -40,
    padding: 12,
  },
  cardItem: {
    marginVertical: 4,
    fontSize: 16,
    fontStyle: "italic",
    fontWeight: "bold",
  },
  cardContent: {
    fontWeight: "400",
  },
});
