import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Login from './components/Login';
import Secured from './components/Secured';


export default class App extends React.Component {
  
  state = {
    isLoggedIn: false
  }

  render() {


    return (
      
      <View style={styles.container}>
        {
          (this.state.isLoggedIn) 
          ? <Secured onLogoutPress={() => this.setState({isLoggedIn: false})} />
          : <Login onLoginPress={() => this.setState({isLoggedIn: true})} />
        }
      </View>
    )
  }
}
      
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
