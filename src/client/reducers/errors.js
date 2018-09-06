import {mtypes as t} from '../../state'

export default (state = [], action) => {
    switch (action.type) {
        case t.FAILUREUSER:
            return action.payload.response.data;
        case t.LOADINGUSER:
            return "LOADING";
        case t.LOADEDUSER:
            return action.payload ||  "OK";
        default:
            return state;
    }
}