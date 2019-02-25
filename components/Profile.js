import React, { Component } from 'react';
import {
    ScrollView,
    Text,
    View,
    Button
} from 'react-native';
import { connect } from 'react-redux'
import { Link, Redirect } from 'react-router-native';


class _Profile extends Component {
    render() {
        console.log('PROPS IN PROFILE', this.props)
        
        return (

            <View >
                <Text style={{fontSize: 36}}> PROFILE </Text>

                {
                this.props.user    
                ? <> 
                    <Text style={{fontSize: 27}}>
                    
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
    onLogin: (email, password) => 
        dispatch({ type: 'LOGIN', email, password }),
    onLogout: () => dispatch({ type: 'LOGOUT'})
})


export default connect(mapStateToProps, mapDispatchToProps)(_Profile)