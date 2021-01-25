import React, { Component, useState, useEffect } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  Button,
  ScrollView,
  SafeAreaView,
  ImageBackground,
  StyleSheet,
  Platform,
  TextInput,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Feather from "react-native-vector-icons/Feather";
import profileStyles from "../../../styles/profileStyles";
import modals from "../../../styles/modals";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import * as ImagePicker from "expo-image-picker";
import * as DocumentPicker from "expo-document-picker";
import { UserContext } from "../../../App";

function EditProfilWokerScreen({ navigation }) {
  const { userState, setData } = React.useContext(UserContext);

  const [image, setImage] = useState(userState.image);
  const [firstName, setFirstName] = useState(userState.firstName);
  const [lastName, setLastName] = useState(userState.lastName);
  const [day, setDay] = useState(userState.day);
  const [month, setMonth] = useState(userState.month);
  const [year, setYear] = useState(userState.year);
  const [location, setLocation] = useState(userState.location);
  const [hashtags, setHashtags] = useState(userState.hashtags);

  const [cv, setCv] = useState("");
  const [generate, setGenerate] = useState(false);

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

  const pickDocument = async () => {
    let result = await DocumentPicker.getDocumentAsync({});
    console.log(" GRÖSSE: " + result.size);
    setCv(result);
  };

  const confirm = function () {
    setData({
      first_name: firstName,
      last_name: lastName,
      birth_day: day,
      birth_month: month,
      birth_year: year,
      location,
      image,
      hashtags,
      cv: null,
    });
    navigation.goBack();
  };

  return (
    <ScrollView style={{ backgroundColor: "white" }}>
      <View
        style={{ backgroundColor: "#f1f6f6", marginLeft: 15, marginRight: 15 }}
      >
        <View
          pointerEvents={generate ? "none" : "auto"}
          style={{
            opacity: generate ? 0.1 : 1,
            marginLeft: 10,
            marginRight: 10,
            paddingTop: 20,
            paddingBottom: 20,
            flex: 1,
            backgroundColor: "transparent",
            justifyContent: "flex-start",
          }}
        >
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

            <View style={{ marginLeft: 6 }}>
              <View style={{ flex: 1, flexDirection: "row" }}>
                <View style={{ flex: 1 }}>
                  <TextInput
                    onChangeText={(text) => setFirstName(text)}
                    placeholder="Vorname"
                    defaultValue={firstName}
                    style={{ fontSize: 17, fontWeight: "bold" }}
                  />
                </View>
                <View style={{ flex: 1 }}>
                  <TextInput
                    onChangeText={(text) => setLastName(text)}
                    placeholder="Nachname"
                    defaultValue={lastName}
                    style={{ fontSize: 17, fontWeight: "bold" }}
                  />
                </View>
              </View>

              <View style={{ flexDirection: "row" }}>
                <Icon name="map-marker-outline" size={18} />
                <TextInput
                  style={{ fontSize: 17 }}
                  onChangeText={(text) => setLocation(text)}
                  defaultValue={location}
                  placeholder="Standort"
                />
              </View>

              <View style={{ flexDirection: "row" }}>
                <TextInput
                  style={{ fontSize: 17, height: 25, width: 66 }}
                  onChangeText={(text) => setDay(text)}
                  defaultValue={day}
                  placeholder="Tag"
                />
                <TextInput
                  style={{ fontSize: 17, height: 25, width: 66 }}
                  onChangeText={(text) => setMonth(text)}
                  defaultValue={month}
                  placeholder="Monat"
                />
                <TextInput
                  style={{ fontSize: 17, height: 25, width: 66 }}
                  onChangeText={(text) => setYear(text)}
                  defaultValue={year}
                  placeholder="Jahr"
                />
              </View>
            </View>
          </View>

          <View style={profileStyles.card}>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text style={profileStyles.titleText}>Tags</Text>
            </View>

            <TextInput
              onChangeText={(text) => setHashtags(text)}
              defaultValue={hashtags}
              placeholder="Hashtag"
            />
          </View>

          <View style={profileStyles.card}>
            <TouchableOpacity onPress={pickDocument}>
              <Text style={profileStyles.titleText}>Uploads</Text>
              <FontAwesome name="files-o" size={15} style={{ margin: 3 }} />
            </TouchableOpacity>

            <Text>{cv.name}</Text>
          </View>

          <TouchableOpacity
            style={profileStyles.command}
            onPress={() => confirm()}
          >
            <Text style={profileStyles.commandTitle}>Bestätigen</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

export default EditProfilWokerScreen;
