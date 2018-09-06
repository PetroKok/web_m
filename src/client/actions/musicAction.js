import { mtypes as t } from "../../state";
import { getAll } from "../api/music-api";

export const getMusic = () => {
    return {
        type: t.SENDTOMIDDLEWARE,
        actions: [t.LOADING, t.LOADED, t.FAILURE],
        promise: getAll()
    }
};

export const ResetMusic = () => {
    return {
        type: t.RESETMUSIC
    }
};

export const setCurrent = (path) => {
    return {
        type: t.CADD,
        payload: path
    }
};

export const resetCurrent = () => {
    return {
        type: t.CRESET
    }
};