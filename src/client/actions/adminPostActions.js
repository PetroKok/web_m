import { mtypes as t } from "../../state";
import { getItem } from "../api/items-api";

export const getItems = (count, skip) => {
    return {
        type: t.SENDTOMIDDLEWARE,
        actions: [t.LOADINGITEM, t.LOADEDITEM, t.FAILUREITEM],
        promise: getItem(count, skip)
    }
};

