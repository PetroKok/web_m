import {URL} from '../url'
import axios from 'axios'
import  setAuthToken from '../api/setAuthToken'
import jwt_decode from 'jwt-decode'
import {mtypes as t} from "../../state";


export const regUser = (user, history) => {
    return axios.post(URL + '/api/register', user)
        .then(r => history.push('/login'))
};

export const logUser = (user, history) => {
    return axios.post(URL + "/api/login", user)
        .then(r => {
            const {token} = r.data;
            localStorage.setItem('jwtToken', token);
            setAuthToken(token);
            const decode = jwt_decode(token);
            history.push('/');
            return setCurrentUser(decode);
        })
}

export const setCurrentUser = decoded => {
    return {
        type: t.SET_CURRENT_USER,
        payload: decoded
    }
}