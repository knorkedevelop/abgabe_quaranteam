import React from "react";
import {
  View,
  TextInput,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import JobsEmployerStyles from "../../../styles/JobsEmployerStyles";
import { JobContext } from "../../../App";

//Die Stellenangebote, die der Arbeitgeber anbietet werden angezeigt. Man kann
//sie bearbeiten oder mehr Informationen anzeigen
//TODO: actual implementation
export default function JobsEmployerScreen({ navigation }) {
  const { jobState } = React.useContext(JobContext);

  //einzelnene Karten mit den Stellenangeboten werden gerendert
  return (
    <ScrollView style={JobsEmployerStyles.scrollView}>
      <View style={JobsEmployerStyles.container}>
        {jobState.jobs.map((job) => (
          <View style={{ flexDirection: "row" }} key={job.id}>
            <View
              style={{
                flex: 1,
                backgroundColor: job.isActive ? "#3ba79c" : "#666666",
                width: 155,
                height: 60,
                marginRight: 5,
                marginLeft: 5,
                marginBottom: 10,
              }}
            >
              {/* <Image
                  source={require("../../../assets/homeWorkerExample.jpg")}
                  style={JobsEmployerStyles.image}
                ></Image> */}

              <TextInput
                placeholder="Stellenname"
                editable={false}
                value={job.title}
                style={JobsEmployerStyles.textinputTitle}
              ></TextInput>
              <TextInput
                placeholder="Ort"
                editable={false}
                value={job.location}
                style={JobsEmployerStyles.textinput}
              ></TextInput>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("EditJob", {
                    newJob: false,
                    jobId: job.id,
                  })
                }
                style={{ position: "absolute", top: 18, right: 10 }}
              >
                <View>
                  <Icon name="pen" size={23} />
                </View>
              </TouchableOpacity>
            </View>
          </View>
        ))}

        <View
          style={{
            backgroundColor: "#3ba79c",
            width: 155,
            height: 155,
            marginLeft: 5,
            marginBottom: 10,
          }}
        >
          <TouchableOpacity
            onPress={() => navigation.navigate("EditJob", { newJob: true })}
          >
            <Icon
              name="plus"
              size={70}
              style={{
                opacity: 0.5,
                alignSelf: "center",
                marginTop: 43,
              }}
            />
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
