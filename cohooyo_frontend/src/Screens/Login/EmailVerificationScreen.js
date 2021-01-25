import React, {Component} from 'react';
import { View, Button } from 'react-native';
import baseStyles from './../../../styles/baseStyles'


//Wird aktuell nicht genutzt, wahrscheinlich loeschen
//TODO: determine if this should be deleted
export default class EmailVerification extends Component {
    constructor(){
        super();
    }

    render(){
        return (
            <View style={baseStyles.container}>
                <Button
                    onPress={() => {
                        this.props.navigation.navigate("Main")
                    }}
                    title="Account erstellen"
                />
            </View>
        );
    }
}

