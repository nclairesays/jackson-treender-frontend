import React from 'react';
import { StyleSheet, Text, View, AsyncStorage } from 'react-native';
import _Login from './components/Login';
import _Profile from './components/Profile';
import _MatcheeProfile from './components/MatcheeProfile';
import _SignUp from './components/SignUp';
import _Match from './components/Match'
import _Chat from './components/Chat'
import _Welcome from './components/Welcome'
import _NavBar from './components/NavBar'
import _EditForm from './components/EditForm';

import { Route, Link  } from 'react-router-native'
import { Switch, Router, Redirect } from 'react-router'
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

  async componentDidMount(){
   
    await AsyncStorage.getItem('user')
    .then( jsonUser => {
        try {
            let user = JSON.parse(jsonUser)
            console.log("USER", user)
            
            if( user !== null) { 
              store.dispatch({ type: 'SAVE_USER', user: user, potentials: null, successfulMatches: null })
              this.setState({isLoggedIn: true}) 
            } else {
              this.setState({isLoggedIn: false})  
            }
        } catch(err){
            alert('HAVE NOT SIGNED IN YET. ERROR! ', err)
          
        }
    })
  }

  login = () => {this.setState({ isLoggedIn: true })}
  renderChat = () => {store.dispatch({type: 'GET_SUCCESSFUL_MATCHES'})}
  logout = () => { 
    store.dispatch({ type: 'LOGOUT'})
    this.setState({isLoggedIn: false})
  }

  render() {
    // console.log("APP STATE", this.state)

   
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

            <Route path="/logout" render={ () => {
                
                this.logout()
                return <Redirect to="/login"/>
              }
            
            }/>


            <Route exact path="/profile" render={ (props) => 
              <_Profile props2={props}/>
            }/>
            
            <Route path="/profile/:id" render={ (props) => 
              <_MatcheeProfile props2={props} />
            }/>

          


            <Route path="/match" render={ () => 
              <_Match />
            }/>

            <Route path="/chat" render={ () => 
              <_Chat />
            }/>
            <Route path="/editForm" render={ () => 
              <_EditForm />
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




export default () => {

  return (
    <Provider store={store}>
      <View style={styles.container}>
        <App store={store}/>
      </View>
    </Provider>
  )
}