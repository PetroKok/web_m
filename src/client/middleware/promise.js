import {mtypes as t} from "../../state";

const middlewarePromise = store => next => action => {
    if (action.type !== t.SENDTOMIDDLEWARE) {
        return next(action);
    }
    const [LOADING, LOADED, FAILURE] = action.actions;
    store.dispatch({
        type: LOADING //START LOADING DATA
    });
    action.promise.then(
        data => {
            store.dispatch({
                type: LOADED,  //DATA IS LOADED
                payload: data
            })
        }
    )
        .catch(err => {
            store.dispatch({
                type: FAILURE, // OPSSS SOME TROUBLE
                payload: err
            })
        })
};

export default middlewarePromise;