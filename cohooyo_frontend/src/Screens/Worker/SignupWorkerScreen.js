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

//Registrierung Screen des Azubis
//zu angebende Daten: Name, Geburtstag, Email und Passwort

//TODO: make into class component
//TODO: ensure the input is sufficient for registration
const SignupWorkerScreen = ({ navigation }) => {
  const { register } = React.useContext(AuthContext);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [day, setDay] = useState(1);
  const [month, setMonth] = useState(1);
  const [year, setYear] = useState(1980);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "white" }}>
      <View style={createAccountstyles.container}>
        <View style={createAccountstyles.greenBox}>
          <View style={{ padding: 17 }}>
            <Text style={createAccountstyles.titleText}>
              Bewerberkonto
              {"\n"}erstellen
            </Text>
          </View>

          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              paddingTop: 30,
            }}
          >
            <View style={createAccountstyles.inputContainer}>
              <TextInput
                style={createAccountstyles.input}
                placeholder="Vorname"
                placeholderTextColor={"black"}
                onChangeText={(text) => setFirstName(text)}
              />
            </View>
            <View style={createAccountstyles.inputContainer}>
              <TextInput
                style={createAccountstyles.input}
                placeholder="Nachname"
                placeholderTextColor={"black"}
                onChangeText={(text) => setLastName(text)}
              />
            </View>

            <View style={createAccountstyles.rowContainer}>
              <TextInput
                style={createAccountstyles.inputBirth}
                placeholder="Tag"
                onChangeText={(text) => setDay(text)}
              />
              <TextInput
                style={createAccountstyles.inputBirth}
                placeholder="Monat"
                onChangeText={(text) => setMonth(text)}
              />
              <TextInput
                style={createAccountstyles.inputBirth}
                placeholder="Jahr"
                onChangeText={(text) => setYear(text)}
              />
            </View>
            {register ? (
              <></>
            ) : (
              <View style={{ marginTop: 5 }}>
                <Text style={{ color: "red" }}>Geburtsdatum ist ungültig</Text>
              </View>
            )}

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

            <View
              style={{ justifyContent: "center", marginTop: 7, width: 200 }}
            >
              <TouchableOpacity
                style={baseStyles.button}
                onPress={() =>
                  register({
                    user_type: "worker",
                    email,
                    password,
                    first_name: firstName,
                    last_name: lastName,
                    birth_day: day,
                    birth_month: month,
                    birth_year: year,
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

export default SignupWorkerScreen;
