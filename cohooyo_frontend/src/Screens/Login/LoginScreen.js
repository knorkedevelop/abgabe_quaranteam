import React from "react";
import {
  View,
  TextInput,
  Text,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native";
import baseStyles from "../../../styles/baseStyles";
import Icon from "react-native-vector-icons/Ionicons";
import { AuthContext } from "../../../App";
//style: login template  style

//Azubi und Arbeitgeber können sich mit email + passwort anmelden
export default function Login({ navigation }) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isWorker, setIsWorker] = React.useState("");

  const { logIn } = React.useContext(AuthContext);

  return (
    <View style={{ flex: 1 }}>
      <View style={baseStyles.container}>
        <View style={baseStyles.topRowFirst}>
          <View style={baseStyles.innerRow} />
        </View>

        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            paddingTop: 80,
          }}
        >
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
              onChangeText={(text) => setEmail(text)}
            />
          </View>

          <View style={baseStyles.inputContainer}>
            <Icon
              name={"ios-lock"}
              size={28}
              color={"black"}
              style={baseStyles.inputIcon}
            />
            <TextInput
              style={baseStyles.input}
              placeholder="Passwort"
              placeholderTextColor={"black"}
              onChangeText={(text) => setPassword(text)}
              secureTextEntry={true}
            />
          </View>

          <View style={{ justifyContent: "center", marginTop: 7, width: 200 }}>
            <TouchableOpacity
              style={baseStyles.button}
              onPress={() => {
                logIn({ email, password });
              }}
            >
              <Text style={baseStyles.buttonText}>Anmelden</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={baseStyles.buttonContainer}>
          <TouchableWithoutFeedback
            onPress={() => navigation.navigate("ForgotPassword")}
          >
            <Text style={baseStyles.textForgotPass}>Passwort vergessen?</Text>
          </TouchableWithoutFeedback>
        </View>

        <View style={baseStyles.topRowSecond}>
          <View style={baseStyles.innerTextRow} />
          <View>
            <Text style={{ width: 50, textAlign: "center" }}>oder</Text>
          </View>
          <View style={baseStyles.innerTextRow} />
        </View>

        <View style={{ justifyContent: "center", marginTop: 5, width: 200 }}>
          <TouchableOpacity
            style={baseStyles.button}
            onPress={() => navigation.navigate("CreateAccount")}
          >
            <Text style={baseStyles.buttonText}>Registrieren</Text>
          </TouchableOpacity>
        </View>
        {logIn ? (
          <></>
        ) : (
          <View style={{ marginTop: 20 }}>
            <Text style={{ color: "red" }}>
              Kennwort oder Email ist ungültig
            </Text>
          </View>
        )}
      </View>
    </View>
  );
}
