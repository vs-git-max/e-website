import { Router } from "express";
import fetchCartItems from "../controllers/cart/fetchCartItems.js";
import addToCart from "../controllers/cart/addToCart.js";
import updateCartItems from "../controllers/cart/updateCart.js";
import deleteCartItem from "../controllers/cart/deleteCartItem.js";

const cartRouter = Router();

cartRouter.get("/fetch-cart-items/:userId", fetchCartItems);
cartRouter.post("/add-to-cart", addToCart);
cartRouter.put("/update-cart", updateCartItems);
cartRouter.delete("/delete-cart-items/:userId/:productId", deleteCartItem);

export default cartRouter;
