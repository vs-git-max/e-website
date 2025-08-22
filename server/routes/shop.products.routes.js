import { Router } from "express";
import getFilteredProducts from "../controllers/shop/fetchAllProducts.js";
import getProductDetails from "../controllers/shop/getProductDetails.js";

const shopProductsRouter = Router();

shopProductsRouter.get("/get-filtered-products", getFilteredProducts);
shopProductsRouter.get("/get-product-details/:id", getProductDetails);

export default shopProductsRouter;
