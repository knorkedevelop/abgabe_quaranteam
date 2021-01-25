import React from 'react'
import { View, Text } from 'react-native'
//prop-types for avoiding errors
import { string } from 'prop-types'
import baseStyles from '../styles/baseStyles'

const OverlayLabel = ({ label, color }) => (
  <View style={[baseStyles.overlayLabel, { borderColor: color }]}>
    <Text style={[baseStyles.overlayLabelText, { color }]}>{label}</Text>
  </View>
)

OverlayLabel.propTypes = {
  label: string.isRequired,
  color: string.isRequired,
}

export default OverlayLabel