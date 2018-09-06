import {mtypes as mt} from "../../state";

export default (state = [], action) => {
    switch (action.type) {
        case mt.ADDSELECTED:
            return action.payload;
        case mt.RESETSELECTED:
            return [];
        case mt.LOADINGSELECTED:
            return "LOADING";
        case mt.LOADEDSELECTED:
            return action.payload.data;
        case mt.FAILURESELECTED:
            return action.payload || "FAILURE";
        default:
            return state;
    }
}