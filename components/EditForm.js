import React, { Component } from 'react';
import { Text, TextInput, View, Button, StyleSheet, AsyncStorage } from 'react-native';
import { NativeRouter, Route, Link } from 'react-router-native'
import { API_URL } from '../constants';
import { connect } from 'react-redux'



class _EditForm extends Component {

    state = {
        email: null,
        bio: null,
        age: null,
        gender: null

    }

    componentDidMount() {
        const {name, bio, email, age, id, gender} = this.props.user
        this.setState({
            email: email,
            bio: bio,
            age: age,
            gender: gender
        })
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
                    Edit Yeere Profile
                </Text>

                <View style={{margin:10}}/>

                <Text>Full Name: {this.props.user.name}</Text>
                <Text>Email: {this.props.user.email}</Text>
                

                <TextInput 
                    placeholder='Email' 
                    style={styles.input}
                    value={this.state.email}
                    onChangeText={ text => this.setState({ email: text })}
                />

                <TextInput 
                    placeholder='Age' 
                    style={styles.input}
                    value={this.state.age}

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
                    style={styles.input}
                    multiline = {true}
                    numberOfLines = {20}
                    value={this.state.bio}
                    onChangeText={ text => this.setState({ bio: text })}
                />
                <View style={{margin:10}}/>


                <Button 
                    onPress={ () => {
                        
                        this.props.onEditProfile(this.state.email, this.state.bio, this.state.gender, this.state.age)
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




const mapStateToProps = state => ({
    user: state.user
})
const mapDispatchToProps = (dispatch) => ({
    onEditProfile: ( email, bio, gender, age ) => 
        dispatch({ type: 'EDIT_PROFILE', email, bio, gender, age })
})


export default connect(mapStateToProps, mapDispatchToProps)(_EditForm)