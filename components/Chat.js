import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { connect } from 'react-redux'


class _Chat extends Component {
  render() {
    return (
      <View>
        <Text> textInCHATComponent </Text>
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
    getMatchees: () => 
        dispatch({ type: 'GET_POTENTIALS' }),
    addResponse: (matchee_id, current_user_response, current_user_id) => 
      dispatch({ type: 'ADD_RESPONSE', matchee_id, current_user_response, current_user_id })
})


export default connect(mapStateToProps, mapDispatchToProps)(_Chat)

