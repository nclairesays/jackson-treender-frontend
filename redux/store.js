
import { combineReducers } from 'redux';
import { API_URL } from '../constants';


const rootReducer = (state = {

    // initial state:
    token: {},
    loading: true,
    error: null,
    // user: null

}, action) => {
    console.log('ACTIONSSS', state)
    switch (action.type) {
        
        case 'SAVE_USER':
            return {
                ...state, user: action.user
                
            };
        // case 'LOGIN':
           
            server.post(`${API_URL}/auth`, {
                email: action.email,
                password: action.password,
                    
            })
                .then( user => {
                    store.dispatch({ type: 'SAVE_USER', user })
                }) 
            // fetch(`${API_URL}/auth`,{
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json'
            //     },
            //     body:JSON.stringify({
            //         username: this.state.username,
            //         password: this.state.password
            //     })
            // })
            //     .then(res => res.json())
            //     .then( (user) => {
            //         this.props.onLogin(user.token, user)
            //     //  this.props.history.push(`/users/${user.id}`)
            //     } )
                     
            
        case 'LOADING':
            return { ...state, loading: action.isLoading };
        case 'ERROR':
            return { ...state, error: action.error };
        default:
            return state;
    }
};

const initialState = {
    token: null
}


const store = createStore(
    rootReducer,
    initialState,// default state of the application
    compose(applyMiddleware(...middlewares)),
);


AsyncStorage.getItem('user')
    .then( jsonUser => {
        try {
            let user = JSON.parse(jsonUser)
            store.dispatch({ type: 'SAVE_USER', user: user })
        } catch(err){
            // Have not signed in yet
        }
    })



export default store;

