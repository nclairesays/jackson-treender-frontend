import React, { Component } from 'react';
import {
    ScrollView,
    Text,
    View,
    Button
} from 'react-native';
import { connect } from 'react-redux'
import { Link, Redirect } from 'react-router-native';
import { AsyncStorage } from 'react-native'


class _Profile extends Component {

    checkAsync = async () => {
        token = await AsyncStorage.getItem('token').then(token => console.log('TOKEN IN PROFILE ASYNC STORAGE', token))
        return token
    }
    render() {
        
        return (

            <View >
                <Text style={{fontSize: 27}}> PROFILE </Text>

                {
                this.props.user    
                ? <> 
                    <Text style={{fontSize: 25}}>
                    
                        Welcome {this.props.user.name}!
                    </Text>
                    
                    <View style={{margin:10}} />

                    <Button 
                        title="Logout"
                        onPress={() => 
                            {
                                // <Redirect to='/login' /> // Doesn't do anything
                                this.props.onLogout()
                            }}
                    />
                    </>
                
                : null
                }

            </View>
        )
    }
} 

  
 


const mapStateToProps = state => {

    return {
      user: state.user
    }
}

const mapDispatchToProps = (dispatch) => ({
    onLogout: () => dispatch({ type: 'LOGOUT'})
})


export default connect(mapStateToProps, mapDispatchToProps)(_Profile)