import express from "express";
import updateCartItems from "../../controllers/cart/updateCartItems";
import deleteCartItems from "../../controllers/cart/deleteFromCart";
import addToCart from "../../controllers/cart/addToCart";
import fetchCartItems from "../../controllers/cart/fetchCartItems";

const router = express.Router();

router.get("/get/:userId", fetchCartItems);
router.post("/add", addToCart);
router.delete("/delete:userId/:productId", deleteCartItems);
router.put("/updateCart", updateCartItems);

export default router;
