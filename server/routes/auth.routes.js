import express from "express";
import register from "../controllers/authControllers/register.js";
import login from "../controllers/authControllers/login.js";
import logout from "../controllers/authControllers/logout.js";
import authMiddleware from "../controllers/authControllers/auth.middleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("logout", logout);

router.get("/check-auth", authMiddleware, (req, res) => {
  const user = req.user;
  res.status(200).json({
    success: true,
    message: "User authenticated",
    user,
  });
});

export default router;
