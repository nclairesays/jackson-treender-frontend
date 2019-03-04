import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'

export default class _Welcome extends Component {
  render() {
    return (
      <View style={styles.welcome}>
        <Text> WELCOME PAGE HERE FIX NAV POSITIONS LATER...  </Text>
      </View>
    )
  }
}


const styles = StyleSheet.create({
    welcome: {
  
      marginTop: 50,
    //   padding: 10,
      flex: 1,
  
    }
})
