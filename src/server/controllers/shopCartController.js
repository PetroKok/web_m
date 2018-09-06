import express from 'express'
import {addToCart, removeFromCart} from './Cart'

let router = express.Router();

router.post("/add-to-cart", addToCart);
router.post("/remove-from-cart", removeFromCart);


export default router
