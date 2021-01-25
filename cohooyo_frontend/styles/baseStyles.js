import { Platform, StyleSheet, Dimensions, StatusBar } from "react-native";
import { Colors } from "./baseColors";

const { height } = Dimensions.get("window");
const width = Dimensions.get("window").width;

// elements can use multiple stylesheets or styleobjects
//.create will check the syntax
const baseStyles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 10,
    backgroundColor: "white",
    //alignment of Entire content, only works with wrapping
    //alignContent: "center",
    //flexWrap: "wrap",
    //backgroundColor: Colors.backgroundColor,
    // either hide the status bar or add a bit of padding under it
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight + 10 : 10,
  },
  //using absolute positioning on one elements makes relative positioned elements
  //ignore it and reposition themselves

  evenWidthGroup: {
    alignItems: "stretch",
    justifyContent: "space-evenly",
  },

  buttonContainer: {
    margin: 4,
  },

  notificationCircle: {
    backgroundColor: "red",
    width: 20,
    height: 20,
    borderRadius: 1000,
    position: "absolute",
    top: 18,
    alignSelf: "center",
    marginLeft: 35,
  },

  notificationText: {
    position: "absolute",
    top: -1,
    alignSelf: "center",
    fontWeight: "bold",
  },

  button: {
    padding: 11,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1B9195",
  },

  buttonText: {
    fontSize: 17,
    alignSelf: "center",
    color: "white",
  },

  textForgotPass: {
    color: "#3ACEF3",
  },

  rowContainer: {
    flexDirection: "row",
    //alignContent: "flex-start",
    //flexWrap: "wrap",
  },

  standardImage: {
    flex: 1,
    //width: 900,
    //height: 900,
    resizeMode: "cover",
  },

  ImageBackground: {
    flex: 1,
    opacity: 0.9,
    width: null,
    height: null,
    resizeMode: "cover",
    justifyContent: "center",
    alignItems: "center",
  },

  topRowFirst: {
    paddingTop: 20,
    width: 205,
    flexDirection: "row",
    alignItems: "center",
  },

  innerRow: {
    flex: 1,
    height: 1,

    borderBottomColor: "black",
    borderBottomWidth: 2,
  },

  innerTextRow: {
    flex: 1,
    height: 1,

    borderBottomColor: "black",
    borderBottomWidth: 2,
  },

  topRowSecond: {
    paddingTop: 10,
    width: 200,
    paddingBottom: 20,
    flexDirection: "row",
    alignItems: "center",
  },

  input: {
    height: 45,
    borderRadius: 10,
    fontSize: 16,
    paddingLeft: 45,
    backgroundColor: "white",
    borderColor: "#404040",
    borderWidth: 1,
    marginHorizontal: 25,
  },

  inputIcon: {
    position: "absolute",
    top: 6,
    left: 37,
  },

  inputContainer: {
    marginTop: 7,
    width: 250,
  },

  lineContainer: {
    flexDirection: "row",
    alignItems: "stretch",
  },

  lineBox: {
    flexDirection: "row",
    flex: 1,
    backgroundColor: "#1B9195",
    height: height * 0.06,
  },

  //styles from here onward could be exported into seperate file, eg cardStyles.js
  //or additional Stylesheets could be created in this file
  card: {
    /* Setting the height according to the screen height, it also could be fixed value or based on percentage. In this example, this worked well on Android and iOS. */
    height: height - 100,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: Colors.white,
    borderRadius: 5,
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 6,
    shadowOpacity: 0.3,
    elevation: 2,
  },

  //image inside Card component
  image: {
    borderRadius: 5,
    flex: 1,
    width: "100%",
  },

  //inside Card component
  photoDescriptionContainer: {
    justifyContent: "flex-end",
    alignItems: "flex-start",
    flexDirection: "column",
    height: "100%",
    position: "absolute",
    left: 10,
    bottom: 10,
  },

  //inside Card component
  text: {
    textAlign: "center",
    fontSize: 20,
    color: Colors.white,
    fontFamily: "Avenir",
    textShadowColor: Colors.black,
    textShadowRadius: 10,
  },

  singleButton: {
    backgroundColor: "transparent",
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 6,
    shadowOpacity: 0.3,
    elevation: 2,
    padding: 15,
  },

  overlayLabel: {
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderWidth: 2,
    borderRadius: 10,
  },

  overlayLabelText: {
    fontSize: 25,
    fontFamily: "Avenir",
    textAlign: "center",
  },

  swiperContainer: {
    alignItems: "center",
    backgroundColor: Colors.backgroundColor,
  },

  matchContainer: {
    flexDirection: "row",
    height: 110,
    backgroundColor: "#599393",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingBottom: 10,
    paddingTop: 6,
    marginBottom: 10,
  },

  matchTextName: {
    marginTop: 18,
    fontWeight: "bold",
    fontSize: 15,
    marginBottom: 10,
    color: "white",
  },

  matchTextChat: {
    color: "white",
  },

  iconContainer: {
    width: 40,
    height: 40,
    backgroundColor: "#ACE3E1",
    borderBottomLeftRadius: 20,
    paddingLeft: 2,
  },

  iconImage: {
    position: "absolute",
    right: 0,
    top: 0,
    width: 32,
    height: 32,
    resizeMode: "cover",
  },

  modalIcon: {
    width: 90,
    height: 90,
    backgroundColor: "#ACE3E1",
    borderRadius: 100 / 2,
    alignItems: "center",
    justifyContent: "center",
    margin: 5,
    borderWidth: 4,
  },

  modalImage: {
    width: 65,
    height: 65,
  },

  modalView: {
    alignItems: "flex-start",
    justifyContent: "center",
    marginLeft: 15,
  },

  pickerTwo: {
    width: 120,
    height: 24,
    borderWidth: 1,
    borderRadius: 7,
    borderColor: "#484848",
  },

  pickerOne: {
    width: 120,
    height: 24,
    marginRight: 7,
    borderRadius: 7,
    borderWidth: 1,
    borderColor: "#484848",
  },

  pickerView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    padding: 5,
  },

  textGematched: {
    color: "white",
    fontWeight: "bold",
    fontSize: 21,
    position: "absolute",
    top: 37,
    right: 22,
  },

  textGespraech: {
    color: "white",
    fontWeight: "bold",
    fontSize: 21,
    position: "absolute",
    top: 129,
    right: 0,
    textAlign: "center",
  },

  textEingestellt: {
    color: "white",
    fontWeight: "bold",
    fontSize: 21,
    position: "absolute",
    bottom: 35,
    right: 17,
  },

  iconOk: {
    position: "absolute",
    bottom: -11,
    right: -8,
  },

  matchView: {
    flex: 1,
    overflow: "hidden",
    backgroundColor: "#f1f6f6",
    marginLeft: 15,
    marginRight: 15,
  },

  stelleButton: {
    padding: 11,
    borderRadius: 5,
    width: 250,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#1B9195",
    flexDirection: "row",
    marginBottom: 20,
  },

  stelleText: {
    color: "white",
    fontSize: 26,
    textAlign: "center",
  },
});

export default baseStyles;
