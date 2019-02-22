import React, { Component } from 'react';
import {
    ScrollView,
    Text,
    View,
    Button
} from 'react-native';

export default class Secured extends Component {
    render() {
        return (
            <View >
                <Text style={{fontSize: 27}}>
                    Welcome
                </Text>
                
                <View style={{margin:10}} />

                <Button 
                    title="Logout"
                    onPress={this.props.onLogoutPress}
                />
            </View>
        )
    }
}