import { Platform, StyleSheet, Dimensions, StatusBar } from "react-native";
import { Colors } from "./baseColors";

const { height } = Dimensions.get("window");
const width = Dimensions.get("window").width;

// elements can use multiple stylesheets or styleobjects
//.create will check the syntax
const createAccountstyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    flexDirection: "column",
    justifyContent: "flex-start",
    backgroundColor: "white",
    overflow: "hidden",
    alignItems: "center",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight + 10 : 10,
  },

  greenBox: {
    flex: 1,
    backgroundColor: "#d2ebe8",
    marginTop: 30,
    paddingBottom: 50,
    paddingTop: 20,
    flexDirection: "column",
    alignItems: "center",
    overflow: "hidden",
    width: 360,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.55,
    shadowRadius: 3.84,

    elevation: 5,
  },

  titleText: {
    fontSize: 35,
    color: "black",
    fontWeight: "bold",
    alignSelf: "center",
  },

  titleTwo: {
    fontSize: 35,
    color: "black",
    fontWeight: "bold",
    alignSelf: "center",
  },

  innerRow: {
    flex: 1,
    height: 1,
    width: 280,
    marginBottom: 50,
    marginLeft: 10,
    backgroundColor: "#646464",
  },

  inputContainer: {
    marginTop: 9,
  },

  input: {
    height: 45,
    width: 205,
    borderRadius: 3,
    fontSize: 16,
    paddingLeft: 45,
    backgroundColor: "white",
    borderColor: "#404040",
    borderWidth: 1,
    marginHorizontal: 25,
  },

  rowContainer: {
    flexDirection: "row",
    marginTop: 9,
  },
  inputBirth: {
    height: 45,
    width: 66,
    borderRadius: 3,
    fontSize: 16,
    backgroundColor: "white",
    borderColor: "#404040",
    borderWidth: 1,
    marginRight: 3,
  },
});

export default createAccountstyles;
