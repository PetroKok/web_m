import { mtypes as t } from "../../state";
import { sendToCart } from "../api/shop-cart";

export const addToCart = (item, data) => {
    return {
        type: t.MIDDLEWARECART,
        promise: sendToCart(item, data)
    }
};

