import * as React from "react";
import { TouchableOpacity, View, Image, Text } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import kompass from "../../styles/kompass";

const KompassSecond = () => {
  const images = [
    "car",
    "crucible",
    "fashion",
    "flash",
    "glass",
    "groceries",
    "wood",
    "hot-stones",
    "medicine",
    "plastic",
    "viola",
    "potter-wheel",
  ];

  const [lastIndexPic, setLastIndexPic] = React.useState(0);
  const [maxPickedImg, setMaxPickedImg] = React.useState(false);
  const [pickImg, setPickImg] = React.useState([
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
    false,
  ]);

  React.useEffect(() => {
    var countPics = pickImg.filter(function (value) {
      return value === true;
    }).length;
    console.log(countPics);
    if (countPics >= 3) setMaxPickedImg(true);
  }, [pickImg]);

  return (
    <View>
      <View>
        <Text style={kompass.question}>
          Welche 3 Abbildungen sprechen dich an?
        </Text>
      </View>
      <View
        style={{
          marginTop: 10,
          marginBottom: 16,
          flexDirection: "row",
          alignSelf: "center",
          justifyContent: "center",
          alignItems: "flex-start",
          flexWrap: "wrap",
        }}
      >
        {images.map((value, index) => (
          <View
            style={{
              backgroundColor: "white",
              opacity: maxPickedImg && !pickImg[index] ? 0.4 : 1,
              width: 70,
              height: 70,
              marginLeft: 5,
              marginBottom: 5,
              shadowOpacity: 0.5,
              shadowOffset: { width: 0, height: 1 },
              elevation: 5,
              borderRadius: 8,
            }}
            key={index}
          >
            <TouchableOpacity
              disabled={maxPickedImg ? true : false}
              onPress={() => {
                const arr = [...pickImg];
                arr[index] = !arr[index];
                setLastIndexPic(index);
                setPickImg(arr);
              }}
            >
              <Image
                key={index}
                style={{
                  opacity: maxPickedImg && !pickImg[index] ? 0.4 : 1,
                  width: 70,
                  height: 70,
                  borderColor: pickImg[index] ? "#7BF535" : "black",
                  borderWidth: pickImg[index] ? 5 : 2,
                  borderRadius: 8,
                }}
                source={require(`../../assets/${value}.png`)}
              ></Image>
            </TouchableOpacity>
          </View>
        ))}
      </View>
      <View>
        {maxPickedImg ? (
          <View>
            <TouchableOpacity
              style={{ alignItems: "center", marginLeft: 20 }}
              onPress={() => {
                const arr = [...pickImg];
                arr[lastIndexPic] = false;
                setPickImg(arr);
                setMaxPickedImg(false);
              }}
            >
              <Icon name="settings-backup-restore" size={30} color="white" />
            </TouchableOpacity>
          </View>
        ) : (
          <></>
        )}
      </View>
    </View>
  );
};

export default KompassSecond;
