import React from 'react';
import { View, Text, TouchableOpacity, Dimensions} from 'react-native';
import { Avatar } from 'react-native-elements';
import { string } from 'prop-types'

const Layout ={
    window:{
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
    }
 }

// = () is empty for now
//TODO pass this component the right data
const MatchesContact = ({avatar, name, lastMessage, date}) => (
    <View style={{ flexDirection: 'row', width: Layout.window.width - 0, height: 60, marginTop: 5, backgroundColor: '#ffffff', borderWidth: 1, borderColor: '#128ED2', borderRadius: 2, paddingLeft: 0, paddingRight: 0, justifyContent: 'center', alignItems: 'center' }}>
    <TouchableOpacity onPress={() => { console.log("Profil anzeigen")}} >
        <Avatar
            rounded
            source={{avatar}}
        />
    </TouchableOpacity>
    <TouchableOpacity onPress={() => this.openChat}>
        <Text style={{ marginLeft: 30, width: Layout.window.width - 100, height: 30 }}>
            {name}
            {lastMessage}
        </Text>
    </TouchableOpacity>
</View> 
)

//TODO: proper typing, import every type other than string too
MatchesContact.propTypes = {
    avatar: string,
    name: string,
    lastMessage: string,
    date: string
  }

export default MatchesContact;