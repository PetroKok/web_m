import {mtypes as t} from "../../state";
import {logUser, regUser, setCurrentUser} from '../api/user-api'
import setAuthToken from "../api/setAuthToken";

export const registerUser = (user, history) => {
    return {
        type: t.SENDTOMIDDLEWARE,
        actions: [t.LOADINGUSER, t.LOADEDUSER, t.FAILUREUSER],
        promise: regUser(user, history)
    }
};

export const loginUser = (user, history) => {
    return {
        type: t.USER,
        promise: logUser(user, history)
    }
};

export const logoutUser = (history = null) => {
    setAuthToken(false);
    localStorage.removeItem('jwtToken');
    history ? history.push("/") : null;
    return setCurrentUser({});
};