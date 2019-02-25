

import React from "react";
import { View, Text, StyleSheet } from "react-native";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from './screens/LoginScreen';
import SwipeScreen from './screens/SwipeScreen';
import AuthLoadingScreen from './screens/AuthLoadingScreen';

import { Provider } from 'react-redux';
import store from './redux/store';
import { createStackNavigator, createAppContainer, createSwitchNavigator } from "react-navigation";

const AppStack = createStackNavigator({ Home: HomeScreen });
const AuthStack = createStackNavigator({ Login: LoginScreen}); 

const AppNavigator = createSwitchNavigator(
    {
        AuthLoading: AuthLoadingScreen,
        App: AppStack,
        Auth: AuthStack
    },
    {
        initialRouteName: 'AuthLoading',
    }
);


const AppContainer = createAppContainer(AppNavigator);

export default App = () => {
  console.log(store)
  return (
    <Provider store={store}>
        <AppContainer />
    </Provider>
  )
}








// const AppNavigator = createStackNavigator({
//   Home: {
//     screen: HomeScreen
//   }
// });

// export default createAppContainer(AppNavigator);











// export default class App extends React.Component {
//   render() {
//     return (
//       <Provider store={store}>

//       </Provider>
//     )
//   }

// }

























// import React from 'react';
// import {
//   ActivityIndicator,
//   AsyncStorage,
//   Button,
//   StatusBar,
//   StyleSheet,
//   View,
// } from 'react-native';
// import { createStackNavigator, createSwitchNavigator, createAppContainer } from 'react-navigation';

// class SignInScreen extends React.Component {
//   static navigationOptions = {
//     title: 'Please sign in',
//   }; 

//   render() {
//     return (
//       <View style={styles.container}>
//         <Button title="Sign in!" onPress={this._signInAsync} />
//       </View>
//     );
//   }

//   _signInAsync = async () => {
//     await AsyncStorage.setItem('userToken', 'abc');
//     this.props.navigation.navigate('App');
//   };
// }

// class HomeScreen extends React.Component {
//   static navigationOptions = {
//     title: 'Welcome to the app!',
//   };

//   render() {
//     return (
//       <View style={styles.container}>
//         <Button title="Show me more of the app" onPress={this._showMoreApp} />
//         <Button title="Actually, sign me out :)" onPress={this._signOutAsync} />
//       </View>
//     );
//   }

//   _showMoreApp = () => {
//     this.props.navigation.navigate('Other');
//   };

//   _signOutAsync = async () => {
//     await AsyncStorage.clear();
//     this.props.navigation.navigate('Auth');
//   };
// }

// class OtherScreen extends React.Component {
//   static navigationOptions = {
//     title: 'Lots of features here',
//   };

//   render() {
//     return (
//       <View style={styles.container}>
//         <Button title="I'm done, sign me out" onPress={this._signOutAsync} />
//         <StatusBar barStyle="default" />
//       </View>
//     );
//   }

//   _signOutAsync = async () => {
//     await AsyncStorage.clear();
//     this.props.navigation.navigate('Auth');
//   };
// }

// class AuthLoadingScreen extends React.Component {
//   constructor() {
//     super();
//     this._bootstrapAsync();
//   }

//   // Fetch the token from storage then navigate to our appropriate place
//   _bootstrapAsync = async () => {
//     const userToken = await AsyncStorage.getItem('userToken');

//     // This will switch to the App screen or Auth screen and this loading
//     // screen will be unmounted and thrown away.
//     this.props.navigation.navigate(userToken ? 'App' : 'Auth');
//   };

//   // Render any loading content that you like here
//   render() {
//     return (
//       <View style={styles.container}>
//         <ActivityIndicator />
//         <StatusBar barStyle="default" />
//       </View>
//     );
//   }
// }





// const AppStack = createStackNavigator({ Home: HomeScreen, Other: OtherScreen });
// const AuthStack = createStackNavigator({ SignIn: SignInScreen });

// export default createAppContainer(createSwitchNavigator(
//   {
//     AuthLoading: AuthLoadingScreen,
//     App: AppStack,
//     Auth: AuthStack,
//   },
//   {
//     initialRouteName: 'AuthLoading',
//   }
// ));















///////////////////////////////////////

// import React from 'react';
// import { StyleSheet, View, Text } from 'react-native';
// import { AppNavigator } from './Navigator'


// export default () => (
//   <View style={styles.container}>
//     <AppNavigator />
//   </View>
// )

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
// });


/////////////////////////////////////




// import React from 'react';
// import { StyleSheet, Text, View, AsyncStorage } from 'react-native';
// import Login from './components/Login';
// import Secured from './components/Secured';
// import SignUp from './components/SignUp';

// import { YellowBox, AppRegistry } from 'react-native'
// import HomeScreen from './screens/HomeScreen';
// YellowBox.ignoreWarnings([
//   'Remote debugger',
// ])


// export default class App extends React.Component {
  
//   state = {
//     isLoggedIn: false,
//     isSignedUp: false,
//     token: AsyncStorage.getItem('token'),
//     user: JSON.parse(AsyncStorage.getItem('user')) || {}
//   }


//   setUserInState = (token, user) => {
//     AsyncStorage.setItem('token', token)
//     AsyncStorage.setItem('user', JSON.stringify(user))
//     this.setState({ token, user })
//   }

//   render() {


//     return (
      
//       <View style={styles.container}>
//         {
//           (this.state.isLoggedIn) 
//           ? <Secured onLogoutPress={() => this.setState({ isLoggedIn: false })} token={this.state.token} currentUser={this.state.user}/>
//           : (this.state.isSignedUp)
//           ? <Login onLoginPress={() => this.setState({ isLoggedIn: true })} onLogin={this.setUserInState}/>
//           : <SignUp onSignUpPress={()=> this.setState({ isSignedUp: true }) }/>

//         }
//       </View>
//     )
//   }
// }
      
 

