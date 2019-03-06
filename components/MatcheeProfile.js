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
import { server } from '../server';
import { API_URL } from '../constants';


class _MatcheeProfile extends Component {

    state ={
        matchee: {}
    }

    componentDidMount() {
        const { id } = this.props.props2.match.params
        // console.log('ID in component did mount', id)
        server.get(`${API_URL}/users/${id}`)
        .then(res => 
            this.setState({matchee: res})
        )
    }

    
    render() {
        const {name, bio, email, gender,age, id} = this.state.matchee
        const defaultImage = 'https://i.pinimg.com/originals/9f/81/2d/9f812d4cf313e887ef99d8722229eee1.jpg'

        // console.log("STATEEEEEEEE", this.state)
        
        return (

            <View >
               
                <View style={styles.card}>
                        <Image
                            style={{flex:1}}
                            source={{uri: defaultImage}}
                        />
                        <View style={{margin:10}}>
                            <Text style={{fontSize:20}}>{name}{age? <>(, {age}, </>: null } </Text>
                            <Text style={{fontSize:15, color:'darkgrey'}} note>{gender ? <> I am of the {gender} species. </>: null }</Text>
                            <Text style={{fontSize:15}}>{bio}</Text>
                        </View>

                        <View style={{flexDirection: 'row',  justifyContent: 'space-between'}}>
          
                     
               
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
        current_user: state.user
    }
}

const mapDispatchToProps = (dispatch) => ({
    onLogout: () => dispatch({ type: 'LOGOUT'})
})


export default connect(mapStateToProps, mapDispatchToProps)(_MatcheeProfile)