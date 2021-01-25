import React, {Component} from 'react';
import { View, Button } from 'react-native';

//Nach 'Registrieren' wählt man ob man ein Azubi oder Arbeitgeber ist
export default class UserTypeScreen extends Component {
    constructor(){
        super();
    } 

    render(){
        return (
            <View>
                <Button
                    onPress={() => this.props.navigation.navigate("SignupWorker")}
                    title="Azubi"
                />
                <Button
                    onPress={() => this.props.navigation.navigate("SignupEmployer")}
                    title="Arbeitgeber"
                />
            </View>
        );
    }
}