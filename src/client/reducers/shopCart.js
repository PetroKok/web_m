import {mtypes as t} from "../../state";

export default (state = [], action) => {
    switch (action.type) {
        case t.ADDTOCART:
            return action.payload
        case t.CLEARCART:
            return {};
        default:
            return state;
    }
}