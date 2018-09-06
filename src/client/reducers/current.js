import {mtypes as mt} from "../../state";

export default (state = {}, action) => {
    switch (action.type) {
        case mt.CADD:
            return action.payload;
        case mt.CRESET:
            return [];
        default:
            return state;
    }
}