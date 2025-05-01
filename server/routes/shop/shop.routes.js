import getFilteredProducts from "../../controllers/shop/getFilteredProducts.js";

import express from "express";
import getProductsDetails from "../../controllers/shop/getProductsDetails.js";

const router = express.Router();

router.get("/get", getFilteredProducts);
router.get("/get/:id", getProductsDetails);

export default router;
