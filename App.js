
import React from 'react';
import { StyleSheet, Text, View, AsyncStorage } from 'react-native';
import _Login from './components/Login';
import _Profile from './components/Profile';
import _SignUp from './components/SignUp';
import _Match from './components/Match'
import _Chat from './components/Chat'
import _Welcome from './components/Welcome'
import _NavBar from './components/NavBar'

import { Route, Link  } from 'react-router-native'
import { Switch, Router } from 'react-router'
import { Provider } from 'react-redux';
import { createStore } from 'redux'
import store from './redux/store'
import { history } from './history'


import { YellowBox, AppRegistry } from 'react-native'


YellowBox.ignoreWarnings([
  'Remote debugger',
])

class App extends React.Component {

  state = {
    isLoggedIn: false
  }

  login = () => {this.setState({ isLoggedIn: true })}

  renderChat = () => {store.dispatch({type: 'GET_SUCCESSFUL_MATCHES'})}

  render() {



   
    return (
      
        <View>


        <Router history={history}>
<>
        <_NavBar isLoggedIn={this.state.isLoggedIn}/>

            <Route path="/login" render={() => 
              <_Login onLoginPress={this.login} />
                } 
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

</>
        </Router>
           
          </View>

       
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
        <App store={store}/>
      </View>
    </Provider>
  )
}
