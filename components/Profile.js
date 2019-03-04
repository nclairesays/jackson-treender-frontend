import React, { Component } from 'react';
import {
    ScrollView,
    Text,
    View,
    Button,
    Image,
    StyleSheet,
    Dimensions,
    TouchableHighlight
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
        const {name, bio, email, id} = this.props.profile
        const defaultImage = 'https://i.pinimg.com/originals/9f/81/2d/9f812d4cf313e887ef99d8722229eee1.jpg'
        
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

                <View style={styles.card}>
                        <Image
                            style={{flex:1}}
                            source={{uri: defaultImage}}
                        />
                        <View style={{margin:10}}>
                            <Text style={{fontSize:20}}>{name}</Text>
                            <Text style={{fontSize:15}} note>{email}</Text>
                            <Text style={{fontSize:15, color:'darkgrey'}}>{bio}</Text>
                        </View>

                        <View style={{flexDirection: 'row',  justifyContent: 'space-between'}}>
          
                        <Link
                            to="/editForm"
                            underlayColor='#f0f4f7'
                            >
                            
                            <View style={{ backgroundColor: 'darkred'}}>
                                    <Text>EDIT YOUR PROFILE</Text>
                            </View>
    
                        </Link>
                            
               
                        </View>

                        <Button 
                        title="Logout"
                        onPress={() => 
                            {
                                // <Redirect to='/login' /> // Doesn't do anything
                                this.props.onLogout()
                            }}
                        />


                </View>



            </View>
        )
    }
} 



const {width, height} = Dimensions.get('window')

const styles = StyleSheet.create({
    card: {
        position: 'absolute',
        width: width - 40,
        height: height * 0.7,
        overflow: 'hidden',
        backgroundColor: 'white',
        margin: 10,
        borderWidth: 1,
        borderColor: 'lightgrey',
        borderRadius: 8,
    },
    button: {
        flex: 2
    }
})

  
 


const mapStateToProps = state => {

    return {
        profile: state.user
    }
}

const mapDispatchToProps = (dispatch) => ({
    onLogout: () => dispatch({ type: 'LOGOUT'})
})


export default connect(mapStateToProps, mapDispatchToProps)(_Profile)