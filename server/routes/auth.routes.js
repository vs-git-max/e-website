import { Router } from "express";
import register from "../controllers/auth/Register.js";
import login from "../controllers/auth/Login.js";
import logout from "../controllers/auth/Logout.js";
import authMiddleware from "../controllers/auth/AuthMiddleware.js";

const authRouter = Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.post("/logout", logout);
authRouter.get("/check-auth", authMiddleware, (req, res) => {
  const user = req.user;
  res.status(200).json({
    success: true,
    message: "Authenticated user.",
    user,
  });
});

export default authRouter;
