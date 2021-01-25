import React, { Component } from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";

export default class Myapp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Default_Rating: this.props.default,
      Max_Rating: 5,
    };

    this.Star = "star";

    this.Star_With_Border = "starEmpty";
  }
  UpdateRating(key) {
    this.setState({ Default_Rating: key });
  }
  render() {
    let React_Native_Rating_Bar = [];

    //{require(`../../assets/${this.Star}.png`)}

    for (var i = 1; i <= this.state.Max_Rating; i++) {
      React_Native_Rating_Bar.push(
        <TouchableOpacity
          activeOpacity={0.7}
          key={i}
          onPress={this.UpdateRating.bind(this, i)}
        >
          <Image
            style={styles.StarImage}
            source={
              i <= this.state.Default_Rating
                ? require(`../../assets/${this.Star}.png`)
                : require(`../../assets/${this.Star_With_Border}.png`)
            }
          />
        </TouchableOpacity>
      );
    }
    return (
      <View style={styles.MainContainer}>
        <View style={styles.childView}>{React_Native_Rating_Bar}</View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  MainContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: 100,
    height: 22,
  },
  childView: {
    justifyContent: "center",
    flexDirection: "row",
  },

  StarImage: {
    width: 18,
    height: 18,
    resizeMode: "cover",
  },
});
