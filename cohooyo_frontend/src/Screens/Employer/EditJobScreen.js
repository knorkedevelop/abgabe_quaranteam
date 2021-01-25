import React from "react";
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Image,
} from "react-native";
import profileStyles from "../../../styles/profileStyles";
import { Modal, Portal, Provider, ProgressBar } from "react-native-paper";
import { JobContext } from "../../../App";
import kompass from "../../../styles/kompass";
import Feather from "react-native-vector-icons/Feather";

//Der Arbeitgeber kann sein Profil bearbeiten
//TODO
export default function EditJobScreen({
  navigation,
  route: {
    params: { newJob, jobId },
  },
}) {
  const {
    jobState,
    createJob,
    updateJob,
    removeJob,
    toggleActivateJob,
  } = React.useContext(JobContext);

  const job = newJob
    ? {
      title: "",
      location: "",
      description: "",
      mustHave: "",
      niceHave: "",
      hashtags: "",
      isActive: true,
    }
    : jobState.jobs.filter((job) => job.id === jobId)[0];

  const [title, setTitle] = React.useState(job.title);
  const [location, setLocation] = React.useState(job.location);
  const [description, setDescription] = React.useState(job.description);
  const [mustHave, setMustHave] = React.useState(job.mustHave);
  const [niceHave, setNiceHave] = React.useState(job.niceHave);
  const [hashtags, setHashtags] = React.useState(job.hashtags);
  const [isActive, _] = React.useState(job.isActive);
  const [visible, setVisible] = React.useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  return (
    <ScrollView
      style={{
        flex: 1,
        flexWrap: "nowrap",
        backgroundColor: "#f1f6f6",
        borderLeftWidth: 15,
        borderRightWidth: 15,
        borderColor: "white",
      }}
    >
      <Provider>
        <Portal>
          <Modal
            visible={visible}
            onDismiss={hideModal}
            dismissable={true}
            contentContainerStyle={kompass.botContainer}
          >
            <View style={kompass.titleRow}>
              <Text style={kompass.botTitle}>HashtagBot</Text>
              <TouchableOpacity
                onPress={() => {
                  setVisible(false);
                }}
              >
                <View style={{ alignItems: "flex-end" }}>
                  <Feather
                    name="x-circle"
                    size={25}
                    style={{ color: "black" }}
                  />
                </View>
              </TouchableOpacity>
            </View>
          </Modal>
        </Portal>
        <View style={profileStyles.container}>
          <View style={profileStyles.card}>
            <View style={{ marginLeft: 6, flexDirection: "column" }}>
              <View style={profileStyles.row}>
                <View style={{ width: 112 }}>
                  <Text style={profileStyles.title}>Titel:</Text>
                </View>
                <TextInput
                  onChangeText={(text) => setTitle(text)}
                  defaultValue={title}
                  style={profileStyles.textValue}
                />
              </View>

              <View style={profileStyles.row}>
                <View style={{ width: 112 }}>
                  <Text style={profileStyles.title}>Standort:</Text>
                </View>
                <TextInput
                  onChangeText={(text) => setLocation(text)}
                  defaultValue={location}
                  style={profileStyles.textValue}
                />
              </View>

              <View style={profileStyles.row}>
                <View style={{ width: 112 }}>
                  <Text style={profileStyles.title}>Beschreibung:</Text>
                </View>
                <TextInput
                  multiline
                  onChangeText={(text) => setDescription(text)}
                  defaultValue={description}
                  style={profileStyles.bigTextValue}
                />
              </View>

              <View style={profileStyles.row}>
                <View style={{ width: 112 }}>
                  <Text style={profileStyles.title}>Must-Have:</Text>
                </View>
                <TextInput
                  onChangeText={(text) => setMustHave(text)}
                  multiline
                  defaultValue={mustHave}
                  style={profileStyles.bigTextValue}
                />
              </View>

              <View style={profileStyles.row}>
                <View style={{ width: 112 }}>
                  <Text style={profileStyles.title}>Nice-Have:</Text>
                </View>
                <TextInput
                  onChangeText={(text) => setNiceHave(text)}
                  multiline
                  defaultValue={niceHave}
                  style={profileStyles.bigTextValue}
                />
              </View>
              <View
                style={{ marginRight: 4, padding: 6, flexDirection: "row" }}
              >
                <View style={{ width: 112 }}>
                  <Text style={profileStyles.title}>Hashtags:</Text>
                </View>
                <TextInput
                  onChangeText={(text) => setHashtags(text)}
                  multiline
                  defaultValue={hashtags}
                  style={profileStyles.bigTextValue}
                />
                <TouchableOpacity onPress={showModal}>
                  <View style={{ width: 30, height: 30 }}>
                    <Image
                      style={{ width: 30, height: 30 }}
                      source={{
                        uri:
                          "https://www.clipartmax.com/png/full/152-1527696_generator-electric-generator-icon.png",
                      }}
                    ></Image>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <TouchableOpacity
            style={profileStyles.command}
            onPress={() => {
              if (newJob)
                createJob({
                  title,
                  type: "none",
                  description,
                  location,
                  must_have: mustHave,
                  nice_have: niceHave,
                  hashtags: hashtags,
                  is_active: true,
                });
              else
                updateJob(jobId, {
                  title,
                  job_type: "none",
                  description,
                  location,
                  must_have: mustHave,
                  nice_have: niceHave,
                  hashtags: hashtags,
                  is_active: isActive,
                });
              navigation.goBack();
            }}
          >
            <Text style={profileStyles.commandTitle}>Bestätigen</Text>
          </TouchableOpacity>
          {newJob ? (
            <></>
          ) : (
              <>
                <TouchableOpacity
                  style={profileStyles.delete}
                  onPress={() => {
                    removeJob(jobId);
                    navigation.goBack();
                  }}
                >
                  <Text style={profileStyles.commandTitle}>Löschen</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={profileStyles.deactive}
                  onPress={() => {
                    toggleActivateJob(jobId);
                    navigation.goBack();
                  }}
                >
                  <Text style={profileStyles.commandTitle}>
                    {isActive ? "Deaktivieren" : "Aktivieren"}
                  </Text>
                </TouchableOpacity>
              </>
            )}
        </View>
      </Provider>
    </ScrollView>
  );
}
