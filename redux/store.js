

import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import ReduxThunk from 'redux-thunk';
import { API_URL } from '../constants';
import { AsyncStorage } from 'react-native';
import { server } from '../server';
import { push } from 'react-router-redux'
import { history } from '../history';




const middlewares = [ReduxThunk];


const initialState = {

    user: null,
    potentials: null

}


const rootReducer = (state, action) => {
   console.log('STATE IN ROOTREDUCER', state)
    switch (action.type) {
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
                // console.log(user)
                try {
                    console.log('LOGIN TOKEN1', user.token)
                    await AsyncStorage.setItem('token', user.token)
                    await AsyncStorage.setItem('user', JSON.stringify(user))
                    await AsyncStorage.getItem('token').then(token => console.log('LOGIN TOKEN 1.5', token))
                    return user
                } catch (error) {
                    alert(error)
                }

            })
            .then( user => {
                if(!user.error){
                    console.log('LOGIN TOKEN 2', user.token)
                    store.dispatch({ type: 'SAVE_USER', user })
                    // store.dispatch({ type: 'GET_POTENTIALS' })
                    history.push(`/profile`)
                } else {
                    console.log('Invalid login')
                }
            })
            .catch(error => {
                console.log('LOGIN ERRORS GOT IN THE WAY: ', error)
                // ADD WARNING LOGIN ERROR
           })
        case 'SAVE_USER':
           console.log('HITS SAVE_USER', state)
          return {
              ...state, user: action.user
          };
        case 'GET_POTENTIALS': 
        console.log('hitting get potentials reducer')
           setTimeout(() =>{server.get(`${API_URL}/get_potential_matchees`)
           .then(()=>console.log('hits thiss after fetching potentials'))
        //    .then( potentials => {
        //        store.dispatch({ type: 'SAVE_POTENTIALS', potentials })
        //        console.log("GET_POTENTIALS TRYING TO SAVE", potentials)
        //        return potentials
        //    })     
        //    .then((potentials) => console.log('INSIDE GET POTENTIALS', potentials))
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
            server.get(`${API_URL}/successful_matches`)
            
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

