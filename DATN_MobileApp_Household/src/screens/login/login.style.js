import { StyleSheet } from "react-native";

export default styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  container: {
    flex: 1,
    gap: 12,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    backgroundColor: "#D9FBFF",
    padding: 40,
    paddingBottom: 150,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#4285F4",
    textAlign: "center",
  },
  sloganBlock: {
    padding: 16,
    alignItems: "center",
    marginTop: 40,
  },
  sloganText: {
    fontSize: 28,
  },
  sloganTextRed: {
    fontWeight: "bold",
    color: "#DB4437",
  },
  loginBtn: {
    height: 50,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#4285F4",
  },
  loginText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});
