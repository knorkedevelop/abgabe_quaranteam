import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  ImageBackground,
  Platform,
  TextInput,
  KeyboardAvoidingView,
} from "react-native";
import profileStyles from "../../../styles/profileStyles";
import * as ImagePicker from "expo-image-picker";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { UserContext } from "../../../App";

//Der Arbeitgeber kann sein Profil bearbeiten
//TODO
export default function EditProfileEmployerScreen({ navigation }) {
  const { userState, setData } = React.useContext(UserContext);

  const [image, setImage] = useState(userState.image);
  const [companyName, setCompanyName] = useState(userState.companyName);
  const [description, setDescription] = useState(userState.description);
  const [logo, setLogo] = useState(userState.logo);
  const [masterCertificate, setMasterCertificate] = useState(
    userState.masterCertificate
  );

  const confirm = function () {
    setData({
      company_name: companyName,
      description: description,
      logo: logo,
      image: image,
      master_certificate: masterCertificate,
    });
    navigation.goBack();
  };

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const {
          status,
        } = await ImagePicker.requestCameraRollPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  return (
    <ScrollView
      style={{
        backgroundColor: "#f1f6f6",
        borderLeftWidth: 15,
        borderRightWidth: 15,
        borderColor: "white",
      }}
    >
      <KeyboardAvoidingView>
        <View style={profileStyles.container}>
          <View style={profileStyles.card}>
            <View style={profileStyles.imageContainer}>
              <TouchableOpacity onPress={pickImage}>
                {null && (
                  <Image
                    source={{ uri: image }}
                    style={{ width: 100, height: 100 }}
                  />
                )}
                <ImageBackground
                  source={{
                    uri: image,
                  }}
                  style={profileStyles.image}
                >
                  <View
                    style={{
                      flex: 1,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Icon
                      name="camera"
                      color="#fff"
                      size={100}
                      style={profileStyles.camera}
                    ></Icon>
                  </View>
                </ImageBackground>
              </TouchableOpacity>
            </View>

            <Text style={profileStyles.titleText}>Unternehmen</Text>
            <TextInput
              onChangeText={(text) => setCompanyName(text)}
              defaultValue={companyName}
              style={{ fontSize: 15 }}
            />
          </View>

          <View style={profileStyles.card}>
            <Text style={profileStyles.titleText}>Betrieb</Text>
            <TextInput
              onChangeText={(text) => setDescription(text)}
              defaultValue={description}
              style={{ fontSize: 15 }}
            />
          </View>

          <View style={profileStyles.card}>
            <Text style={profileStyles.titleText}>Logo</Text>
            <TextInput
              onChangeText={(text) => setLogo(text)}
              defaultValue={logo}
              style={{ fontSize: 15 }}
            />
          </View>

          <View style={profileStyles.card}>
            <Text style={profileStyles.titleText}>Zertifikat</Text>
            <TextInput
              onChangeText={(text) => setMasterCertificate(text)}
              defaultValue={masterCertificate}
              style={{ fontSize: 15 }}
            />
          </View>

          <TouchableOpacity
            style={profileStyles.command}
            onPress={() => confirm()}
          >
            <Text style={profileStyles.commandTitle}>Bestätigen</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
}
