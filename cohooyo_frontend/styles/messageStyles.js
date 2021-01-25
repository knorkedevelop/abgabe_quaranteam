import { Platform, StyleSheet, Dimensions } from 'react-native';
import { Colors } from './baseColors';

const height = Dimensions.get('window').height
const width = Dimensions.get('window').width

const messageStyles = StyleSheet.create({

      chatcontainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F5FCFF',
        //paddingTop: Platform.OS === "android" ? StatusBar.currentHeight + 10 : 10,
      },

      flatlist: {
        flexDirection: "row", 
        padding: 10, 
        flex: 1, 
        marginBottom: 50
      },

      inputContainer: {
        flexDirection: 'row', 
        width: width - 40, 
        height: 50, 
        marginTop: height * 0.3, 
        backgroundColor: '#ffffff', 
        borderWidth: 1, 
        borderColor: '#128ED2', 
        borderRadius: 25, 
        paddingLeft: 15, 
        paddingRight: 15, 
        justifyContent: 'center', 
        alignItems: 'center' 
      },

      textInput: {
        width: width - 120, 
        height: 50
      },

      sendMessagesContainer: {
        flexDirection: 'row', 
        marginTop: 5, 
        marginBottom: 10, 
        justifyContent: 'flex-end' 
      },

      messageBubble: {
        marginRight: 5, 
        justifyContent: 'flex-end'
      },

      sendTextContainer: {
        flex: 1, 
        flexDirection: "row", 
        justifyContent: 'flex-end'
      },

      sendText: {
        maxWidth: width - 85, 
        minWidth: 100, 
        padding: 10, 
        backgroundColor: '#00BCF5', 
        borderRadius: 8, 
        marginTop: 5, 
        justifyContent: 'flex-end', 
        textAlign: 'right' 

      },

      chatDate: {
        fontSize: 18, 
        marginRight: 5, 
        marginTop: 3
      },

      userName: {
        fontSize: 18, 
        fontWeight: '600'
      },

      sendIcon: {
        height: 30, 
        width: 60, 
        resizeMode: "cover",
      }
  });

  export default messageStyles;