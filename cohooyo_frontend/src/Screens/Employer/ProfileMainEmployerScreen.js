import React, { Component } from "react";
import { View } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { JobsEmployerScreen, ProfileEmployerScreen } from "../../Screens";
import Icon from "react-native-vector-icons/Ionicons";
import Feather from "react-native-vector-icons/Feather";

const Tab = createMaterialTopTabNavigator();
//erzeugt eine Navigation zu einem neuen Tab für den Arbeitgeber mit 'Profil' und 'Stellenangebote'
export default class ProfileMainEmployerScreen extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <Tab.Navigator
          swipeEnabled={false}
          tabBarOptions={{
            showIcon: true,
            scrollEnabled: false,
            showLabel: false,
            tabBarIcon: { focused: true, color: "#5E5E5E" },
            style: {
              marginLeft: 15,
              marginRight: 15,
              shadowOpacity: 0,
              backgroundColor: "#f1f6f6",
            },
            iconStyle: {
              alignItems: "center",
              justifyContent: "center",
              width: 30,
              height: 30,
            },
            indicatorStyle: {
              backgroundColor: "transparent",
            },
          }}
        >
          <Tab.Screen
            name="Profil"
            component={ProfileEmployerScreen}
            options={{
              tabBarIcon: ({ color, size }) => (
                <Icon name="ios-person" color={color} size={30} />
              ),
            }}
          />
          <Tab.Screen
            name="Stellenangebote"
            component={JobsEmployerScreen}
            options={{
              tabBarIcon: ({ color, size }) => (
                <Feather name="list" color={color} size={30} />
              ),
            }}
          />
        </Tab.Navigator>
      </View>
    );
  }
}
