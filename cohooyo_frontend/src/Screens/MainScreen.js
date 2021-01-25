import React, { Component, useState } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import {
  HomeWorkerScreen,
  HomeEmployerScreen,
  MatchesScreen,
  ProfileMainEmployerScreen,
  ProfileWorkerScreen,
  PickJobChatScreen,
  LoginScreen,
} from "../Screens";
import { View, Dimensions, Text } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Feather from "react-native-vector-icons/Feather";
import { NavigationContainer } from "@react-navigation/native";
import { AuthContext, RecommendationContext } from "../../App";
import baseStyles from "../../styles/baseStyles";

const Tab = createMaterialTopTabNavigator();

//Nach dem Anmelden erscheint der MainScreen mit einer Tab Leiste
//die zu Home, Matches und Profil navigieren
export default function MainScreen({ navigation }) {
  const [showCheat, setShowCheat] = useState(true);
  const { authState } = React.useContext(AuthContext);
  const { notificationCheat } = React.useContext(RecommendationContext);
  const cardsUntilNotification = 6;

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <View
        style={{
          flexDirection: "row",
          marginRight: 15,
          marginLeft: 15,
          marginBottom: 5,
          alignItems: "center",
          backgroundColor: "white",
          borderBottomColor: "#949494",
          borderBottomWidth: 1,
        }}
      ></View>
      <Tab.Navigator
        swipeEnabled={false}
        backBehavior={() => console.log("ES")}
        tabBarOptions={{
          showIcon: true,
          scrollEnabled: false,
          showLabel: false,
          tabBarIcon: { focused: true, color: "#5E5E5E" },
          style: {
            marginLeft: 15,
            marginRight: 15,
            paddingLeft: 40,
            paddingRight: 40,
            shadowOpacity: 0,
            backgroundColor: "#f1f6f6",
          },
          iconStyle: {
            alignItems: "center",
            justifyContent: "center",
            width: 50,
            height: 50,
          },
          indicatorStyle: {
            backgroundColor: "transparent",
          },
        }}
      >
        <Tab.Screen
          name="Home"
          component={
            authState.userIsWorker ? HomeWorkerScreen : HomeEmployerScreen
          }
          options={{
            tabBarIcon: ({ color, size }) => (
              <FontAwesome5 name="compass" color={color} size={50} />
            ),
          }}
        />
        <Tab.Screen
          listeners={() => ({
            tabPress: (e) => {
              setShowCheat(false);
            },
          })}
          name="Matches"
          component={authState.userIsWorker ? MatchesScreen : PickJobChatScreen}
          options={{
            tabBarBadge: 10,
            tabBarLabel: "Home",

            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="email" color={color} size={55} />
            ),
          }}
        />
        <Tab.Screen
          name="Profil"
          component={
            authState.userIsWorker
              ? ProfileWorkerScreen
              : ProfileMainEmployerScreen
          }
          options={{
            tabBarIcon: ({ color, size }) => (
              <Feather name="settings" color={color} size={50} />
            ),
          }}
        />
      </Tab.Navigator>

      {showCheat && notificationCheat.number >= cardsUntilNotification ? (
        <View style={baseStyles.notificationCircle}>
          <Text style={baseStyles.notificationText}>1</Text>
        </View>
      ) : (
          <></>
        )}
    </View>
  );
}
