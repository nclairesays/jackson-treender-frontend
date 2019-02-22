import React, { Component } from 'react';
import {
    ScrollView,
    Text,
    TextInput,
    View,
    Button,
    StyleSheet
} from 'react-native';

export default class Login extends Component {

    render() {
        return (
            <View>
                <Text 
                    style={{fontSize: 27}}>
                    Login
                </Text>

                <View style={{margin:10}}/>

                <TextInput placeholder='Email' />
                <TextInput placeholder='Password' />
                <View style={{margin:10}}/>


                <Button 
                          onPress={this.props.onLoginPress}
                          title="Submit"
                      />
            </View>    
        )
    }
}



// const styles = StyleSheet.create({
//     container: {
//       flex: 1,
//       backgroundColor: '#fff',
//       alignItems: 'center',
//       justifyContent: 'center',
//     },
//   });