import React, { Component } from 'react';
import {
    Text,
    TextInput,
    View,
    Button,
    StyleSheet
} from 'react-native';

export default class SignUp extends Component {

    state = {
      name: '', 
      email: '', 
      password: ''
    }

  
    signUp = async () => {
      const { name, email, password } = this.state
      try {
        // here place your signup logic
        console.log('user successfully signed up!: ', 'successsss')
      } catch (err) {
        console.log('error signing up: ', err)
      }
    }
  
    render() {
        return (
            <View>
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

                />


                <TextInput 
                    placeholder='Email' 
                    style={styles.input}
                    onChangeText={ text => this.setState({ email: text })}
                    autoCapitalize="none"

                    
                />
                <TextInput 
                    placeholder='Password' 
                    style={styles.input}
                    secureTextEntry={true}
                    onChangeText={ text => this.setState({ password: text })}
                    autoCapitalize="none"

                />
                <View style={{margin:10}}/>
             
                <Button 
          
                    onPress={this.signUp}
                    title="Sign Up"
                    color="#841584"  // color of text
                />


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

