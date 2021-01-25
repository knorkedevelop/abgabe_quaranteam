import React from "react";
import { Text, View, Image, TouchableWithoutFeedback } from "react-native";
import cardStyles from "../../styles/cardStyles";

//Die Klasse Card gibt eine View mit Bild+Text der Karten zurück
//TODO Modularisierung und nur 1 HomeScreen fuer Worker UND Employer
class Card extends React.Component {
  constructor(props) {
    super(props);
  }

  //Das Bild und der Name der Karten werden vom Array "cards"
  //ausgelesen und gerendert
  render() {
    return (
      <TouchableWithoutFeedback>
        <View style={cardStyles.card}>
          <Image
            style={cardStyles.thumbnail}
            source={{ uri: this.props.image }}
          />
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

export default Card;
