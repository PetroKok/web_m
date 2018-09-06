import {mtypes as mt} from '../../state'

export default (state = [], action) => {
    switch (action.type) {
        case mt.ADDMUSIC:
            return action.payload;
        case mt.RESETMUSIC:
            return [];
        case mt.LOADING:
            return "LOADING";
        case mt.LOADED:
            return action.payload;
        case mt.FAILURE:
            return action.payload || "FAILURE";
        default:
            return state;
    }
}
