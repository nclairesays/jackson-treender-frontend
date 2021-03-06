import React, { Component } from 'react';
import {
    Text,
    View,
    Image,
    Dimensions,
    TouchableHighlight
} from 'react-native';
import { connect } from 'react-redux'
import { server } from '../server';
import { API_URL } from '../constants';
import { styles } from './Styles';



class _MatcheeProfile extends Component {
    
    _isMounted = false;

    state ={
        matchee: {}
    }

    componentDidMount() {
        let id
        this._isMounted = true;
        
        if (this.props.user) {
            id = this.props.user.id
        } else {
            id = this.props.props2.match.params.id
        }

        server.get(`${API_URL}/users/${id}`)
        .then(res => {
            if (this._isMounted) {
                this.setState({matchee: res})
            }}
        )
    }


    componentWillUnmount() {
        this._isMounted = false;
    }

    
    render() {
        const {name, bio, gender,age} = this.state.matchee
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
                            <Text style={{fontSize:20}}>{name}{age? <>, {age} </>: null } </Text>
                            <Text style={{fontSize:15, color:'darkgrey'}} note>{gender ? <> I am of the {gender.toLowerCase()} species. </>: null }</Text>
                            
                            <Text style={{fontSize:15}}>{bio}</Text>
                        </View>

                        <View style={{flexDirection: 'row',  justifyContent: 'space-between'}}>
          
                     
               
                        </View>

        

                </View>



            </View>
        )
    }
} 



const {width, height} = Dimensions.get('window')



const mapStateToProps = state => {

    return {
        current_user: state.user
    }
}

const mapDispatchToProps = (dispatch) => ({
    onLogout: () => dispatch({ type: 'LOGOUT'})
})


export default connect(mapStateToProps, mapDispatchToProps)(_MatcheeProfile)