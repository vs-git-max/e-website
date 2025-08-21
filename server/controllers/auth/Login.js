import { comparePassword } from "../../helpers/password.js";
import User from "../../models/user.model.js";
import jwt from "jsonwebtoken";

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) return res.json({ success: false, message: "User not found" });

    const checkPassword = await comparePassword(password, user.password);

    if (!checkPassword)
      return res.json({ success: false, message: "Wrong password!" });

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
        email: user.email,
        username: user.username,
      },
      process.env.JWT_TOKEN,
      {
        expiresIn: "60m",
      }
    );

    res
      .status(200)
      .cookie("token", token, { httpOnly: true, secure: false })
      .json({
        success: true,
        message: "User logged in successfully",
        user: {
          id: user._id,
          email: user.email,
          role: user.role,
          username: user.username,
        },
      });
  } catch (error) {
    console.log(`Error in the login ${error.message}}`);
    res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};

export default login;
