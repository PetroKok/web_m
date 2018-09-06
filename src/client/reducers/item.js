import {mtypes as mt} from '../../state'

export default (state = [], action) => {
    switch (action.type) {
        case mt.ADDITEM:
            return action.payload;
        case mt.LOADINGITEM:
            return "LOADING";
        case mt.LOADEDITEM:
            return action.payload.data;
        case mt.FAILUREITEM:
            return action.payload || "FAILURE";
        default:
            return state;
    }
}
