import React, { Component } from 'react';
import {
    Text,
    TextInput,
    View,
    Button,
    StyleSheet
} from 'react-native';
import { NativeRouter, Route, Link } from 'react-router-native'
import { API_URL } from '../constants';

const mapStateToProps = state => state
const mapDispatchToProps = (dispatch) => ({
    logIn: (email, password) => dispatch({ type: 'LOGIN', email, password })
})

export default connect(mapStateToProps, mapDispatchToProps)(class Login extends Component {

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
                email: this.state.email,
                password: this.state.password
            })
        })
         .then(res => res.json())
         .then(res => AsyncStorage.setItem('user', JSON.stringify(user)))
         .then( (user) => {
             this.props.onLogin(user)
             this.props.history.push(`/users/${user.id}`)
         })
        
    }

        // static navigationOptions = {
        //     title: 'Welcome to the Jackson Treender App!',
        // };

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
                    onPress={ () => {
                        // this.props.onLogin()
                        this.props.logIn(this.state.email, this.state.password)
                        // this.props.onLoginPress() 
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
})




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