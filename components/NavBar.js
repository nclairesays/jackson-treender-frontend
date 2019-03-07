import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { Route, Link, BackButton } from 'react-router-native'
import { Redirect } from 'react-router'
import { styles } from './Styles'


import _Login from './Login';
import _Profile from './Profile';
import _SignUp from './SignUp';
import _Match from './Match'
import _Chat from './Chat'
import _Welcome from './Welcome'




class _NavBar extends Component {

  getP = () => {
    this.props.getPotentials()
  }
 
  render() {
    return (
      <>
    
      <Text>JACKSON TREENDER </Text>
      

      {
        (this.props.isLoggedIn)
        ? 
        
        <View style={styles.nav}>
        {/* <BackButton /> */}

        <Link
          to="/profile"
          underlayColor='#f0f4f7'
          style={styles.navItem}>

            <Text>Profile


           
            </Text>
        </Link>

        <TouchableOpacity onPress={() => {this.props.getPotentials()}}>
          <Link
              to="/match"
              underlayColor='#f0f4f7'
              style={styles.navItem}>
                  <Text>
                    Match 
                  </Text>
            </Link>
        </TouchableOpacity>

       
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

        <Link
          to="/logout"
          underlayColor='#f0f4f7'
          style={styles.navItem}>
          
            <Text>Logout

            </Text>

          
        </Link>
           
      </View>
         
        :
        <View style={styles.nav}>

            {/* <BackButton /> */}
            <Link
                to="/signup"
                underlayColor='#f0f4f7'
                style={styles.navItem}
                >
                  <Text>Sign Up </Text>

              </Link>
            <Link
              to="/login"
              underlayColor='#f0f4f7'
              style={styles.navItem}>
                <Text>Login</Text>
            </Link>
            {/* <_Welcome /> */}

          </View>
          

        

      } 
      
       </>
    )
  }
}



  

const mapStateToProps = state => {
    return {
      user: state.user,
      potentials: state.potentials,
      successfulMatches: state.successfulMatches
    }
}

const mapDispatchToProps = (dispatch) => {
 
  // return {
  //   getMatches: () => dispatch({ type: 'GET_SUCCESSFUL_MATCHES'}),
  //   getPotentials: () => dispatch({ type: 'GET_POTENTIALS'})
  // } 
}


export default connect(mapStateToProps, null)(_NavBar)