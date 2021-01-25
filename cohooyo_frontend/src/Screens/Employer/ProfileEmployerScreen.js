import React from "react";
import { Text, View, TouchableOpacity, Image, ScrollView } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import profileStyles from "../../../styles/profileStyles";
import { UserContext } from "../../../App";
import { AuthContext } from "../../../App";

//Das Profil des Arbeitgebers mit Bild und Infos werden angezeigt.
//Zugriff auf Profil bearbeiten und auf Einstellungen
//TODO
export default function ProfileWorkerScreen({ navigation }) {
  const { userState } = React.useContext(UserContext);
  const { logOut } = React.useContext(AuthContext);

  return (
    <ScrollView style={profileStyles.scrollView}>
      <View style={profileStyles.headRow2}>
        <TouchableOpacity
          onPress={() => {
            logOut();
          }}
        >
          <Icon name="logout" size={27} style={{ color: "black" }} />
        </TouchableOpacity>
      </View>

      <View style={profileStyles.container}>
        <View style={profileStyles.card}>
          <View style={profileStyles.imageContainer}>
            <Image
              source={{ uri: userState.image }}
              style={profileStyles.image}
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text style={profileStyles.titleText}>{userState.companyName}</Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("EditProfileEmployer");
              }}
            >
              <FontAwesome name="edit" size={25} style={{ marginRight: 3 }} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={profileStyles.card}>
          <Text style={profileStyles.titleText}>Beschreibung</Text>
          <Text>{userState.description}</Text>
        </View>

        <View style={profileStyles.card}>
          <Text style={profileStyles.titleText}>Logo</Text>
          <Text>{userState.logo}</Text>
        </View>

        <View style={profileStyles.card}>
          <Text style={profileStyles.titleText}>Zertifikat</Text>
          <Text>{userState.masterCertificate}</Text>
        </View>
      </View>
      <View style={{ alignItems: "center", marginRight: 12 }}></View>
    </ScrollView>
  );
}
