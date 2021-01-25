import { Platform, StyleSheet, Dimensions } from "react-native";
import { Colors } from "./baseColors";

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

const homeStyles = StyleSheet.create({
  infoContainer: {
    paddingTop: 7,
    height: 130,
    width: 320,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    alignSelf: "center",
    shadowOpacity: 0.4,
    shadowRadius: 5.65,
    elevation: 9,
  },

  iconContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginRight: 10,
    marginTop: 3,
  },

  scrollContainer: {
    flex: 1,
    flexWrap: "nowrap",
    backgroundColor: "#f1f6f6",
    borderLeftWidth: 15,
    borderRightWidth: 15,
    borderColor: "white",
  },

  swipeContainer: {
    marginTop: 60,
    marginLeft: 15,
    marginRight: 15,
    paddingTop: 3,
    paddingBottom: 20,
    flex: 1,
    justifyContent: "flex-start",
  },

  cardContainer: {
    marginLeft: 15,
    marginRight: 15,
    paddingTop: 3,
    paddingBottom: 20,
    flex: 1,
    justifyContent: "flex-start",
  },
});

export default homeStyles;
