import React, { Component } from 'react';
import { Text, TextInput, View, Button } from 'react-native';
import { API_URL } from '../constants';
import { connect } from 'react-redux'
import { styles } from './Styles';



class _SignUp extends Component {

    state = {
      name: '', 
      gender: '',
      email: '', 
      password: ''
    }


    
    render() {
      // console.log("SIGN UP PROPS HERE", this.props)
      
        const { name, email, password, gender } = this.state
        return (
            <View style={styles.mainBody}>
                <Text 
                    style={{fontSize: 27}}>
                    Sign Up
                </Text>

                <View style={{margin:10}}/>

                <TextInput
                  style={styles.input}
                  placeholder='Full Name'
                  autoCapitalize="words"
                  onChangeText={ text => this.setState({ name: text })}
                  value={name}
                />

                <TextInput
                  style={styles.input}
                  placeholder='Gender'
                  autoCapitalize="words"
                  onChangeText={ text => this.setState({ gender: text })}
                  value={gender}
                />



                <TextInput 
                    placeholder='Email' 
                    style={styles.input}
                    onChangeText={ text => this.setState({ email: text })}
                    autoCapitalize="none"
                    value={email}    
                />


                <TextInput 
                    placeholder='Password' 
                    style={styles.input}
                    secureTextEntry={true}
                    onChangeText={ text => this.setState({ password: text })}
                    autoCapitalize="none"
                    value={password}

                />

                <View style={{margin:10}}/>
             
                <Button 
                    onPress={() => {
                  
                      this.props.onSignUp(this.state.name, this.state.email, this.state.password, this.state.gender)
                      
                    }}
                    title="Sign Up as a Jackson"
                    color="#841584"  // color of text
                />
            </View>    
        )
    }
}







const mapStateToProps = state => state
const mapDispatchToProps = (dispatch) => ({
    onSignUp: (name, email, password, gender) => dispatch({ type: 'CREATE_USER', name, email, password, gender })
})



export default connect(mapStateToProps, mapDispatchToProps)(_SignUp)