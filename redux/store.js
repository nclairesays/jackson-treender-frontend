

import { createStore, applyMiddleware, compose } from 'redux';
import ReduxThunk from 'redux-thunk';
import { API_URL } from '../constants';
import { AsyncStorage } from 'react-native';
import { server } from '../server';
import { push } from 'react-router-redux'
import { createMemoryHistory } from 'history'



const middlewares = [ReduxThunk];


const initialState = {

    user: null,
    potentials: null
      
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
            server.post(`${API_URL}/users`,{
                name: action.name,
                email: action.email,
                password: action.password
            })
           
            // .then(() => {
            //     store.dispatch(push('/login'));
            // })

            .catch(error => {
                 console.log('ERRORS GOT IN THE WAY: ', error)
            })
        case 'LOGOUT':
            return {
                ...state, user: null
            }
        case 'LOGIN':
       

            fetch(`${API_URL}/auth`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: action.email,
                    password: action.password
                })
            })
            
            .then(res => res.json() )
            .then( user => {
                store.dispatch({ type: 'SAVE_USER', user })
                AsyncStorage.setItem('token', user.token)
                AsyncStorage.setItem('user', JSON.stringify(user))  
            })
            

            // REDIRECT TO PROFILE
            // .then() 
            //     .then(res => res.json())
            //     .then( (user) => {
            //         this.props.onLogin(user.token, user)
            //     //  this.props.history.push(`/users/${user.id}`)
            //     } )
                     
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
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': state.user.token
                },
                body: JSON.stringify({
                    current_user_response: action.current_user_response,
                    matchee_id: action.matchee_id
                })
            })

            // .then(res => res.json() )
            // .then(console.log)
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



