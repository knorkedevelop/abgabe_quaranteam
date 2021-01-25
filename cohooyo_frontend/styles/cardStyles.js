import { Platform, StyleSheet, Dimensions } from "react-native";
import { Colors } from "./baseColors";

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

const cardStyles = StyleSheet.create({
  card: {
    marginTop: 25,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 2,
      height: 7,
    },
    shadowOpacity: 0.4,
    shadowRadius: 4.65,
    backgroundColor: "white",
    overflow: "hidden",
    elevation: 9,
  },
  thumbnail: {
    width: 300,
    height: 320,
  },
  text: {
    textAlign: "center",
    fontSize: 20,
    paddingTop: 10,
    paddingBottom: 10,
  },
  noMoreCards: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    fontSize: 20,
    fontWeight: "bold",
  },

  title2: {
    fontSize: 14,
    fontWeight: "bold",
  },

  textDescription: {
    flexWrap: "wrap",
  },

  titleContainer: {
    marginTop: 3,
    marginLeft: 20,
  },

  scrollContainer: {
    flex: 1,
    paddingBottom: 5,
  },

  location: {
    marginLeft: 20,
    flexDirection: "row",
    marginTop: 3,
  },

  description: {
    width: 264,
    marginTop: 5,
    marginLeft: 13,
    marginRight: 5,
    paddingLeft: 5,
    paddingBottom: 2,
    paddingTop: 2,
    borderRadius: 4,
    shadowColor: "#000",
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.7,
    shadowRadius: 2.65,
    elevation: 9,
  },
});

export default cardStyles;
