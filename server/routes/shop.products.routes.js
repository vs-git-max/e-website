import { Router } from "express";
import getFilteredProducts from "../controllers/shop/fetchAllProducts.js";

const shopProductsRouter = Router();

shopProductsRouter.get("/get-filtered-products", getFilteredProducts);

export default shopProductsRouter;
