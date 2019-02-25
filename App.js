
import React from 'react';
import { StyleSheet, Text, View, AsyncStorage } from 'react-native';
import _Login from './components/Login';
import _Profile from './components/Profile';
import _SignUp from './components/SignUp';
import { NativeRouter, Route, Link } from 'react-router-native'
import { Switch } from 'react-router'

import { Provider } from 'react-redux';
import { createStore } from 'redux'
import store from './redux/store'
import rootReducer from './redux/store'

import { YellowBox, AppRegistry } from 'react-native'
import HomeScreen from './screens/HomeScreen';
YellowBox.ignoreWarnings([
  'Remote debugger',
])

class App extends React.Component {
  
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

              <Link
                to="/profile"
                underlayColor='#f0f4f7'
                style={styles.navItem}>
                  <Text>Profile</Text>
              </Link>

            </View>

        
            <Route path="/login" render={(props) => 
              <_Login 
         
                // setUser={this.setCurrentUser} 
                onLoginPress={() => this.setState({ isLoggedIn: true })}
                />} 
              />
            <Route path="/signup" render={ () => 
              <_SignUp 
              
                // onSignUp={this.setCurrentUser} 
                onSignUpPress={()=> this.setState({ isSignedUp: true }) }
              />
            }/>

            <Route path="/profile" render={ () => 
              <_Profile
           
              />
            }/>

           
          </View>
        </NativeRouter>

       
    )
  }
}
      



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





// STORE/ INITIAL STATE


const initialState = {
  token: null,   
  user: {
      name: "Claire",
      email: "claire@flatiron.com",
      age: 26,
      bio: "I code and stuff"
  },

  loading: true,
  error: null


}



// const store = createStore(
//   rootReducer,
//   initialState,
//   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
//   // compose(applyMiddleware(...middlewares))
// );



console.log('STORE 1', store.getState())
export default () => {
  console.log('STORE 2', store.getState())

  return (
    <Provider store={store}>
      <View style={styles.container}>
        <App />
      </View>
    </Provider>
  )
}
