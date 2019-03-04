

import { createStore, applyMiddleware, compose } from 'redux';
import ReduxThunk from 'redux-thunk';
import { API_URL } from '../constants';
import { AsyncStorage } from 'react-native';
import { server } from '../server';
import { push } from 'react-router-redux'
import { history } from '../history';

import store from './store'



export default matchReducer = (state = { successfulMatches: null }, action) => {
    console.log('MATCH REDUCER STATE', state)
    switch (action.type) {
        case 'GET_POTENTIALS': 
            console.log('hits GET_POTENTIALS')
           setTimeout(() =>{server.get(`${API_URL}/get_potential_matchees`)
           .then( potentials => {
               store.dispatch({ type: 'SAVE_POTENTIALS', potentials })
               return potentials
           })     
          .catch(error => {
               console.log('ERRORS GOT IN THE WAY: ', error)
           })},
           1000
           )

        case 'SAVE_POTENTIALS': {
            return {...state, potentials: action.potentials}
        }   
        case 'ADD_RESPONSE': {
            console.log('ACTIONSSS', action)
            server.post(`${API_URL}/matches/check`, {
                current_user_response: action.current_user_response,
                matchee_id: action.matchee_id,
                current_user_id: action.current_user_id
            })




                // method: 'POST',
                // headers: {
                //     'Content-Type': 'application/json',
                //     'Authorization': state.user.token
                // },
                // body: JSON.stringify({
                //     current_user_response: action.current_user_response,
                //     matchee_id: action.matchee_id
                // })
            // })
            // .then(res => res.json() )
            // .then(console.log)
        } 


        case 'GET_SUCCESSFUL_MATCHES': {
            console.log('hits here to get successful matches')
            server.get(`${API_URL}/successful_matches`)
            .then(successfulMatches => {
               return store.dispatch({type: 'SAVE_SUCCESSFUL_MATCHES', successfulMatches})
            })
        }

        case 'SAVE_SUCCESSFUL_MATCHES':{
            let newState = {...state, successfulMatches: action.successfulMatches}
            store.dispatch({type: 'SEE_STATE'})
            return newState
        }

        case 'SEE_STATE': {
            console.log('SEE STATE', state)
            return state
        }

            
       
        default:
            return state;
    }
};
