// import React from 'react';
// import {
//     Button,
//     StyleSheet,
//     View,
//     AsyncStorage
// } from 'react-native';

// export default class LoginScreen extends React.Component {
//     static navigationOptions = {
//         title: 'Please Sign In',
//     };

//     render() {
//         return (
//             <View style={styles.container}>
//                 <Button title="Sign in!" onPress={this._LoginAsync} />
//                 {/* <Button title="Sign in!" /> */}
//             </View>
//         );
//     }

//     _LoginAsync = async () => {
//         await AsyncStorage.setItem('userToken', 'abcddd');
//         this.props.navigation.navigate('App'); 
//     };
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#fff',
//         alignItems: 'center',
//         justifyContent: 'center',
//     },
// });


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

    logIn = () => {
        fetch(`${API_URL}/auth`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                username: this.state.username,
                password: this.state.password
            })
        })
         .then(res => res.json())
         .then( (user) => {
             this.props.onLogin(user.token, user)
            //  this.props.history.push(`/users/${user.id}`)
         } )
     }

    render() {
        return (
            <View style={styles.container}>
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
                    onPress={ () => {
                        this.props.onLogin()
                        this.props.onLoginPress() 
                    }}
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
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
      width: 250,
      height: 50,
      margin: 5,
      padding: 8,
      fontSize: 18,
      fontWeight: '500'
    }
});

