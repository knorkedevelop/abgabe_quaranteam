import React from "react";
import { Text, View, Image, ScrollView, TouchableOpacity } from "react-native";
import SwipeCards from "react-native-swipe-cards";
import Feather from "react-native-vector-icons/Feather";
import Card from "../../components/card";
import homeStyles from "../../../styles/homeStyles";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import cardStyles from "../../../styles/cardStyles";
import { Picker } from "@react-native-picker/picker";
import { AuthContext, RecommendationContext } from "../../../App";
import Entypo from "react-native-vector-icons/Entypo";

/*  <View style={{ alignItems: "center" }}>
          <Picker
            style={{
              width: 100,
              height: 20,
              marginRight: 4,
              borderRadius: 6,
              borderWidth: 1,
            }}
            itemStyle={{ backgroundColor: "white" }}
          >
            <Picker.Item label="Filter" value="Filter" />
            <Picker.Item label="Branche 1" value="Branche 1" />
            <Picker.Item label="Branche 2" value="Branche 2" />
            <Picker.Item label="Branche 3" value="Branche 3" />
          </Picker>
        </View> */

//Gibt den Text zurück, dass keine Karten mehr existieren
export default function HomeWorkerScreen() {
  const [scroll, setScroll] = React.useState(true);
  const { recommendationState } = React.useContext(RecommendationContext);
  const [selectedJob, setSelectedJob] = React.useState(-1);

  const outCards = () => {
    return (
      <View style={cardStyles.noMoreCards}>
        <Text>Keine neue Bewerber.</Text>
      </View>
    );
  };

  const infoCard = (worker) => {
    return (
      <View style={cardStyles.card}>
        <Image style={cardStyles.thumbnail} source={{ uri: worker.image }} />
        <View key={worker.id}>
          <View style={{ height: 160 }}>
            <ScrollView style={cardStyles.scrollContainer}>
              <View style={cardStyles.titleContainer}>
                <Text style={cardStyles.title}>
                  {worker.firstName + "  " + worker.lastName}
                </Text>
              </View>
              <View style={cardStyles.location}>
                <Entypo name="location" size={20} color="#696969" />
                <Text style={{ marginLeft: 10 }}>{worker.location}</Text>
              </View>
              <View style={cardStyles.location}>
                <FontAwesome name="birthday-cake" size={18} color="#696969" />
                <Text style={{ marginLeft: 6 }}>
                  {worker.day + "." + worker.month + "." + worker.year}
                </Text>
              </View>
              <View style={cardStyles.description}>
                <Text style={cardStyles.textDescription}>
                  {worker.description}
                </Text>
              </View>
              <View style={{ marginTop: 10 }}>
                <View style={cardStyles.titleContainer}>
                  <Text style={cardStyles.title2}>Hashtags</Text>
                </View>
                <View style={cardStyles.description}>
                  <Text style={cardStyles.textDescription}>
                    {worker.hashtags}
                  </Text>
                </View>
              </View>
            </ScrollView>
          </View>
        </View>
      </View>
    );
  };

  return (
    <ScrollView scrollEnabled={scroll} style={homeStyles.scrollContainer}>
      <View style={{ alignItems: "center" }}>
        <Picker
          style={{
            width: 100,
            height: 20,
            marginRight: 4,
            borderRadius: 6,
            borderWidth: 1,
          }}
          itemStyle={{ backgroundColor: "white" }}
          selectedValue={selectedJob}
          onValueChange={(value) => setSelectedJob(value)}
        >
          <Picker.Item label="Stelle" value={-1} key={-1} />
          {recommendationState.recommendations.map((recommendation, i) => (
            <Picker.Item label={recommendation.job.title} value={i} key={i} />
          ))}
        </Picker>
      </View>
      <View style={homeStyles.swipeContainer}>
        <View style={{ height: 366 }}>
          <SwipeCards
            cards={
              +selectedJob === -1
                ? []
                : recommendationState.recommendations[selectedJob].workers
            }
            loop={false}
            renderCard={(cardData) => infoCard(cardData)}
            renderNoMoreCards={() => outCards()}
            onDragStart={() => {
              setScroll(false);
            }}
            showYup={true}
            onDragRelease={() => {
              setScroll(true);
            }}
            showNope={true}
          />
        </View>
      </View>
    </ScrollView>
  );
}
