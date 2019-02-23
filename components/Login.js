import React, { Component } from 'react';
import {
    Text,
    TextInput,
    View,
    Button,
    StyleSheet
} from 'react-native';
import { NativeRouter, Route, Link } from 'react-router-native'

export default class Login extends Component {

    state = {
        email: '',
        password: ''
    }


    render() {
        return (
            <View>
                <Text 
                    style={{fontSize: 27}}>
                    Login
                </Text>

                <View style={{margin:10}}/>

                <TextInput 
                    placeholder='Email' 
                    style={styles.input}
                    onChangeText={ text => this.setState({ email: text })}
                />
                <TextInput 
                    placeholder='Password' 
                    style={styles.input}
                    secureTextEntry={true}
                    onChangeText={ text => this.setState({ password: text })}
                />
                <View style={{margin:10}}/>


                <Button 
                    onPress={ () => this.props.onLoginPress() }
                    title="Login, Jackson!"
                    color="#841584"  // color of text
                />

                <View style={{margin:10}}/>

                <Text> Not a registered Jackson?  </Text>
                {/* <Link to="/SignUp">Sign up here! </Link> */}
                {/* <Link to="/">Home</Link> */}

            </View>    
        )
    }
}




const styles = StyleSheet.create({
    input: {
      width: 250,
      height: 50,
      margin: 5,
      padding: 8,
      fontSize: 18,
      fontWeight: '500'
    }
});