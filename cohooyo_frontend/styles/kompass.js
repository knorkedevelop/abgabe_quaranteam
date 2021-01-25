import { Platform, StyleSheet, Dimensions, StatusBar } from "react-native";
import { Colors } from "./baseColors";

const { height } = Dimensions.get("window");
const width = Dimensions.get("window").width;

const kompass = StyleSheet.create({
  container: {
    backgroundColor: "#116B6E",
    borderRadius: 14,
    marginLeft: 10,
    marginRight: 10,
    overflow: "hidden",
    width: 340,
    height: 450,
    alignSelf: "center",
  },

  notizContainer: {
    flex: 1,
    shadowOpacity: 0,
    backgroundColor: "transparent",
    marginLeft: 10,
    marginRight: 10,
    overflow: "hidden",
    height: 400,
    width: 300,
    alignSelf: "center",
  },

  matchContainer: {
    shadowOpacity: 0,
    backgroundColor: "#1b9195",
    borderRadius: 10,
    marginLeft: 10,
    marginRight: 10,
    overflow: "hidden",
    width: 300,
    alignSelf: "center",
  },

  matchText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 10,
    marginBottom: 15,
    fontSize: 20,
  },

  title: {
    color: "white",
    fontSize: 28,
    fontWeight: "bold",
    marginLeft: 70,
    marginTop: 3,
  },

  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  next: {
    borderRadius: 9,
    marginTop: 5,
    backgroundColor: "white",
    width: 90,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },

  arrowLeft: {
    position: "absolute",
    top: 345,
    left: 7,
  },

  arrow: {
    position: "absolute",
    top: 345,
    right: 7,
  },

  sliderRow: {
    paddingTop: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  question: {
    marginLeft: 12,
    fontWeight: "bold",
    fontSize: 24,
    color: "white",
    alignSelf: "center",
    textAlign: "center",
  },

  imageFirst: {
    width: 50,
    height: 50,
    resizeMode: "contain",
  },

  imageView: {
    width: 65,
    height: 68,
    paddingRight: 5,
    alignItems: "center",
    flexDirection: "column",
  },

  picText: {
    color: "white",
    fontSize: 15,
  },

  botContainer: {
    backgroundColor: "white",
    padding: 14,
    borderRadius: 10,
    marginLeft: 10,
    marginRight: 10,
    overflow: "hidden",
    width: 340,
    alignSelf: "center",
  },

  botTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 4,
    marginLeft: 85,
  },

  statusContainer: {
    backgroundColor: "#1b9195",
    padding: 18,
    borderRadius: 10,
    marginLeft: 10,
    marginRight: 10,
    overflow: "hidden",
    width: 293,
    alignSelf: "center",
  },

  noteTitleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    position: "absolute",
    top: 22,
    right: 8,
  },

  inputView: {
    position: "absolute",
    top: 28,
    left: 0,
  },

  noteImage: {
    flex: 1,
    justifyContent: "center",
    height: 450,
    width: 300,
  },

  noteView: {
    flex: 1,
    flexDirection: "column",
  },

  noteInput: {
    width: 260,
    height: 393,
    margin: 4,
    backgroundColor: "transparent",
    fontSize: 19,
  },

  fertigButton: {
    padding: 20,
    backgroundColor: "rgba(0, 255, 234 , 0.35)",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    height: 31,
    width: 110,
    marginTop: 130,
    shadowColor: "white",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.6,
    shadowRadius: 3.65,
  },

  fertigText: {
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center",
    color: "white",
    opacity: 1,
  },

  infoMatchView: {
    width: 52,
    height: 52,
    backgroundColor: "#ACE3E1",
    borderRadius: 50 / 2,
    alignItems: "center",
    justifyContent: "center",
    margin: 5,
  },

  infoPic: {
    height: 37,
    width: 37,
  },

  infoText: {
    color: "white",
    textAlign: "center",
    marginLeft: 6,
    marginTop: 1,
    fontWeight: "bold",
    fontSize: 15,
  },

  infoTitle: {
    textAlign: "center",
    fontSize: 22,
    fontWeight: "bold",
    color: "white",
  },

  infoRow: {
    flexDirection: "row",
    marginBottom: 31,
  },

  infoTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 14,
  },

  infoCircle: {
    marginBottom: -3,
    marginRight: 4,
    color: "white",
  },
});

export default kompass;
