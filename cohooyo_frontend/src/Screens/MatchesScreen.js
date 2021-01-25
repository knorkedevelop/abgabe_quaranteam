import React, { Component, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Image,
  ImageBackground,
} from "react-native";
import { Avatar } from "react-native-elements";
import { Picker } from "@react-native-picker/picker";
import baseStyles from "../../styles/baseStyles";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { AuthContext } from "../../App";
import { Modal, Portal, Provider, ProgressBar } from "react-native-paper";
import kompass from "../../styles/kompass";
import Feather from "react-native-vector-icons/Feather";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import StarRating from "../components/StarRating";
import MaterialIcon from "react-native-vector-icons/MaterialCommunityIcons";

export default function MatchesScreen({ navigation }) {
  const [sort, setSort] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [note, setNote] = useState("");
  const addNote = () => null;
  const [isMatch, setMatch] = useState(true);
  const [isInterview, setInterview] = useState(false);
  const [isHandshake, setHandshake] = useState(false);
  const [modalIcon, setModalIcon] = useState(false);
  const [modalInfo, setModalInfo] = useState(false);
  const [picIndex, setPicIndex] = useState(0);
  const { authState } = React.useContext(AuthContext);

  const images = {
    match: require("../../assets/match.png"),
    interview: require("../../assets/interview.png"),
    handshake: require("../../assets/handshake.png"),
    default:
      "https://moonvillageassociation.org/wp-content/uploads/2018/06/default-profile-picture1.jpg",
  };

  const oneMatch = [
    {
      id: 1,
      name: "KFZ-Mechatroniker/in",
      message: "",
      image: require("../../assets/mechatroniker.jpg"),
      icon: images.match,
    },
  ];

  const matches = [
    {
      id: 1,
      name: "Jaime Tschaik",
      message: "Hallo, ich hätte Interesse!",
      image: require("../../assets/jaime.jpg"),
      icon: images.match,
      star: 0,
      status: 1,
    },
    {
      id: 2,
      name: "Christine Eichel",
      message: "Danke",
      image: require("../../assets/christine.jpg"),
      icon: images.interview,
      star: 5,
      status: 2,
    },
    {
      id: 3,
      name: "Arlon Schwarzenegger",
      message: "alles klar",
      image: require("../../assets/arlon.jpg"),
      icon: images.match,
      star: 4,
      status: 1,
    },
    {
      id: 4,
      name: "Sophia Gottlieb",
      message: "ok",
      image: require("../../assets/sophia.jpg"),
      icon: images.match,
      star: 3,
      status: 1,
    },
    {
      id: 5,
      name: "Eloy Musk",
      message: "bis dann",
      image: require("../../assets/eloy.jpg"),
      icon: images.interview,
      star: 4,
      status: 2,
    },
  ];

  const [workerMatches, setWorkerMatches] = React.useState(matches);
  var gefiltertMatch = [{}];

  React.useEffect(() => {
    let newArr;
    if (isMatch) {
      newArr = [...workerMatches];
      newArr[picIndex].icon = images.match;
      newArr[picIndex].status = 1;
      setWorkerMatches(newArr);
    }

    if (isHandshake) {
      newArr = [...workerMatches];
      newArr[picIndex].icon = images.handshake;
      newArr[picIndex].status = 2;
      setWorkerMatches(newArr);
    }
    if (isInterview) {
      newArr = [...workerMatches];
      newArr[picIndex].icon = images.interview;
      newArr[picIndex].status = 3;
      setWorkerMatches(newArr);
    }
  }, [isHandshake, isInterview, isMatch]);

  const setIcon = (first, second, third) => {
    setMatch(first);
    setInterview(second);
    setHandshake(third);
  };

  const filtering = (value) => {
    if (value == 0) {
      gefiltertMatch = matches.filter(function (el) {
        return el.status == 1 || 2 || 3;
      });
    } else if (value == 1)
      gefiltertMatch = matches.filter(function (el) {
        return el.status == 1;
      });
    else if (value == 2)
      gefiltertMatch = matches.filter(function (el) {
        return el.status == 2;
      });
    else if (value == 3)
      gefiltertMatch = matches.filter(function (el) {
        return el.status == 3;
      });
    setWorkerMatches(gefiltertMatch);
  };

  const match = authState.userIsWorker ? oneMatch : workerMatches;

  return (
    <View style={{ height: "100%" }}>
      <Provider>
        <Portal>
          <Modal
            visible={modalVisible}
            dismissable={false}
            contentContainerStyle={kompass.notizContainer}
          >
            <View style={kompass.noteView}>
              <ImageBackground
                style={kompass.noteImage}
                source={require("../../assets/note.png")}
              >
                <View style={kompass.noteTitleRow}>
                  <TouchableOpacity
                    onPress={() => {
                      setModalVisible(false);
                    }}
                  >
                    <View>
                      <Feather
                        name="x-circle"
                        size={25}
                        style={{ color: "black", marginTop: 8 }}
                      />
                    </View>
                  </TouchableOpacity>
                </View>
                <View style={kompass.inputView}>
                  <TextInput
                    onChangeText={(text) => setNote(text)}
                    multiline
                    defaultValue={note}
                    style={kompass.noteInput}
                  />
                </View>
                <TouchableOpacity
                  onPress={() => {
                    addNote(note);
                    setModalVisible(false);
                  }}
                  style={{ position: "absolute", top: 400, right: 8 }}
                >
                  <MaterialIcon name="check-bold" size={26} />
                </TouchableOpacity>
              </ImageBackground>
            </View>
          </Modal>
          <Modal
            visible={modalIcon}
            dismissable={false}
            contentContainerStyle={kompass.statusContainer}
          >
            <View style={baseStyles.modalView}>
              <Text style={baseStyles.textGematched}>Matching</Text>
              <Text style={baseStyles.textGespraech}>
                Vorstellungs-{"\n"}gespräch
              </Text>
              <TouchableOpacity
                onPress={() => {
                  setModalIcon(false);
                }}
                style={baseStyles.iconOk}
              >
                <FontAwesome name="check-circle" color="white" size={30} />
              </TouchableOpacity>
              <Text style={baseStyles.textEingestellt}>Eingestellt</Text>
              <TouchableOpacity onPress={() => setIcon(true, false, false)}>
                <View
                  style={[
                    baseStyles.modalIcon,
                    {
                      borderColor: isMatch ? "#75FF6E" : "transparent",
                    },
                  ]}
                >
                  <Image
                    source={images.match}
                    style={baseStyles.modalImage}
                  ></Image>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setIcon(false, true, false)}>
                <View
                  style={[
                    baseStyles.modalIcon,
                    {
                      borderColor: isInterview ? "#75FF6E" : "transparent",
                    },
                  ]}
                >
                  <Image
                    source={images.interview}
                    style={baseStyles.modalImage}
                  ></Image>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setIcon(false, false, true)}>
                <View
                  style={[
                    baseStyles.modalIcon,
                    {
                      borderColor: isHandshake ? "#75FF6E" : "transparent",
                    },
                  ]}
                >
                  <Image
                    source={images.handshake}
                    style={baseStyles.modalImage}
                  ></Image>
                </View>
              </TouchableOpacity>
            </View>
          </Modal>

          <Modal
            visible={modalInfo}
            onDismiss={() => setModalInfo(false)}
            dismissable={true}
            contentContainerStyle={kompass.statusContainer}
          >
            <View style={kompass.infoTitleRow}>
              <FontAwesome
                name="info-circle"
                size={17}
                style={kompass.infoCircle}
              />
              <Text style={kompass.infoTitle}>Status Info</Text>
            </View>
            <View style={{ flexDirection: "column" }}>
              <View style={kompass.infoRow}>
                <View style={kompass.infoMatchView}>
                  <Image source={images.match} style={kompass.infoPic} />
                </View>
                <Text style={kompass.infoText}>
                  Matching! Sowohl der Arbeitgeber als auch der Kandidat zeigen
                  Interesse.
                </Text>
              </View>
              <View style={kompass.infoRow}>
                <View style={kompass.infoMatchView}>
                  <Image source={images.interview} style={kompass.infoPic} />
                </View>
                <Text style={kompass.infoText}>
                  Der potentielle Arbeitnehmer wurde zum Vorstellungsgespräch
                  eingeladen.
                </Text>
              </View>
              <View style={kompass.infoRow}>
                <View style={kompass.infoMatchView}>
                  <Image source={images.handshake} style={kompass.infoPic} />
                </View>
                <Text style={kompass.infoText}>
                  Der Kandidat ist für die ausgeschriebene Stelle eingestellt.
                </Text>
              </View>
            </View>
          </Modal>
        </Portal>
        <ScrollView style={{ flex: 1, backgroundColor: "white" }}>
          <View
            style={{
              flex: 1,
              overflow: "hidden",
              backgroundColor: "#f1f6f6",
              marginLeft: 15,
              marginRight: 15,
            }}
          >
            <View style={baseStyles.pickerView}>
              <Picker
                style={baseStyles.pickerOne}
                onValueChange={(v) => filtering(v)}
              >
                <Picker.Item label="Filter" value={0} />
                <Picker.Item label="Matching" value={1} />
                <Picker.Item label="Vorstellungsgespräch" value={2} />
                <Picker.Item label="Eingestellt" value={3} />
              </Picker>

              <Picker style={baseStyles.pickerTwo} onValueChange={setSort}>
                <Picker.Item label="Sortieren" value="Sortieren" />
                <Picker.Item label="Datum" value="Datum" />
                <Picker.Item
                  label="höchste Bewertung"
                  value="höchste Bewertung"
                />
                <Picker.Item label="niedrigste Bewertung" value="Bewertung" />
              </Picker>
            </View>

            {match.map((value, index) => (
              <View key={index} style={baseStyles.matchContainer}>
                <View style={{ flexDirection: "column" }}>
                  <StarRating
                    key={value.star}
                    default={value.star}
                  ></StarRating>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate("ProfileEmployer");
                    }}
                  >
                    <View style={{ marginLeft: 5, marginTop: 4 }}>
                      <Avatar
                        rounded
                        size="large"
                        source={{
                          uri: value.image,
                        }}
                      />
                    </View>
                  </TouchableOpacity>
                </View>
                <View>
                  <TouchableOpacity
                    onPress={() => navigation.navigate("Messages")}
                  >
                    <Text style={baseStyles.matchTextName}>{value.name}</Text>
                    <Text style={baseStyles.matchTextChat}>
                      {value.message}
                    </Text>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity
                  onPress={() => setModalVisible(true)}
                  style={{ position: "absolute", top: 50, right: 4 }}
                >
                  <View>
                    <Icon name="note" size={23} color="#D9C800" />
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  disabled={authState.userIsWorker ? true : false}
                  onPress={() => {
                    setModalIcon(true);
                    setPicIndex(index);
                  }}
                  style={{ position: "absolute", top: 0, right: 0 }}
                >
                  <View style={baseStyles.iconContainer}>
                    <Image
                      source={value.icon}
                      style={baseStyles.iconImage}
                    ></Image>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => setModalInfo(true)}
                  style={{ position: "absolute", top: 1, right: 44 }}
                >
                  <FontAwesome name="info-circle" size={17} color="#CCEEED" />
                </TouchableOpacity>

                <TouchableOpacity
                  style={{ position: "absolute", bottom: 3, right: 7 }}
                >
                  <FontAwesome name="trash" size={22} color="#063737" />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </ScrollView>
      </Provider>
    </View>
  );
}
