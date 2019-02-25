

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

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
  });










// other way to use createStackNavigator:
// const AppNavigator = createStackNavigator({
//   Home: {
//     screen: HomeScreen
//   }
// });

// export default createAppContainer(AppNavigator);














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




import React from 'react';
import { StyleSheet, Text, View, AsyncStorage } from 'react-native';
import Login from './components/Login';
import Secured from './components/Secured';
import SignUp from './components/SignUp';

import { YellowBox, AppRegistry } from 'react-native'
import HomeScreen from './screens/HomeScreen';
YellowBox.ignoreWarnings([
  'Remote debugger',
])


export default class App extends React.Component {
  
  state = {
    isLoggedIn: false,
    isSignedUp: false
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
      
      <View style={ styles.container}>
        {
          (this.state.isLoggedIn) 
          ? <Secured onLogoutPress={() => this.setState({ isLoggedIn: false })} token={this.state.token} currentUser={this.state.user}/>
          : (this.state.isSignedUp)
          ? <Login onLoginPress={() => this.setState({ isLoggedIn: true })} onLogin={this.setUserInState}/>
          : <SignUp onSignUpPress={()=> this.setState({ isSignedUp: true }) }/>

        }
      </View>
    )
  }
}
      
 

