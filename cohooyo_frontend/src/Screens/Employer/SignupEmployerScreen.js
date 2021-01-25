import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import baseStyles from "../../../styles/baseStyles";
import { AuthContext } from "../../../App";
import Icon from "react-native-vector-icons/Ionicons";
import createAccountstyles from "../../../styles/createAccountStyles";

//Registrierung Screen des Arbeitgebers
//zu angebende Daten: Name, Geburtstag, Email und Passwort

//TODO: make into class component
//TODO: ensure the input is sufficient for registration
const SignupEmployerScreen = ({ navigation }) => {
  const { register } = React.useContext(AuthContext);

  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "white" }}>
      <View style={createAccountstyles.container}>
        <View style={createAccountstyles.greenBox}>
          <View style={{ padding: 17 }}>
            <Text style={createAccountstyles.titleText}>
              Unternehmens-{"\n"}konto erstellen
            </Text>
          </View>

          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              paddingTop: 30,
            }}
          >
            <View style={createAccountstyles.rowContainer}>
              <TextInput
                style={createAccountstyles.input}
                placeholder="Unternehmen"
                onChangeText={(text) => setCompanyName(text)}
              />
            </View>

            <View style={createAccountstyles.inputContainer}>
              <Icon
                name={"ios-person"}
                size={28}
                color={"black"}
                style={baseStyles.inputIcon}
              />
              <TextInput
                style={createAccountstyles.input}
                placeholder="Email"
                placeholderTextColor={"black"}
                onChangeText={(text) => setEmail(text)}
              />
            </View>
            {register ? (
              <></>
            ) : (
              <View style={{ marginTop: 5 }}>
                <Text style={{ color: "red" }}>Email ist ungültig</Text>
              </View>
            )}

            <View style={createAccountstyles.inputContainer}>
              <Icon
                name={"ios-lock"}
                size={28}
                color={"black"}
                style={baseStyles.inputIcon}
              />
              <TextInput
                style={createAccountstyles.input}
                placeholder="Password"
                placeholderTextColor={"black"}
                onChangeText={(text) => setPassword(text)}
                secureTextEntry={true}
              />
            </View>
            {register ? (
              <></>
            ) : (
              <View style={{ marginTop: 5 }}>
                <Text style={{ color: "red" }}>Passwort ist ungültig</Text>
              </View>
            )}

            <View
              style={{ justifyContent: "center", marginTop: 7, width: 200 }}
            >
              <TouchableOpacity
                style={baseStyles.button}
                onPress={() =>
                  register({
                    user_type: "employer",
                    email,
                    password,
                    company_name: companyName,
                  })
                }
              >
                <Text style={baseStyles.buttonText}>Registrieren</Text>
              </TouchableOpacity>
            </View>

            <View style={baseStyles.topRowSecond}>
              <View style={baseStyles.innerTextRow} />
              <View>
                <Text style={{ width: 50, textAlign: "center" }}>oder</Text>
              </View>
              <View style={baseStyles.innerTextRow} />
            </View>

            <View
              style={{ justifyContent: "center", marginTop: 5, width: 200 }}
            >
              <TouchableOpacity
                style={baseStyles.button}
                onPress={() => navigation.navigate("Login")}
              >
                <Text style={baseStyles.buttonText}>Login</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default SignupEmployerScreen;
