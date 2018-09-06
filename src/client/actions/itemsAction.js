import {mtypes as t} from "../../state";
import {loadSelected} from '../api/items-api'

export const getSelected = (id) => {
    return {
        type: t.SENDTOMIDDLEWARE,
        actions: [t.LOADINGSELECTED, t.LOADEDSELECTED, t.FAILURESELECTED],
        promise: loadSelected(id)
    }
};

export const resetSelected = () => {
    return{
        type: t.RESETSELECTED
    }
}