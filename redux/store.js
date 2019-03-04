import { createStore, applyMiddleware, compose } from 'redux';
import ReduxThunk from 'redux-thunk';
import { API_URL } from '../constants';
import { AsyncStorage } from 'react-native';
import { server } from '../server';
import { push } from 'react-router-redux'
import { history } from '../history';



const middlewares = [ReduxThunk];


const initialState = {

    user: null,
    potentials: null,
    successfulMatches: null

      
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
    history
    switch (action.type) {
        
        case 'SAVE_USER':
            //  console.log(action)

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
                user: null, potentials: null, successfulMatches: null
            }
        case 'LOGIN':


            server.post(`${API_URL}/auth`, {
                email: action.email,
                password: action.password
            }) 
            .then( async (user) => {
                // console.log(user)
                try {
                    // console.log('LOGIN TOKEN1', user.token)
                    await AsyncStorage.setItem('token', user.token)
                    await AsyncStorage.setItem('user', JSON.stringify(user))
                    // await AsyncStorage.getItem('token').then(token => console.log('LOGIN TOKEN 1.5', token))
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
        case 'GET_POTENTIALS': 
        console.log("GETTING POTENTIALS NOW")
           setTimeout(() =>{server.get(`${API_URL}/get_potential_matchees`)
           .then( potentials => {
               store.dispatch({ type: 'SAVE_POTENTIALS', potentials })
               return potentials
           })
           .then (() => history.push('/match'))
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
            .then(successfulMatches => {
                store.dispatch({type: 'SAVE_SUCCESSFUL_MATCHES', successfulMatches})
            })
            .then( () => history.push('/chat')) 
        }

        case 'SAVE_SUCCESSFUL_MATCHES':{
            return {...state, successfulMatches: action.successfulMatches}
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
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    compose(applyMiddleware(...middlewares))
);
export default store;
