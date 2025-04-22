import express from "express";
import handleImageUpload from "../../controllers/admin/productsController.js";
import utils from "../../helpers/cloudinary.js";
import addNewProducts from "../../controllers/admin/addNewProduct.js";
import editProducts from "../../controllers/admin/editProduct.js";
import deleteProducts from "../../controllers/admin/deleteProduct.js";
import fetchAllProducts from "../../controllers/admin/fetchAllProducts.js";

const router = express.Router();

router.post("/upload-image", utils.upload.single("my_file"), handleImageUpload);
router.post("/add", addNewProducts);
router.put("/edit/:id", editProducts);
router.delete("/delete/:id", deleteProducts);
router.get("/get", fetchAllProducts);

export default router;
