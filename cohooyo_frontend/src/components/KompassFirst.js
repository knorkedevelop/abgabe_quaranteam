import * as React from "react";
import { View, Image, Text } from "react-native";
import Slider from "@react-native-community/slider";
import kompass from "../../styles/kompass";

const KompassFirst = () => {
  const images = {
    image0: require("../../assets/outdoor.png"),
    image1: require("../../assets/indoor.png"),
    image2: require("../../assets/introvertiert.png"),
    image3: require("../../assets/maschinen.png"),
    image4: require("../../assets/kreativ.png"),
    image5: require("../../assets/plan.png"),
    image6: require("../../assets/sun.png"),
    image7: require("../../assets/night.png"),
  };

  const minColor = "#D0D0D0";
  const thumbColor = "#00E3D4";
  const maxColor = "white";

  return (
    <View style={{ marginRight: 3, marginLeft: 3 }}>
      <View style={{ marginTop: 3 }}>
        <Text style={kompass.question}>Arbeitest du lieber...?</Text>
      </View>
      <View style={kompass.sliderRow}>
        <View style={kompass.imageView}>
          <Image style={kompass.imageFirst} source={images.image0} />
          <View style={{ width: 90, alignItems: "center" }}>
            <Text style={kompass.picText}>draußen</Text>
          </View>
        </View>
        <Slider
          style={{ width: 180, height: 40 }}
          minimumValue={0}
          maximumValue={5}
          step={1}
          minimumTrackTintColor={minColor}
          thumbTintColor={thumbColor}
          maximumTrackTintColor={maxColor}
        />

        <View style={kompass.imageView}>
          <Image style={kompass.imageFirst} source={images.image1}></Image>
          <View style={{ width: 90, alignItems: "center" }}>
            <Text style={kompass.picText}>innen</Text>
          </View>
        </View>
      </View>

      <View style={kompass.sliderRow}>
        <View style={kompass.imageView}>
          <Image style={kompass.imageFirst} source={images.image2}></Image>
          <View style={{ width: 130, alignItems: "flex-end" }}>
            <Text style={kompass.picText}>mit Menschen</Text>
          </View>
        </View>
        <Slider
          style={{ width: 180, height: 40 }}
          minimumValue={0}
          maximumValue={5}
          step={1}
          minimumTrackTintColor={minColor}
          thumbTintColor={thumbColor}
          maximumTrackTintColor={maxColor}
        />

        <View style={kompass.imageView}>
          <Image style={kompass.imageFirst} source={images.image3}></Image>
          <View style={{ width: 130, alignItems: "flex-start" }}>
            <Text style={kompass.picText}>mit Maschinen</Text>
          </View>
        </View>
      </View>

      <View style={kompass.sliderRow}>
        <View style={kompass.imageView}>
          <Image style={kompass.imageFirst} source={images.image4}></Image>
          <View style={{ width: 130, alignItems: "center", marginLeft: 10 }}>
            <Text style={kompass.picText}>innovativ</Text>
          </View>
        </View>
        <Slider
          style={{ width: 180, height: 40 }}
          minimumValue={0}
          maximumValue={5}
          step={1}
          minimumTrackTintColor={minColor}
          thumbTintColor={thumbColor}
          maximumTrackTintColor={maxColor}
        />

        <View style={kompass.imageView}>
          <Image style={kompass.imageFirst} source={images.image5}></Image>
          <View style={{ width: 110, alignItems: "center" }}>
            <Text style={kompass.picText}>nach Plan</Text>
          </View>
        </View>
      </View>

      <View style={kompass.sliderRow}>
        <View style={kompass.imageView}>
          <Image style={kompass.imageFirst} source={images.image6}></Image>
          <View style={{ width: 80, alignItems: "center" }}>
            <Text style={kompass.picText}>früh</Text>
          </View>
        </View>
        <Slider
          style={{ width: 180, height: 40 }}
          minimumValue={0}
          maximumValue={5}
          step={1}
          minimumTrackTintColor={minColor}
          thumbTintColor={thumbColor}
          maximumTrackTintColor={maxColor}
        />

        <View style={kompass.imageView}>
          <Image style={kompass.imageFirst} source={images.image7}></Image>
          <View style={{ width: 80, alignItems: "center" }}>
            <Text style={kompass.picText}>spät</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default KompassFirst;
