import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { connect } from 'react-redux'


class _Chat extends Component {
  render() {
    return (
      <View>
        {console.log('CHAT COMPONENT, PROPS.GETMATCHES')

        // .map(match => 
        //     <Text>NAME: {match.name}</Text>)
        } 
      </View>
    )
  }
}



const mapStateToProps = state => {

    return {
      user: state.user,
      potentials: state.potentials
    }
}

const mapDispatchToProps = (dispatch) => ({
    // getMatches: () => 
    //     dispatch({ type: 'GET_SUCCESSFUL_MATCHES' }),
        getMatchees: () => 
        dispatch({ type: 'GET_POTENTIALS' }),
})


export default connect(mapStateToProps, mapDispatchToProps)(_Chat)

