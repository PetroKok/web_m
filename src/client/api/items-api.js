import {URL} from '../url'
import fetch from 'isomorphic-fetch'
import axios from 'axios'

export const getItem = (count, skp) => {
    return axios.post(URL + `/bicycles/${count}/${skp}`)
};

export const loadSelected = (id) => {
    return axios.post(`${URL}/bicycle/${id}`)
};