import React,{Component} from 'react'
import { View, Text, Image, ImageSourcePropType } from 'react-native'
//using prop types in components helps avoid mistakes
import { shape, string, number } from 'prop-types'
import baseStyles from '../styles/baseStyles'
const Card = ({ card }) => (
  <View
    activeOpacity={1}
    style={styles.card}
  >
    <Images
      style={baseStyles.image}
      source={card.photo}
      resizeMode="cover"
    />
    <View style={baseStyles.photoDescriptionContainer}>
      <Text style={baseStyles.text}>
        {`${card.name}, ${card.age}`}
      </Text>
    </View>
  </View>
)

Card.propTypes = { 
  card: shape({
    photo: ImageSourcePropType,
    name: string,
    age: number,
  }).isRequired,
}
export default Card;