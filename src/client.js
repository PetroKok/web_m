//-----MODULES
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router} from 'react-router-dom'
import App from './client/App'
import setAuthToken from "./client/api/setAuthToken";
import jwt_decode from 'jwt-decode'
import {setCurrentUser} from "./client/api/user-api";
import {logoutUser} from './client/actions/authentication'
//------REDUX
import store from './state'
import { Provider } from 'react-redux'

if(localStorage.jwtToken){
    setAuthToken(localStorage.jwtToken);
    const decode = jwt_decode(localStorage.jwtToken);
    store.dispatch(setCurrentUser(decode));
    const currentTime = Date.now() / 1000;
    if(decode.exp < currentTime){
        store.dispatch(logoutUser());
        window.location.href = "/login"
    }
}

let preloadedState = 1;
preloadedState  = window.__PRELOADED_STATE__;

// Allow the passed state to be garbage-collected
delete window.__PRELOADED_STATE__;

console.log("__PRELOADED_STATE__ = ",preloadedState);

class Client extends React.Component{
    render(){
        return(
            <Provider store={store}>
                <Router>
                    <App/>
                </Router>
            </Provider>
        )
    }
}

ReactDOM.hydrate(<Client />, document.getElementById("root"));

