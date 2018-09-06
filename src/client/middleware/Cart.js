import {mtypes as t} from "../../state";

const middlewareCart = store => next => action => {
    if (action.type !== t.MIDDLEWARECART) {
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
                console.log(err)
            }
        )
};

export default middlewareCart;