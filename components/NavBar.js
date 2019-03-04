import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { Route, Link } from 'react-router-native'


import _Login from './components/Login';
import _Profile from './components/Profile';
import _SignUp from './components/SignUp';
import _Match from './components/Match'
import _Chat from './components/Chat'
import _Welcome from './components/Welcome'


// console.log(Link)

class _NavBar extends Component {
  render() {
    return (
    
        <View>
            {/* <Text>JACKSON TREENDER </Text>

            {
              (this.props.isLoggedIn)
              ? 

              <View style={styles.nav}>

              <Link
                to="/profile"
                underlayColor='#f0f4f7'
                style={styles.navItem}>
                  <Text>Profile


                  {console.log('USER IN ROUTER- PROFILE', this.props.user)}

                  </Text>
              </Link>

              <Link
                to="/match"
                underlayColor='#f0f4f7'
                style={styles.navItem}>
                  <Text>Match</Text>
              </Link>

              <Link
                to="/chat"
                underlayColor='#f0f4f7'
                style={styles.navItem}>
                  <Text>Chat</Text>
              </Link>
            
            </View>
               
              :

              <View style={styles.nav}>
                  <Link
                      to="/signup"
                      underlayColor='#f0f4f7'
                      style={styles.navItem}>
                        <Text>Sign Up 

                       {console.log('USER IN ROUTER- SIGNUP', this.props.user)}

                        </Text>

                    </Link>
                  <Link
                    to="/login"
                    underlayColor='#f0f4f7'
                    style={styles.navItem}>
                      <Text>Login</Text>
                  </Link>
                  <_Welcome />

                </View>
                

                

            } */}

      </View>
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
<<<<<<< HEAD
  // console.log('inside map state to props navbar', state)
    if (!state.match && state.user){
      return {
        user: state.user
      }
    }
    else if(state.match) {
      return {
        user: state.user,
        potentials: state.match.potentials,
        successfulMatches: state.match.successfulMatches
      }
    }
    else {
      return {}
    }
}

const mapDispatchToProps = (dispatch) => {
  return {
      getSuccessfulMatches: () => dispatch({ type: 'GET_SUCCESSFUL_MATCHES'}),
   }
  }
=======

    return {
      user: state.user
    }
}

const mapDispatchToProps = (dispatch) => ({
    onLogout: () => dispatch({ type: 'LOGOUT'})
})
>>>>>>> parent of 92a4e83... checkpoint 710pm


export default connect(mapStateToProps, mapDispatchToProps)(_NavBar)