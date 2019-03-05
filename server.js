import { AsyncStorage } from 'react-native';

const request = (method) =>  async (url, body) => {
   
    try {
        token = await AsyncStorage.getItem('token')
 
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
   
    }

export const server = {
    get: request('GET'),
    patch: request('PATCH'),
    post: request('POST'),
    delete: request('DELETE'),
}

 