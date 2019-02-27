

import { createStore, applyMiddleware, compose } from 'redux';
import ReduxThunk from 'redux-thunk';
import { API_URL } from '../constants';
import { AsyncStorage } from 'react-native';
import { server } from '../server';
import { push } from 'react-router-redux'
import { history } from '../history'




const middlewares = [ReduxThunk];


const initialState = {

    user: null,
    potentials: null,
    token: null
      
    // user: {
    //     name: "Claire",
    //     email: "claire@flatiron.com",
    //     age: 26,
    //     bio: "I code and stuff"
    // },

    // loading: true,
    // error: null


}



const rootReducer = (state, action) => {
    
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
                    password: action.password
                })
            })
            .then(resp => resp.json())
            .then(res => {
                // this.props.history.push(`/login`)  
                console.log(res)
            })

            .catch(error => {
                 console.log('ERRORS GOT IN THE WAY: ', error)
            })
        case 'LOGOUT':
            AsyncStorage.setItem('token', null)
            AsyncStorage.setItem('user', null)  
            // this.props.history.push(`/login`)

            return {
                ...state, user: null
            }
        case 'LOGIN':
            
            server.post(`${API_URL}/auth`, {
                email: action.email,
                password: action.password
            }) 
            .then( user => {
                store.dispatch({ type: 'SAVE_USER', user })
                AsyncStorage.setItem('token', user.token)
                AsyncStorage.setItem('user', JSON.stringify(user))  
                // history.push(`/match`)
            })
    
        case 'GET_POTENTIALS': 
            server.get(`${API_URL}/get_potential_matchees`)
            .then( potentials => {
                store.dispatch({ type: 'SAVE_POTENTIALS', potentials })
            })
           .catch(error => {
                console.log('ERRORS GOT IN THE WAY: ', error)
            })
        case 'SAVE_POTENTIALS': {
            return {...state, potentials: action.potentials}
        }   
        case 'ADD_RESPONSE': {
            console.log('ACTIONSSS', action)

            server.post(`${API_URL}/matches/check`, {
                current_user_response: action.current_user_response,
                matchee_id: action.matchee_id
                // current_user: action.current_user
            })
            
            // .then(res => res.json() )
            // .then(() => console.log(' THIS IS FROM ADD_RESPONSE'))
        } 

            
        case 'LOADING':
            return { ...state, loading: action.isLoading };
        case 'ERROR':
            return { ...state, error: action.error };
        default:
            return state;
    }
};



AsyncStorage.getItem('user')
.then( jsonUser => {
    try {
        let user = JSON.parse(jsonUser)
        if(user) store.dispatch({ type: 'SAVE_USER', user: user })
    } catch(err){
        console.log('HAVE NO SIGNED IN YET. ERROR: ', err)
      
    }
})


const store = createStore(
    rootReducer,
    initialState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    compose(applyMiddleware(...middlewares))
);
export default store;



