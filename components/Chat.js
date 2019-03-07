import React, { Component } from 'react'
import { Text, View, StyleSheet, FlatList } from 'react-native'
import { connect } from 'react-redux'
import { Route, Link  } from 'react-router-native'
import { List, ListItem } from "react-native-elements";

import {_Profile } from './Profile'


class _Chat extends Component {


  componentDidMount () {
    this.props.getMatches()
  }

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          // width: '86%',
          width: '100%',
          backgroundColor: '#CED0CE',
          // marginLeft: '14%',
          // marginLeft: '14%',
        }}
      />
    );
  };

  render() {
    let matches = this.props.successfulMatches 
    let users = matches && matches.map( user => user)

    return (


      // <View>
            users 
              ?
              
              
                <FlatList
                  data={users}
                  renderItem={({ item }) => (
                    <ListItem
                      roundAvatar
                      title={`${item.name}`}
                      subtitle={`I am of the ${item.gender} species.`}
                      // avatar={{ uri: item.picture.thumbnail }}
                      containerStyle={{ borderBottomWidth: 0 }}
                    />
                  )}
                  keyExtractor={item => item.email}
                  ItemSeparatorComponent={this.renderSeparator}

                />


             






              // users.map( user => 
              //   <Link to={`/profile/${user.id}`} key={user.id}>
              //   {/* <Link to='/users/:id'> */}
              //     <Text key={user.id} style={styles.name}>
              //     {user.name}
              //     </Text>
                  
              //   </Link>)
              
          
            :<View></View>
            
            

    // </View>
          
            
      
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