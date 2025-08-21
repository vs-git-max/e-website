import { Router } from "express";

import uploadImage from "../controllers/admin/image-upload.js";
import { upload } from "../config/cloudinary.js";
import fetchAllProducts from "../controllers/admin/fetchAllProducts.js";
import addNewProduct from "../controllers/admin/addNewProduct.js";
import editProduct from "../controllers/admin/editProduct.js";
import deleteProduct from "../controllers/admin/deleteAProduct.js";

const productsRouter = Router();

productsRouter.post("/image-upload", upload.single("my-file"), uploadImage);

productsRouter.get("/fetch-all-products", fetchAllProducts);
productsRouter.post("/add-new-product", addNewProduct);
productsRouter.put("/edit-product/:id", editProduct);
productsRouter.delete("/delete-product/:id", deleteProduct);

export default productsRouter;
