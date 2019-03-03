

import { createStore, applyMiddleware, compose } from 'redux';
import ReduxThunk from 'redux-thunk';
import { API_URL } from '../constants';
import { AsyncStorage } from 'react-native';
import { server } from '../server';
import { push } from 'react-router-redux'
import { history } from '../history';
import store from './store'


const defaultImage = 'https://i.pinimg.com/originals/9f/81/2d/9f812d4cf313e887ef99d8722229eee1.jpg'

export default userReducer = (state = null, action) => {
    switch (action.type) {
        
        case 'SAVE_USER':


            return {
                ...state, user: action.user
            };
        case 'CREATE_USER': 
            fetch(`${API_URL}/users`,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: action.name,
                    email: action.email,
                    password: action.password,
                    image: defaultImage
                })
            })
            .then(resp => resp.json())
            .then(() => history.push(`/login`))
            .catch(error => {
                 console.log('ERRORS GOT IN THE WAY: ', error)
            })   
        case 'LOGOUT':
            AsyncStorage.clear()
            history.push(`/login`)

            return {
                ...state, user: null
            }
        case 'LOGIN':


            server.post(`${API_URL}/auth`, {
                email: action.email,
                password: action.password
            }) 
            .then( async (user) => {
                try {
                    console.log('LOGIN TOKEN1', user.token)
                    await AsyncStorage.setItem('token', user.token)
                    await AsyncStorage.setItem('user', JSON.stringify(user))
                    await AsyncStorage.getItem('token').then(token => console.log('LOGIN TOKEN 1.5 IN ASYNCSTORAGE', token))
                    return user
                } catch (error) {
                    console.log('Login Errors got in the way #1', error)
                }

            })
            .then( user => {
                try {
                    console.log('LOGIN TOKEN2', user.token)
                    store.dispatch({ type: 'SAVE_USER', user })
                    history.push(`/profile`)

                } catch (error) {
                    console.log('Invalid login #2', error)

                }
                
            })
            .catch(error => {
                console.log('LOGIN ERRORS GOT IN THE WAY #3: ', error)
                // ADD WARNING LOGIN ERROR
           })
        default:
            return state;
    }
};
