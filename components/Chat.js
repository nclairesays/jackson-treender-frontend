import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { Route, Link  } from 'react-router-native'

import {_Profile } from './Profile'


class _Chat extends Component {


  componentDidMount () {
    this.props.getMatches()
  }

  render() {
    let matches = this.props.successfulMatches 
    let users = matches && matches.map( user => user)

    return (


      <View>
            {users 
              ?
              users.map( user => 
                <Link to={`/profile/${user.id}`}>
                {/* <Link to='/users/:id'> */}
                  <Text key={user.id} style={styles.name}>
                  {user.name}
                  </Text>
                  
                </Link>)
              
          
            :null
            
            }

    </View>
          
            
      
    )
  }
}



const styles = StyleSheet.create({
  name: {
    fontSize: 30,
    fontWeight: '500'
  }
})



const mapStateToProps = state => {

    return {
      user: state.user,
      potentials: state.potentials,
      successfulMatches: state.successfulMatches
    }
}

const mapDispatchToProps = (dispatch) => ({
    getMatches: () => dispatch({ type: 'GET_SUCCESSFUL_MATCHES'})
 
})


export default connect(mapStateToProps, mapDispatchToProps)(_Chat)