import { Platform, StyleSheet, Dimensions, StatusBar } from "react-native";
import { Colors } from "./baseColors";

const { height } = Dimensions.get("window");
const width = Dimensions.get("window").width;

const JobsEmployerStyles = StyleSheet.create({
  scrollView: {
    backgroundColor: "#f1f6f6",
    borderLeftWidth: 15,
    borderRightWidth: 15,
    borderColor: "white",
  },

  container: {
    alignSelf: "center",
    width: 320,
    paddingTop: 20,
    backgroundColor: "#D9EFEF",
  },

  jobBox: {
    flex: 1,
    backgroundColor: "#3ba79c",
    width: 155,
    height: 60,
    marginRight: 5,
    marginLeft: 5,
    marginBottom: 10,
  },

  image: {
    alignSelf: "center",
    marginTop: 10,
    width: 80,
    height: 80,
    borderRadius: 400 / 2,
  },

  textinputTitle: {
    textAlign: "center",
    color: "white",
    fontWeight: "bold",
    fontSize: 17,
    marginTop: 10,
  },

  textinput: {
    textAlign: "center",
    width: 155,
    color: "white",
    fontSize: 13,
    alignSelf: "center",
  },
});

export default JobsEmployerStyles;
