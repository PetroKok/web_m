import {mtypes as t} from "../../state";

const middlewareAuth = store => next => action => {
    if (action.type !== t.USER) {
        return next(action);
    }
    action.promise.then(
        data => {
            store.dispatch({
                type: data.type,
                payload: data.payload
            })
        }
    )
        .catch(
            err => {
                store.dispatch({
                    type: t.FAILUREUSER,
                    payload: err
                })
            }
        )
};

export default middlewareAuth;