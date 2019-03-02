import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { connect } from 'react-redux'


class _Chat extends Component {

  state = {
    matches: null
  }

  matchGetter = () => {
    // this.props.getMatches()
  }
  componentDidMount () {
    // this.props.getMatches()
  }

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
      potentials: state.potentials,
      successfulMatches: state.successfulMatches
    }
}

const mapDispatchToProps = (dispatch) => ({
    getMatches: () => dispatch({ type: 'GET_SUCCESSFUL_MATCHES'})
 
})


export default connect(mapStateToProps, mapDispatchToProps)(_Chat)

