import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Login from './components/Login';
import Secured from './components/Secured';
import SignUp from './components/SignUp';

import { YellowBox, AppRegistry } from 'react-native'
YellowBox.ignoreWarnings([
  'Remote debugger',
])

// export default class App extends Component {
//   render() {
//     return (
//       <View>
//         <Text> textInComponent </Text>
//       </View>
//     )
//   } 
// }





export default class App extends React.Component {
  
  state = {
    isLoggedIn: false,
    isSignedUp: false
  }

  render() {


    return (
      
      <View style={styles.container}>
        {
          (this.state.isLoggedIn) 
          ? <Secured onLogoutPress={() => this.setState({ isLoggedIn: false })} />
          : (this.state.isSignedUp)
          ? <Login onLoginPress={() => this.setState({ isLoggedIn: true })} />
          : <SignUp onSignUpPress={()=> this.setState({ isSignedUp: true }) }/>

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
