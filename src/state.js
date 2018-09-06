import {applyMiddleware, combineReducers, createStore} from 'redux'
import * as reducers from './client/reducers'
import logger from 'redux-logger'
import middlewarePromise from './client/middleware/promise'
import Auth from './client/middleware/Auth'
import Cart from './client/middleware/Cart'

export const mtypes = {
    //ALL MUSIC
    ADDMUSIC: "ADD",
    RESETMUSIC: "RESET",
    SENDTOMIDDLEWARE: "SENDTOMIDDLEWARE",
    LOADING: "LOADING",
    LOADED: "LOADED",
    FAILURE: "FAILURE",

    //SELECTED ITEM
    ADDSELECTED: "ADDSELECTED",
    RESETSELECTED: "RESETSELECTED",
    LOADINGSELECTED: "LOADINGSELECTED",
    LOADEDSELECTED: "LOADEDSELECTED",
    FAILURESELECTED: "FAILURESELECTED",

    //CURRENT MUSIC
    CADD: "CADD",
    CRESET: "CRESET",

    //ITEM
    ADDITEM: "ADDITEM",
    LOADINGITEM: "LOADINGITEM",
    LOADEDITEM: "LOADEDITEM",
    FAILUREITEM: "FAILUREITEM",

    //LOGIN
    USER: "USER",
    GET_ERRORS: "GET_ERRORS",
    SET_CURRENT_USER: "SET_CURRENT_USER",
    LOADINGUSER: "LOADINGUSER",
    LOADEDUSER: "LOADEDUSER",
    FAILUREUSER: "FAILUREUSER",

    //ShoppingCart
    ADDTOCART: "ADDTOCART",
    CLEARCART: "CLEARCART",
    MIDDLEWARECART: "MIDDLEWARECART"
};

const reducer = combineReducers(reducers);

export const createStoreWithMiddleware = applyMiddleware(Cart, Auth, middlewarePromise, logger)(createStore);

const store = createStoreWithMiddleware(reducer,
    {
        shopCart: [],
        errors: [],
        selected: [],
        music: [],
        item: [],
        current: {
            img: "public/files-music/PADYPADY-Music7298910199.jpg",
            path: "public/files-music/Panda - Designer.mp3",
            title: "Panda - Designer.mp3"
        }
    }
);

export default store