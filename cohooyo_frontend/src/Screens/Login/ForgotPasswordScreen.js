import React, { Component } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import baseStyles from "./../../../styles/baseStyles";
import Icon from "react-native-vector-icons/Ionicons";

//Passwort zurücksetzen, indem man eine email sendet
//TODO: connect to server side functionality
//TODO: style
export default class ForgotPassword extends Component {
  constructor() {
    super();
  }

  sendEmail(email) {
    //blabla
  }

  render() {
    return (
      <View style={baseStyles.container}>
        <Text>Möchtest du dein Passwort wirklich zurücksetzen?</Text>

        <View style={baseStyles.inputContainer}>
          <Icon
            name={"ios-person"}
            size={28}
            color={"black"}
            style={baseStyles.inputIcon}
          />
          <TextInput
            style={baseStyles.input}
            placeholder="Email"
            placeholderTextColor={"black"}
            onChangeText={(text) => this.sendEmail(text)}
          />
        </View>

        <View style={{ justifyContent: "center", marginTop: 7, width: 200 }}>
          <TouchableOpacity
            style={baseStyles.button}
            onPress={() => {
              this.props.navigation.navigate("Login");
            }}
          >
            <Text style={baseStyles.buttonText}>Sende E-Mail</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
