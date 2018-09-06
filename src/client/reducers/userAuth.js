import {mtypes as t} from "../../state";
import isEmpty from '../../server/settings/is-empty'

export default (state = [], action) => {
    switch (action.type) {
        case t.SET_CURRENT_USER:
            return {
                ...state,
                isAuthenticated: !isEmpty(action.payload),
                user: action.payload
            };
        default:
            return state;
    }
}