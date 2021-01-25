import React, { useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  ImageBackground,
} from "react-native";
import profileStyles from "../../../styles/profileStyles";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Modal, Portal, Provider, ProgressBar } from "react-native-paper";
import { UserContext, AuthContext } from "../../../App";
import kompass from "../../../styles/kompass";
import KompassFirst from "../../components/KompassFirst";
import KompassSecond from "../../components/KompassSecond";
import KompassThird from "../../components/KompassThird";
import KompassFinal from "../../components/KompassFinal";
import { FA5Style } from "react-native-vector-icons/FontAwesome5";
import KompassBot from "../../components/KompassBot";
//Das Profil des Azubis mit Bild und Infos werden angezeigt.
//Zugriff auf Profil bearbeiten und auf Einstellungen

//TODO: Form, shown information in all fields has to be editable
//https://stackoverflow.com/questions/43667417/react-native-redux-form-to-edit-own-profile

export default function ProfileWorkerScreen({ navigation }) {
  const { userState, setData } = React.useContext(UserContext);
  const { logOut } = React.useContext(AuthContext);
  const [visible, setVisible] = React.useState(false);
  const [firstCompass, setFirstCompass] = React.useState(true);
  const [secondCompass, setSecondCompass] = React.useState(false);
  const [thirdCompass, setThirdCompass] = React.useState(false);
  const [finalCompass, setFinalCompass] = React.useState(false);
  const [hashtagCompass, setHashtagCompass] = React.useState(false);
  const [progress, setProgress] = React.useState(0);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const submitHashtags = function () {
    console.log(selectedHashtags);
    setData({
      first_name: userState.firstName,
      last_name: userState.lastName,
      birth_day: userState.day,
      birth_month: userState.month,
      birth_year: userState.year,
      location: userState.location,
      image: userState.image,
      hashtags: (userState.hashtags !== null && userState.hashtags.length > 0
        ? [userState.hashtags]
        : []
      )
        .concat(selectedHashtags)
        .join(" "),
      cv: null,
    });
    hideModal();
  };

  function openCompass(first, second, third, final, hashtag) {
    setFirstCompass(first);
    setSecondCompass(second);
    setThirdCompass(third);
    setFinalCompass(final);
    setHashtagCompass(hashtag);
  }

  const [selectedHashtags, setSelectedHashtags] = useState([]);

  React.useEffect(() => {
    if (firstCompass) setProgress(0.2);
    if (secondCompass) setProgress(0.4);
    if (thirdCompass) setProgress(0.6);
    if (finalCompass) setProgress(0.8);
    if (hashtagCompass) setProgress(1);
  }, [firstCompass, secondCompass, thirdCompass, finalCompass]);

  return (
    <View style={{ height: "100%" }}>
      <Provider>
        <Portal>
          <Modal
            visible={visible}
            onDismiss={hideModal}
            dismissable={false}
            contentContainerStyle={kompass.container}
          >
            <View style={{ flex: 1 }}>
              <ImageBackground
                style={{
                  flex: 1,
                  height: 460,
                  width: 340,
                  borderRadius: 20,
                }}
                source={{
                  uri:
                    "https://www.webfx.com/blog/images/cdn.designinstruct.com/files/234-colored_vintage_paper_textures/colored_vintage_paper_texture_19_sea_green.jpg",
                }}
              >
                <ProgressBar
                  progress={progress}
                  color={hashtagCompass ? "#00F454" : "#00F6EC"}
                  style={{ height: 11, borderRadius: 4, margin: 4 }}
                ></ProgressBar>

                <View style={kompass.titleRow}>
                  <View
                    style={{
                      width: 50,
                      height: 50,
                      marginLeft: 150,
                    }}
                  >
                    <Image
                      style={{ width: 50, height: 50 }}
                      source={require("../../../assets/compass.png")}
                    ></Image>
                  </View>
                  <TouchableOpacity
                    onPress={() => {
                      setVisible(false);
                    }}
                  >
                    <View style={{ alignItems: "flex-end", marginRight: 4 }}>
                      <Feather
                        name="x-circle"
                        size={25}
                        style={{ color: "white" }}
                      />
                    </View>
                  </TouchableOpacity>
                </View>
                <View>
                  {firstCompass ? (
                    <View>
                      <KompassFirst />
                      <TouchableOpacity
                        style={kompass.arrow}
                        onPress={() =>
                          openCompass(false, true, false, false, false)
                        }
                      >
                        <FontAwesome
                          name="long-arrow-right"
                          size={32}
                          color="white"
                        />
                      </TouchableOpacity>
                    </View>
                  ) : (
                    <></>
                  )}
                  {secondCompass ? (
                    <View>
                      <KompassSecond />
                      <TouchableOpacity
                        style={kompass.arrowLeft}
                        onPress={() =>
                          openCompass(true, false, false, false, false)
                        }
                      >
                        <FontAwesome
                          name="long-arrow-left"
                          size={32}
                          color="white"
                        />
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={kompass.arrow}
                        onPress={() =>
                          openCompass(false, false, true, false, false)
                        }
                      >
                        <FontAwesome
                          name="long-arrow-right"
                          size={32}
                          color="white"
                        />
                      </TouchableOpacity>
                    </View>
                  ) : (
                    <></>
                  )}
                  {thirdCompass ? (
                    <View style={{ flex: 1 }}>
                      <KompassThird />
                      <TouchableOpacity
                        style={kompass.arrowLeft}
                        onPress={() =>
                          openCompass(false, true, false, false, false)
                        }
                      >
                        <FontAwesome
                          name="long-arrow-left"
                          size={32}
                          color="white"
                        />
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={kompass.arrow}
                        onPress={() =>
                          openCompass(false, false, false, true, false)
                        }
                      >
                        <FontAwesome
                          name="long-arrow-right"
                          size={32}
                          color="white"
                        />
                      </TouchableOpacity>
                    </View>
                  ) : (
                    <></>
                  )}
                  {finalCompass ? (
                    <View>
                      <KompassFinal />
                      <TouchableOpacity
                        style={kompass.arrowLeft}
                        onPress={() =>
                          openCompass(false, false, true, false, false)
                        }
                      >
                        <FontAwesome
                          name="long-arrow-left"
                          size={32}
                          color="white"
                        />
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={kompass.arrow}
                        onPress={() =>
                          openCompass(false, false, false, false, true)
                        }
                      >
                        <FontAwesome
                          name="long-arrow-right"
                          size={32}
                          color="white"
                        />
                      </TouchableOpacity>
                    </View>
                  ) : (
                    <></>
                  )}
                  {hashtagCompass ? (
                    <View>
                      <KompassBot setWords={setSelectedHashtags} />
                      <TouchableOpacity
                        onPress={submitHashtags}
                        style={kompass.fertigButton}
                      >
                        <Text style={kompass.fertigText}>fertig</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={kompass.arrowLeft}
                        onPress={() =>
                          openCompass(false, false, false, true, false)
                        }
                      >
                        <FontAwesome
                          name="long-arrow-left"
                          size={32}
                          color="white"
                        />
                      </TouchableOpacity>
                    </View>
                  ) : (
                    <></>
                  )}
                </View>
              </ImageBackground>
            </View>
          </Modal>
        </Portal>
        <ScrollView style={profileStyles.scrollView}>
          <View
            style={{
              backgroundColor: "#f1f6f6",
              marginLeft: 15,
              marginRight: 15,
              //paddingBottom: visible ? 165 : 1,
            }}
          >
            <View style={profileStyles.container}>
              <View style={profileStyles.headRow}>
                <TouchableOpacity onPress={showModal}>
                  <View style={{ flexDirection: "row" }}>
                    <Text style={{ fontWeight: "bold" }}>Job Kompass</Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    logOut();
                  }}
                >
                  <Icon name="logout" size={27} style={{ color: "black" }} />
                </TouchableOpacity>
              </View>

              <View style={profileStyles.card}>
                <View style={profileStyles.imageContainer}>
                  <Image
                    source={{ uri: userState.image }}
                    style={profileStyles.image}
                  />
                </View>

                <View style={{ marginLeft: 6 }}>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text style={profileStyles.titleText}>
                      {userState.firstName} {userState.lastName}{" "}
                    </Text>
                    <TouchableOpacity
                      onPress={() => {
                        navigation.navigate("EditProfileWorker");
                      }}
                    >
                      <FontAwesome
                        name="edit"
                        size={25}
                        style={{ marginRight: 3 }}
                      />
                    </TouchableOpacity>
                  </View>
                  <View style={{ flexDirection: "row" }}>
                    <Icon name="map-marker-outline" size={18} />
                    <Text style={{ fontSize: 17 }}>{userState.location}</Text>
                  </View>
                  <Text style={{ fontSize: 17 }}>
                    geboren: {userState.day}.{userState.month}.{userState.year}
                  </Text>
                </View>
              </View>

              <View style={profileStyles.card}>
                <Text style={profileStyles.titleText}>Hashtags</Text>
                <View>
                  <Text>{userState.hashtags}</Text>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </Provider>
    </View>
  );
}
