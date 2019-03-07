import React, { Component } from 'react';
import { Text, TextInput, View, Button, StyleSheet, AsyncStorage, Dimensions } from 'react-native';
import { NativeRouter, Route, Link } from 'react-router-native'
import { API_URL } from '../constants';
import { connect } from 'react-redux'
import { styles } from './Styles'




class _EditForm extends Component {

    state = {
        email: null,
        bio: null,
        age: null,
        gender: null

    }

    componentDidMount() {
        const { bio, email, age, gender} = this.props.user
        this.setState({
            email: email,
            bio: bio,
            age: age,
            gender: gender
        })
    }
  

    render() {
  
        return (
            <View >
                <Text 
                    style={{fontSize: 27}}>
                    Edit Yeere Profile, {this.props.user.name} Jackson!
                </Text>

                <View style={{margin:10}}/>
           
                <View>
                <TextInput 
                    placeholder='Email' 
                    style={styles.input}
                    value={this.state.email}
                    keyboardType='email-address'
                    onChangeText={ text => this.setState({ email: text })}
                />

                <TextInput 
                    placeholder='Age' 
                    style={styles.input}
                    value={`${this.state.age}`} 
                    keyboardType='numeric'
                    onChangeText={ text => this.setState({ age: text })}
                />

                <TextInput 
                    placeholder='Gender' 
                    style={styles.input}
                    value={this.state.gender}
                    onChangeText={ text => this.setState({ gender: text })}
                />

                <TextInput 
                    placeholder='Bio' 
                    style={styles.input_multiline}
                    multiline = {true}
                    numberOfLines = {10}
                    value={this.state.bio}
                    onChangeText={ text => this.setState({ bio: text })}
                />
                <View style={{margin:1}}/>
               



                <Link to="/profile">
           
                    <Text 
                        style={{color: 'blue', alignSelf: 'center' }}
                        onPress={ () => {
                            this.props.onEditProfile(this.state.email, this.state.bio, this.state.gender, this.state.age)
                        }}>
                        COMMIT YOUR PROFILE CHANGES!
                    </Text>
                  
                </Link>
                </View>

                

                <View style={{margin:10}}/>


            </View>    
        )
    }
}




const mapStateToProps = state => {
    console.log("INSIDE STATE TO PROPS", state.user)
    return {
        user: state.user
    }
}
const mapDispatchToProps = (dispatch) => ({
    onEditProfile: ( email, bio, gender, age ) => 
        dispatch({ type: 'EDIT_PROFILE', email, bio, gender, age })
})


export default connect(mapStateToProps, mapDispatchToProps)(_EditForm)