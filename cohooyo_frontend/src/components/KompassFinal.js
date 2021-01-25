import * as React from "react";
import { ImageBackground } from "react-native";
import { View, Image, Text, Animated } from "react-native";
import kompass from "../../styles/kompass";

const KompassFinal = () => {
  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  const fadeAnim2 = React.useRef(new Animated.Value(0)).current;
  const fadeAnim3 = React.useRef(new Animated.Value(0)).current;
  const fadeDrum = React.useRef(new Animated.Value(1)).current;
  const [isDrum, setIsDrum] = React.useState(true);

  const fadeOut = () => {
    Animated.timing(fadeDrum, {
      toValue: 0,
      duration: 1950,
    }).start();

    setTimeout(() => {
      setIsDrum(false);
    }, 1950);
  };

  fadeOut();

  const fadeIn = () => {
    // Will change fadeAnim value to 1 in 5 seconds
    Animated.timing(fadeAnim3, {
      toValue: 1,
      duration: 1350,
    }).start();

    setTimeout(() => {
      Animated.timing(fadeAnim2, {
        toValue: 1,
        duration: 1350,
      }).start();
    }, 600);

    setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1350,
      }).start();
    }, 1300);
  };

  setTimeout(() => {
    fadeIn();
  }, 1800);

  return (
    <View>
      <View>
        <Text style={kompass.question}>Deine Treffer</Text>
      </View>

      <View
        style={{ flexDirection: "column", alignItems: "center", marginTop: 18 }}
      >
        {isDrum ? (
          <Animated.View style={{ opacity: fadeDrum }}>
            <Image
              style={{ width: 100, height: 100, marginTop: 60 }}
              source={{
                uri:
                  "https://media.tenor.com/images/e7c1a2852214748a47e1a75bd0a2af4d/tenor.gif",
              }}
            />
          </Animated.View>
        ) : (
          <></>
        )}

        <Animated.View style={{ opacity: fadeAnim }}>
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 33,
              color: "white",
              marginTop: 10,
              textAlign: "center",
            }}
          >
            1. Kfz-Mechatroniker 98%
          </Text>
        </Animated.View>

        <Animated.View style={{ opacity: fadeAnim2 }}>
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 28,
              color: "white",
              marginTop: 17,
              textAlign: "center",
            }}
          >
            2. Elektroniker {"\n"}90%
          </Text>
        </Animated.View>

        <Animated.View style={{ opacity: fadeAnim3 }}>
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 20,
              color: "white",
              marginTop: 18,
              textAlign: "center",
            }}
          >
            3. Metallbauer {"\n"}87%
          </Text>
        </Animated.View>
      </View>
    </View>
  );
};

export default KompassFinal;
