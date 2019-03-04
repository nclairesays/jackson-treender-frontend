import React, { Component } from 'react';
import { Text, TextInput, View, Button, StyleSheet, AsyncStorage } from 'react-native';
import { NativeRouter, Route, Link } from 'react-router-native'
import { API_URL } from '../constants';
import { connect } from 'react-redux'



class _Login extends Component {

    state = {
        email: null,
        bio: null,
        age: null,
        gender: null

    }

  

    static navigationOptions = {
        title: 'Welcome to the Jackson Treender App!',
    };

    render() {
    //   console.log("LOGIN PROPS HERE", this.props)

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
                    placeholder='Bio' 
                    style={styles.input}
                    multiline = {true}
                    multiline = {true}
                    numberOfLines = {8}
                    onChangeText={ text => this.setState({ bio: text })}
                />
                <View style={{margin:10}}/>


                <Button 
                    onPress={ () => {
                        
                        this.props.onEditProfile(this.state.email, this.state.password)
                    }}
                    title="Edit!"
                    color="#841584"  // color of text
                    
                />

                <View style={{margin:10}}/>

                {/* <Text> Not a registered Jackson?  </Text> */}
                {/* <Link to="/signup">Sign up here! </Link> //REACT CHILDREN EXPECTED TO RECEIVE ONE PROP */}
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




const mapStateToProps = state => state
const mapDispatchToProps = (dispatch) => ({
    onEditProfile: (email) => 
        dispatch({ type: 'EDIT_PROFILE', email, bio, gender, age })
})


export default connect(mapStateToProps, mapDispatchToProps)(_Login)