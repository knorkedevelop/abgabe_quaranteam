import { visible } from "chalk";
import React, { useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
} from "react-native";
import SwipeCards from "react-native-swipe-cards";
import Card from "../../components/card";
import homeStyles from "../../../styles/homeStyles";
import cardStyles from "../../../styles/cardStyles";
import Entypo from "react-native-vector-icons/Entypo";
import Feather from "react-native-vector-icons/Feather";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { ImageBackground } from "react-native";
import { AuthContext, RecommendationContext } from "../../../App";
import { Modal, Portal, Provider } from "react-native-paper";
import kompass from "../../../styles/kompass";

export default function HomeWorkerScreen() {
  const [scroll, setScroll] = React.useState(true);
  const {
    recommendationState,
    likeRecommendation,
    dislikeRecommendation,
    notificationCheat,
  } = React.useContext(RecommendationContext);
  const [modalVisible, setModalVisible] = useState(true);

  const outCards = () => {
    return (
      <View style={cardStyles.noMoreCards}>
        <Text>Keine Jobs mehr.</Text>
      </View>
    );
  };

  const infoCard = (recommendation) => {
    return (
      <View style={cardStyles.card}>
        <Image
          style={cardStyles.thumbnail}
          source={{
            uri: recommendation.image ?? "https://via.placeholder.com/150",
          }}
        />
        <View style={{ height: 160 }}>
          <ScrollView style={cardStyles.scrollContainer}>
            <View style={cardStyles.titleContainer}>
              <Text style={cardStyles.title}>{recommendation.title}</Text>
            </View>

            <View style={cardStyles.location}>
              <Entypo name="location" size={20} color="#696969" />
              <Text style={{ marginLeft: 10 }}>{recommendation.location}</Text>
            </View>
            <View style={cardStyles.description}>
              <Text style={cardStyles.textDescription}>
                {recommendation.description}
              </Text>
            </View>

            <View style={{ marginTop: 10 }}>
              <View style={cardStyles.titleContainer}>
                <Text style={cardStyles.title2}>NICE HAVE</Text>
              </View>
              <View style={cardStyles.description}>
                <Text style={cardStyles.textDescription}>
                  {recommendation.niceHave}
                </Text>
              </View>
            </View>

            <View style={{ marginTop: 10 }}>
              <View style={cardStyles.titleContainer}>
                <Text style={cardStyles.title2}>MUST HAVE</Text>
              </View>
              <View style={cardStyles.description}>
                <Text style={cardStyles.textDescription}>
                  {recommendation.mustHave}
                </Text>
              </View>
            </View>

            <View style={{ marginTop: 10 }}>
              <View style={cardStyles.titleContainer}>
                <Text style={cardStyles.title2}>HASHTAGS</Text>
              </View>
              <View style={cardStyles.description}>
                <Text style={cardStyles.textDescription}>
                  {recommendation.hashtags}
                </Text>
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    );
  };

  return (
    <View style={{ height: "100%" }}>
      <Provider>
        <ScrollView scrollEnabled={scroll} style={homeStyles.scrollContainer}>
          <View style={homeStyles.swipeContainer}>
            <View style={{ height: 366 }}>
              <SwipeCards
                cards={recommendationState.recommendations}
                loop={false}
                renderCard={(cardData) => infoCard(cardData)}
                keyExtractor={(cardData) => cardData.id}
                renderNoMoreCards={() => outCards()}
                onDragStart={() => setScroll(false)}
                showYup={true}
                onDragRelease={() => setScroll(true)}
                showNope={true}
                handleYup={(rec) => {
                  likeRecommendation(rec.id);
                }}
                handleNope={(rec) => {
                  dislikeRecommendation(rec.id);
                }}
              />
            </View>
          </View>
        </ScrollView>
      </Provider>
    </View>
  );
}
