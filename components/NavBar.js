import React, { Component } from 'react'
import { Text, View, TouchableOpacity, Image } from 'react-native'
import { connect } from 'react-redux'
import { Route, Link, BackButton } from 'react-router-native'
import { Redirect } from 'react-router'
import { styles } from './Styles'
import { Avatar } from "react-native-elements";



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
    
      {/* <Text>JACKSON TREENDER </Text> */}
      <Image
       style={{ height: 75,  resizeMode: 'contain', alignSelf: 'center'}}
      
        // source={require('../assets/Jackson_TriangleLogo.png')} 
        source={require('../assets/JacksonTree_Logo_Black.png')} 
      />


      

      {
        (this.props.isLoggedIn)
        ? 
        
        <View style={styles.nav}>
        {/* <BackButton /> */}

        <Link
          to="/profile"
          underlayColor='#f0f4f7'
          style={styles.navItem}>

            <Text style={styles.navLink}>Profile


           
            </Text>
        </Link>

        <TouchableOpacity onPress={() => {this.props.getPotentials()}}>
          <Link
              to="/match"
              underlayColor='#f0f4f7'
              style={styles.navItem}>
                  <Text style={styles.navLink}>
                    Match 
                  </Text>
            </Link>
        </TouchableOpacity>

       
        <TouchableOpacity onPress={() => {this.props.getMatches()}}>
        <Link
            to="/chat"
            underlayColor='#f0f4f7'
            style={styles.navItem}>
                <Text style={styles.navLink}>
                  Chat
                </Text>
          </Link>

        

        </TouchableOpacity>

        <Link
          to="/logout"
          underlayColor='#f0f4f7'
          style={styles.navItem}>
          
            <Text style={styles.navLink}>Logout

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
                  <Text style={styles.navLink}>Sign Up </Text>

              </Link>
            <Link
              to="/login"
              underlayColor='#f0f4f7'
              style={styles.navItem}>
                <Text style={styles.navLink}>Login</Text>
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
 
 
}


export default connect(mapStateToProps, null)(_NavBar)