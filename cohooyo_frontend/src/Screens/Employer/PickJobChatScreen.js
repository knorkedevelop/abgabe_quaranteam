import React, { useState } from "react";
import { Text, View, TouchableOpacity, ScrollView } from "react-native";
import baseStyles from "../../../styles/baseStyles";
import Feather from "react-native-vector-icons/Feather";

export default function PickJobChatScreen({ navigation }) {
  return (
    <ScrollView
      style={{
        backgroundColor: "#f1f6f6",
        borderLeftWidth: 15,
        borderRightWidth: 15,
        borderColor: "white",
      }}
    >
      <View
        style={{
          marginLeft: 15,
          marginRight: 15,
        }}
      >
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginTop: 40,
          }}
        >
          <TouchableOpacity
            onPress={() => {
              navigation.push("Matches");
            }}
            style={baseStyles.stelleButton}
          >
            <Text style={baseStyles.stelleText}>KFZ-Mechatroniker/in</Text>
            <Feather name="chevron-right" size={38} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
