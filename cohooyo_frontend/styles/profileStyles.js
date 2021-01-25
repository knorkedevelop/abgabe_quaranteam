import { Platform, StyleSheet, Dimensions, StatusBar } from "react-native";
import { Colors } from "./baseColors";

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

const profileStyles = StyleSheet.create({
  container: {
    marginLeft: 10,
    marginRight: 10,
    paddingTop: 10,
    paddingBottom: 20,
    backgroundColor: "transparent",
    justifyContent: "flex-start",
  },

  headRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 320,
    alignSelf: "center",
  },

  headRow2: {
    justifyContent: "space-between",
    width: 320,
    alignSelf: "center",
    alignItems: "flex-end",
  },

  scrollView: {
    flex: 1,
    flexWrap: "nowrap",
    backgroundColor: "#f1f6f6",
    borderLeftWidth: 15,
    borderRightWidth: 15,
    borderColor: "white",
  },

  card: {
    shadowColor: "#000",
    marginBottom: 20,
    borderRadius: 2,
    paddingBottom: 5,
    width: 320,
    alignSelf: "center",
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    backgroundColor: "white",
    overflow: "hidden",
    elevation: 9,
  },

  titleText: {
    textAlign: "left",
    fontWeight: "bold",
    fontSize: 19,
  },
  shortText: {
    fontStyle: "italic",
  },

  image: {
    width: 320,
    height: 300,
    resizeMode: "cover",
  },

  descriptionContainer: {
    alignItems: "center",
    padding: 20,
  },

  tagsContainer: {
    flexDirection: "row",
  },

  tagBoxes: {
    alignItems: "center",
    width: 100,
    height: 20,
    margin: 3,
    borderRadius: 5,
    backgroundColor: "powderblue",
  },

  camera: {
    opacity: 0.8,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "transparent",
    borderRadius: 10,
  },
  command: {
    padding: 15,
    width: 320,
    borderRadius: 10,
    alignSelf: "center",
    backgroundColor: "#00B2C6",
    marginTop: 10,
  },

  delete: {
    padding: 15,
    width: 320,
    borderRadius: 10,
    alignSelf: "center",
    backgroundColor: "#CC0000",
    marginTop: 10,
  },

  deactive: {
    padding: 15,
    width: 320,
    borderRadius: 10,
    alignSelf: "center",
    backgroundColor: "#747474",
    marginTop: 10,
  },

  textValue: {
    textAlign: "left",
    fontSize: 15,
    width: 210,
  },

  bigTextValue: {
    textAlign: "left",
    fontSize: 15,
    height: 70,
    width: 250,
  },

  title: {
    fontWeight: "bold",
    fontSize: 16,
    marginRight: 3,
  },

  commandTitle: {
    alignSelf: "center",
    fontSize: 17,
    fontWeight: "bold",
    color: "white",
  },

  row: {
    flexDirection: "row",
    borderBottomColor: "rgba(95, 95, 95, 0.2)",
    borderBottomWidth: 1,
    marginRight: 4,
    padding: 6,
  },
});

export default profileStyles;
