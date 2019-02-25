
import React from 'react';
import { StyleSheet, Text, View, AsyncStorage } from 'react-native';
import Login from './components/Login';
import Secured from './components/Secured';
import SignUp from './components/SignUp';
import { NativeRouter, Route, Link } from 'react-router-native'
import { Switch } from 'react-router'

import { YellowBox, AppRegistry } from 'react-native'
import HomeScreen from './screens/HomeScreen';
YellowBox.ignoreWarnings([
  'Remote debugger',
])


export default class App extends React.Component {
  
  state = {
    isLoggedIn: false,
    isSignedUp: false,
    // token: AsyncStorage.getItem('token'),
    // user: JSON.parse(AsyncStorage.getItem('user')) || {}
  }


  setUserInState = (token, user) => {
    // AsyncStorage.setItem('token', token)
    // AsyncStorage.setItem('user', JSON.stringify(user))
    // this.setState({ token, user })
    

  }

  render() {


    return (
      
      

        <NativeRouter>
          <View style={styles.container}>
            <Text>JACKSON TREENDER </Text>

            <View style={styles.nav}>

         
              <Link
                to="/signup"
                underlayColor='#f0f4f7'
                style={styles.navItem}>
                  <Text>Sign Up</Text>
              </Link>
              <Link
                to="/login"
                underlayColor='#f0f4f7'
                style={styles.navItem}>
                  <Text>Login</Text>
              </Link>
  
            </View>



        
            <Route path="/login" render={(props) => 
              <Login 
                {...props} 
                // setUser={this.setCurrentUser} 
                onLoginPress={() => this.setState({ isLoggedIn: true })}
                />} 
              />
            <Route path="/signup" render={ props => 
              <SignUp 
                {...props} 
                // onSignUp={this.setCurrentUser} 
                onSignUpPress={()=> this.setState({ isSignedUp: true }) }
              />
            }/>






              
            
           
          </View>
        </NativeRouter>

       
    )
  }
}
      
 



// import React from "react";
// import { View, Text, StyleSheet } from "react-native";
// import HomeScreen from "./screens/HomeScreen";
// import LoginScreen from './screens/LoginScreen';
// import SwipeScreen from './screens/SwipeScreen';
// import AuthLoadingScreen from './screens/AuthLoadingScreen';

// import { Provider } from 'react-redux';
// import store from './redux/store';
// import { createStackNavigator, createAppContainer, createSwitchNavigator } from "react-navigation";

// const AppStack = createStackNavigator({ Home: HomeScreen });
// const AuthStack = createStackNavigator({ Login: LoginScreen}); 

// const AppNavigator = createSwitchNavigator(
//     {
//         AuthLoading: AuthLoadingScreen,
//         App: AppStack,
//         Auth: AuthStack
//     },
//     {
//         initialRouteName: 'AuthLoading',
//     }
// );


// const AppContainer = createAppContainer(AppNavigator);

// export default App = () => {
//   console.log('STOOOORRRREEE', store)
//   return (
//     <Provider store={store}>
//         <View style={styles.container}>
//             <AppContainer />
//         </View>
//     </Provider>
//   )
// }







// other way to use createStackNavigator:
// const AppNavigator = createStackNavigator({
//   Home: {
//     screen: HomeScreen
//   }
// });

// export default createAppContainer(AppNavigator);








const styles = StyleSheet.create({
  container: {
    marginTop: 25,
    padding: 10,
    flex: 1,

  },
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