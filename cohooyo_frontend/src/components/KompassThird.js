import * as React from "react";
import { TouchableOpacity, View, Image, Text } from "react-native";
import { Chip } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialIcons";
import kompass from "../../styles/kompass";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const KompassThird = () => {
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
    "introvertiert",
    "extrovertiert",
    "kreativ",
    "risikobereit",
    "organisiert",
    "redundant",
    "teamfähig",
    "belastbar",
    "neugierig",
    "motiviert",
  ];

  const [maxPicked, setMaxPicked] = React.useState(false);
  const [lastIndex, setLastIndex] = React.useState(0);

  React.useEffect(() => {
    var countBegriffe = selectWord.filter(function (value) {
      return value === true;
    }).length;
    if (countBegriffe >= 3) setMaxPicked(true);
    console.log(countBegriffe);
  }, [selectWord]);
  return (
    <View>
      <View>
        <Text style={kompass.question}>
          Welche 3 Adjektive beschreiben dich am besten?
        </Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-evenly",
          marginTop: 10,
          marginBottom: 10,
          alignSelf: "center",
          alignItems: "flex-start",
          flexWrap: "wrap",
        }}
      >
        {begriffe.map((value, index) => (
          <View
            key={index}
            pointerEvents={maxPicked ? "none" : "auto"}
            style={{ opacity: maxPicked && !selectWord[index] ? 0.5 : 1 }}
          >
            <TouchableOpacity
              style={{
                borderRadius: 14,
                padding: 5,
                borderColor: "grey",
                borderWidth: 1,
                backgroundColor: selectWord[index] ? "#97DA71" : "#F2F2F2",
                margin: 4,
              }}
              onPress={() => {
                const arr = [...selectWord];
                arr[index] = !arr[index];
                setLastIndex(index);
                setSelectWord(arr);
              }}
            >
              <View style={{ flexDirection: "row" }}>
                {selectWord[index] ? (
                  <MaterialIcons
                    name="done"
                    size={10}
                    style={{ marginTop: 6 }}
                  />
                ) : (
                  <></>
                )}
                <Text
                  style={{
                    fontWeight: selectWord[index] ? "bold" : "normal",
                    fontSize: 16,
                  }}
                >
                  {value}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        ))}
      </View>
      <View>
        {maxPicked ? (
          <View>
            <TouchableOpacity
              style={{ alignItems: "center", marginLeft: 20, marginTop: 10 }}
              onPress={() => {
                const arr = [...selectWord];
                arr[lastIndex] = false;
                setSelectWord(arr);
                setMaxPicked(false);
              }}
            >
              <Icon name="settings-backup-restore" size={33} color="white" />
            </TouchableOpacity>
          </View>
        ) : (
          <></>
        )}
      </View>
    </View>
  );
};

export default KompassThird;
