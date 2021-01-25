import { Platform, StyleSheet, Dimensions } from 'react-native';
import { Colors } from './baseColors';

const height = Dimensions.get('window').height
const width = Dimensions.get('window').width


const settingsStyles = StyleSheet.create({
    input: {
        marginTop: 80 * 0.7,
        paddingHorizontal: 50 * 2,
      },

});

export default settingsStyles;