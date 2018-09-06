import fetch from 'isomorphic-fetch'
import {URL} from '../url'

export const getAll = () => {
    return fetch(URL+'/load-music', {
        method: "POST"
    })
        .then( r => r.json())
};


