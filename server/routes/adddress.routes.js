import { Router } from "express";
import fetchAddress from "../controllers/address/fetchAddress.js";
import editAddress from "../controllers/address/editAddress.js";
import addAddress from "../controllers/address/addAddress.js";
import deleteAddress from "../controllers/address/deleteAddress.js";

const addressRouter = Router();

addressRouter.get("/fetch-address/:userId", fetchAddress);
addressRouter.put("/edit-address/:userId/:addressId", editAddress);
addressRouter.post("/add-address", addAddress);
addressRouter.delete("/delete-address", deleteAddress);

export default addressRouter;
