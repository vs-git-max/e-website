import express from "express";
import register from "../controllers/authControllers/register.js";
import login from "../controllers/authControllers/login.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

export default router;
