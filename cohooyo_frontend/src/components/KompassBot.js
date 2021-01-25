import * as React from "react";
import { TouchableOpacity, View, Image, Text } from "react-native";
import kompass from "../../styles/kompass";

const KompassBot = ({ setWords }) => {
  const [selectWord, setSelectWord] = React.useState([
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ]);
  const begriffe = [
    "#Kfz-mechatroniker",
    "#Elektriker",
    "#Metallbauer",
    "#belastbar",
    "#auto",
    "#organisiert",
    "#introvertiert",
  ];

  return (
    <View>
      <Text style={kompass.question}>
        Wähle noch für dein Profil passende Hashtags
      </Text>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-evenly",
          marginTop: 10,
          marginBottom: 5,
          alignItems: "flex-start",
          flexWrap: "wrap",
        }}
      >
        {begriffe.map((value, index) => (
          <View key={index}>
            <TouchableOpacity
              style={{
                borderRadius: 16,
                padding: 7,
                borderColor: "grey",
                borderWidth: 1,
                backgroundColor: selectWord[index] ? "#97DA71" : "#F2F2F2",
                marginTop: 3,
              }}
              onPress={() => {
                const arr = [...selectWord];
                arr[index] = !arr[index];
                setSelectWord(arr);
                setWords(begriffe.filter((_, i) => arr[i]));
              }}
            >
              <Text
                style={{
                  fontWeight: selectWord[index] ? "bold" : "normal",
                  fontSize: 15,
                }}
              >
                {value}
              </Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </View>
  );
};

export default KompassBot;
