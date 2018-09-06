import axios from 'axios'
import URL from '../url'
import {mtypes as t} from "../../state";

export const sendToCart = (item, data) => {
    return axios.post(`/add-to-cart`, item)
        .then( r => {
            return {
                type: t.ADDTOCART,
                payload: [item.item].concat(data)
            }
        })
};