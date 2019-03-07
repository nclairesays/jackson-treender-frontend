import React, { Component } from 'react';
import { Text, TextInput, View, Button, StyleSheet, AsyncStorage } from 'react-native';
import { NativeRouter, Route, Link } from 'react-router-native'
import { API_URL } from '../constants';
import { connect } from 'react-redux'
import { styles } from './Styles'




class _Login extends Component {

    state = {
        email: '',
        password: ''
    }

  

    static navigationOptions = {
        title: 'Welcome to the Jackson Treender App!',
    };

    render() {
    //   console.log("LOGIN PROPS HERE", this.props)

        return (
            <View style={styles.mainBody}>
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
                        this.props.onLoginPress() 
                        this.props.onLogin(this.state.email, this.state.password)
                    }}
                    title="Login, Jackson!"
                    color="#841584"  // color of text
                    
                />

                <View style={{margin:10}}/>
                
                <View style={{flexDirection: 'row'}}>
                    <Text> Not a registered Jackson?  </Text>
                    <Link to="/signup"><Text style={{color: 'green'}}>Sign up here! </Text></Link> 
                </View>
                
               

            </View>    
        )
    }
}




const mapStateToProps = state => state
const mapDispatchToProps = (dispatch) => ({
    onLogin: (email, password) => 
        dispatch({ type: 'LOGIN', email, password })
})


export default connect(mapStateToProps, mapDispatchToProps)(_Login)