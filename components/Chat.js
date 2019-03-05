import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { connect } from 'react-redux'


class _Chat extends Component {


  componentDidMount () {
    this.props.getMatches()
  }

  render() {
    let matches = this.props.successfulMatches 
    let users = matches && matches.map( user => (user.name))

    return (
      <View>
        {users 
          ?
          users.map( name => 
          <Text key={name.indexOf()} style={styles.name}>
          {name}
          
        </Text>)
        :null
        
        }

      </View>
    )
  }
}



const styles = StyleSheet.create({
  name: {
    fontSize: 18,
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