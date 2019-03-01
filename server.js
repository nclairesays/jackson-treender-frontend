import { AsyncStorage } from 'react-native';

// const request = method => (url, body) => {
//     return fetch(url, {
//         method: method,
//         headers: {
//             'Content-Type': 'application/json',
//             Authorization: `Bearer ${AsyncStorage.getItem('token')}` 
//         },
//         body: JSON.stringify(body)
//     })
//         .then(resp => resp.json())
// }


const request = (method) =>  async (url, body) => {
   
    try {
        token = await AsyncStorage.getItem('token')
        // parsedToken = await JSON.parse(token)
        console.log("PARSED TOKEN AFTER AWAIT", token)


        return fetch(url, {
                    method: method,
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}` 
                    },
                    body: JSON.stringify(body)
                })
                .then(resp => resp.json())
                
        
                
        
    } catch (error){
        alert(error.message)
    }
  

    // return await AsyncStorage.getItem('token')
    //     .then(console.log)


    //     .then( token => 

    //         fetch(url, {
    //         method: method,
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'Authorization': `Bearer ${token}` 
    //         },
    //         body: JSON.stringify(body)
    //     })
    //     .then(resp => resp.json())

    //     )
   
    }

export const server = {
    get: request('GET'),
    patch: request('PATCH'),
    post: request('POST'),
    delete: request('DELETE'),
}

 