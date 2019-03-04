import { connect } from 'react-redux'
import { server } from '../server'
import React, { Component } from 'react';
import { Text, View, FlatList, StyleSheet } from 'react-native'
import { Container, Header, Content, List, ListItem, Thumbnail, Left, Body, Right, Button } from 'native-base';
import { API_URL } from '../constants';
import store from '../redux/store'


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

    // let mapped = matches.map(match => console.log(match))x
    // console.log('PROPS IN CHAT', matches)
    // console.log(typeof(matches))
    // console.log(matches.keys())

    // this.renderMatchees()
    // setTimeout(() => console.log('USERS IN STATE - CHAT', this.state.users), 1000)

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
  // console.log('map state to props11111', store.getState())
  // console.log('map state to props222222', state.match)
  return {
    user: state.user.user,
    match: state.match
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getSuccessfulMatches: () => dispatch({ type: 'GET_SUCCESSFUL_MATCHES '})
  }
 
}


export default connect(mapStateToProps, mapDispatchToProps)(_Chat)

