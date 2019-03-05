import { createStore, applyMiddleware, compose } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import ReduxThunk from 'redux-thunk';
import { API_URL } from '../constants';
import { AsyncStorage } from 'react-native';
import { server } from '../server';
import { push } from 'react-router-redux'
import { history } from '../history';
import { Link } from 'react-router-native'



const middlewares = [ReduxThunk];


const initialState = {

    user: null,
    potentials: null,
    successfulMatches: null
    // loading: true,
    // error: null
}



const rootReducer = (state, action) => {
    history
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
            .then(() => history.push(`/login`))
            .catch(error => {
                 console.log('ERRORS GOT IN THE WAY: ', error)
            })   
        case 'LOGOUT':
            AsyncStorage.clear()
            history.push(`/login`)

            return {
                user: null,  
                potentials: null,
                successfulMatches: null
            }
        case 'LOGIN':
            try {
                server.post(`${API_URL}/auth`, {
                    email: action.email,
                    password: action.password
                }) 
                .then( async (user) => {
                    try {

                        await AsyncStorage.setItem('token', user.token)
                        await AsyncStorage.setItem('user', JSON.stringify(user))
                        return user
                    } catch (error) {
                        alert('Login Errors got in the way #1', error)
                    }
                })
                .then( user => {
                    try {
                        console.log("RESPONSE FROM AFTER POSTING", user)
                        store.dispatch({ type: 'SAVE_USER', user}),
                        history.push(`/profile`)
    
                    } catch (error) {
                        alert('ERROR WHEN SAVING USER: ', error)
                    }
        
                })
                .catch(error => {
                    alert("ERRORS AFTER POSTING AUTH:", error)
               })
            } catch (err) {
                alert('LOGIN ERRORS: ', err)
            } 
        case 'GET_POTENTIALS': 
           setTimeout(() =>{server.get(`${API_URL}/get_potential_matchees`)
           .then( potentials => {
               store.dispatch({ type: 'SAVE_POTENTIALS', potentials })
               return {...state, potentials}
           })     
          .catch(error => {
               alert('ERRORS WHEN GETTING POTENTIALS', error)
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
        } 
        case 'GET_SUCCESSFUL_MATCHES': {
            server.get(`${API_URL}/successful_matches`)
            .then(successfulMatches => {
                store.dispatch({type: 'SAVE_SUCCESSFUL_MATCHES', successfulMatches})
            })
        }
        case 'SAVE_SUCCESSFUL_MATCHES':{
            return {...state, successfulMatches: action.successfulMatches}
        }
        case 'EDIT_PROFILE': {
            console.log('Is the age working?', action.age)
            try {
                server.patch(`${API_URL}/users/${state.user.id}`,{
                    email: action.email, 
                    bio: action.bio, 
                    gender: action.gender, 
                    age: parseInt(action.age)
                })
                .then( user => store.dispatch({ type: 'SAVE_USER', user}))
                .then( () => history.push('/profile') )

            } catch (err) {
                alert("YOU GOT ERRORS WHILE EDITING:", err)

            }   
        }
        case 'LOADING':   
            return { ...state, loading: !action.isLoading };
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
    composeWithDevTools(applyMiddleware(...middlewares))
    // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    // compose(applyMiddleware(...middlewares))
);
export default store;
