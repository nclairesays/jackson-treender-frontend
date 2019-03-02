import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { Route, Link } from 'react-router-native'


import _Login from './Login';
import _Profile from './Profile';
import _SignUp from './SignUp';
import _Match from './Match'
import _Chat from './Chat'
import _Welcome from './Welcome'




class _NavBar extends Component {

 
  render() {
    return (
      <>
    
      <Text>JACKSON TREENDER </Text>

      {
        (!this.props.isLoggedIn)
        ? 
        <View style={styles.nav}>
            <_Welcome />
            <Link
                to="/signup"
                underlayColor='#f0f4f7'
                style={styles.navItem}>
                  <Text>Sign Up 


                  </Text>

              </Link>
            <Link
              to="/login"
              underlayColor='#f0f4f7'
              style={styles.navItem}>
                <Text>Login</Text>
            </Link>
          </View>
         
        :
        <View style={styles.nav}>

        <Link
          to="/profile"
          underlayColor='#f0f4f7'
          style={styles.navItem}>
            <Text>Profile


           
            </Text>
        </Link>

        <Link
          to="/match"
          underlayColor='#f0f4f7'
          style={styles.navItem}>
          
            <Text>Match

            </Text>

          
        </Link>

       
            <TouchableOpacity onPress={() => {this.props.getMatches()}}>
            <Link
                to="/chat"
                underlayColor='#f0f4f7'
                style={styles.navItem}>
                    <Text>
                      Chat
                    </Text>
              </Link>

            
            </TouchableOpacity>
           
      </View>
          

        

      } 
       </>
    )
  }
}



const styles = StyleSheet.create({
   
    header: {
      fontSize: 20,
    },
    nav: {
      flexDirection: 'row',
      justifyContent: 'space-around'
    },
    navItem: {
      flex: 1,
      alignItems: 'center',
      padding: 10,
    },
    subNavItem: {
      padding: 5,
    },
    topic: {
      textAlign: 'center',
      fontSize: 15,
    }
  })
  
  

const mapStateToProps = state => {

    return {
      user: state.user,
      potentials: state.potentials,
      successfulMatches: state.successfulMatches
    }
}

const mapDispatchToProps = (dispatch) => ({
    getMatches: () => dispatch({ type: 'GET_SUCCESSFUL_MATCHES'})
})


export default connect(mapStateToProps, mapDispatchToProps)(_NavBar)