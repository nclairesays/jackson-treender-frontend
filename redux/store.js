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
             console.log("SAVE USER ACTION", action)

            return {
                ...state, user: action.res.user
            };
        case 'CREATE_USER': 
        console.log("CREATE USER ACTION", action)

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

            console.log('LOGIN ACTION', action)
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
                    return {...state, user}
                } catch (error) {
                    console.log('Login Errors got in the way #1', error)
                }

            })
            .then( res => {
                console.log("RES", res)
                try {
                    console.log('LOGIN TOKEN2', res.user.token),
                    store.dispatch({ type: 'SAVE_USER', res}),
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
           setTimeout(() =>{server.get(`${API_URL}/get_potential_matchees`)
           .then( potentials => {
               store.dispatch({ type: 'SAVE_POTENTIALS', potentials })
               return {...state, potentials}
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
            server.get(`${API_URL}/successful_matches`)
            .then(successfulMatches => {
                store.dispatch({type: 'SAVE_SUCCESSFUL_MATCHES', successfulMatches})
            })
        }

        case 'SAVE_SUCCESSFUL_MATCHES':{
            return {...state, successfulMatches: action.successfulMatches}
        }

        case 'EDIT_PROFILE': {
            try {
                server.patch(`${API_URL}/users/${state.user.id}`,{
                    email: action.email, 
                    bio: action.bio, 
                    gender: action.gender, 
                    age: action.age
                })
                .then(res => console.log('EDIT PROFILE AFTER PAtCH', res))
                return {...state , user: {
                    email: action.email, 
                    bio: action.bio, 
                    gender: action.gender, 
                    age: action.age
                }}
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
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    compose(applyMiddleware(...middlewares))
);
export default store;
