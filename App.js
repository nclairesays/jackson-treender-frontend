
import React from 'react';
import { StyleSheet, Text, View, AsyncStorage } from 'react-native';
import _Login from './components/Login';
import _Profile from './components/Profile';
import _SignUp from './components/SignUp';
import _Match from './components/Match'
import _Chat from './components/Chat'
import _Welcome from './components/Welcome'

import { Route, Link  } from 'react-router-native'
import { Switch, Router } from 'react-router'
import { Provider } from 'react-redux';
import { createStore } from 'redux'
import store from './redux/store'
import { history } from './history'


import { YellowBox, AppRegistry } from 'react-native'
import HomeScreen from './screens/HomeScreen';
YellowBox.ignoreWarnings([
  'Remote debugger',
])

class App extends React.Component {

  state = {
    isLoggedIn: false
  }

//  <View style={ styles.container}>
//         {
//           (this.state.isLoggedIn) 
//           ? <Secured onLogoutPress={() => this.setState({ isLoggedIn: false })} token={this.state.token} currentUser={this.state.user}/>
//           : (this.state.isSignedUp)
//           ? <Login onLoginPress={() => this.setState({ isLoggedIn: true })} onLogin={this.setUserInState}/>
//           : <SignUp onSignUpPress={()=> this.setState({ isSignedUp: true }) }/>

//         }
//       </View>

  render() {

   
    return (
      
      

        <Router history={history}>
          <View style={styles.container}>
            <Text>JACKSON TREENDER </Text>

            {
              (!this.state.isLoggedIn)
              ? 
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
               
              :
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
                

                

            }

         
              

             


        
            <Route path="/login" render={() => 
              <_Login onLoginPress={() => this.setState({ isLoggedIn: true })}
                />} 
              />
            <Route path="/signup" render={ () => 
              <_SignUp />
            }/>

            <Route path="/profile" render={ () => 
              <_Profile />
            }/>


            <Route path="/match" render={ () => 
              <_Match />
            }/>

            <Route path="/chat" render={ () => 
              <_Chat />
            }/>


           
          </View>
        </Router>

       
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




export default () => {

  return (
    <Provider store={store}>
      <View style={styles.container}>
        <App />
      </View>
    </Provider>
  )
}
