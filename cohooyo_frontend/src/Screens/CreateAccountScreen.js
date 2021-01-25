import React, { Component } from "react";
import { View, Text, ScrollView } from "react-native";
import baseStyles from "../../styles/baseStyles";
import createAccountstyles from "../../styles/createAccountStyles";
import { Checkbox } from "react-native-paper";
import { ScreenContainer } from "react-native-screens";

//Nach dem Anmelden erscheint der MainScreen mit einer Tab Leiste
//die zu Home, Matches und Profil navigieren
export default function CreateAccountScreen({ navigation }) {
  const [checkedW, setCheckedW] = React.useState(false);
  const [checkedE, setCheckedE] = React.useState(false);

  const checkedWorker = () => {
    setCheckedW(!checkedW);
    if (!checkedW) {
      setCheckedE(false);
      setTimeout(() => navigation.navigate("SignupWorker"), 400);
    }
  };

  const checkedEmployer = () => {
    setCheckedE(!checkedE);
    if (!checkedE) {
      setCheckedW(false);
      setTimeout(() => navigation.navigate("SignupEmployer"), 400);
    }
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "white" }}>
      <View style={createAccountstyles.container}>
        <View style={createAccountstyles.greenBox}>
          <View style={{ padding: 17 }}>
            <Text style={createAccountstyles.titleText}>Willkommen bei</Text>
            <Text style={createAccountstyles.titleTwo}>Cohooyo</Text>
          </View>

          <View style={{ alignSelf: "center", flexDirection: "row" }}>
            <View style={createAccountstyles.innerRow} />
          </View>

          <View style={{ paddingBottom: 15 }}>
            <Text style={{ fontWeight: "bold" }}>
              Bist du ein Bewerber oder ein Unternehmen?
            </Text>
          </View>

          <View>
            <View
              style={{
                flexDirection: "row",
                marginBottom: 30,
              }}
            >
              <View>
                <Checkbox
                  status={checkedW ? "checked" : "unchecked"}
                  onPress={checkedWorker}
                />
              </View>
              <View style={{ flex: 2, marginLeft: 15 }}>
                <Text style={{ fontWeight: "bold" }}>Bewerber</Text>
                <Text>
                  Du möchstest einen neuen Job finden?{"\n"}Du bist
                  Berufsanfänger und möchstest{"\n"}deinen Start ins Berufsleben
                  möglichst{"\n"}
                  einfach haben?
                </Text>
              </View>
            </View>

            <View style={{ flexDirection: "row" }}>
              <Checkbox
                status={checkedE ? "checked" : "unchecked"}
                onPress={checkedEmployer}
              />
              <View style={{ flex: 2, marginLeft: 15 }}>
                <Text style={{ fontWeight: "bold" }}>Unternehmen</Text>
                <Text>
                  Du suchst nach einer einfachen Lösung{"\n"}deinen
                  Berwerbungsprozess zu{"\n"}vereinfachen? Du möchstest Bewerber
                  {"\n"}direkt miteinander verfleichen und zu {"\n"}einen
                  Gespräch einladen?
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
