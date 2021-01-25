import { Platform, StyleSheet, Dimensions } from "react-native";
import { Colors } from "./baseColors";

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

const modals = StyleSheet.create({
  generatorContainer: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 13,
    backgroundColor: "#B5CECE",
    alignSelf: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 2,
      height: 7,
    },
    shadowOpacity: 0.4,
    shadowRadius: 4.65,
    width: 325,
    height: 200,
    top: 200,
    left: 25,
    zIndex: 55,
  },

  kompassContainer: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 13,
    backgroundColor: "#B5CECE",
    alignSelf: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 2,
      height: 7,
    },
    shadowOpacity: 0.4,
    shadowRadius: 4.65,
    width: 325,
    height: 400,
    top: 20,
    left: 20,
    zIndex: 55,
  },
});

export default modals;
