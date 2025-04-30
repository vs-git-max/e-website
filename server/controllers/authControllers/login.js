import jwt from "jsonwebtoken";

import User from "../../models/user.model.js";
import { validateEmail } from "../../utils/email.js";
import { comparePassword } from "../../utils/password.js";

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    //checking of all the fields are added
    if ([email, password].some((item) => !item || item.trim() === ""))
      return res.status(400).json({ message: "Please fill the inputs." });

    //validating the email
    if (!validateEmail(email))
      return res
        .status(403)
        .json({ error: "Please enter the correct email format" });

    //finding the user and validating the user
    const user = await User.findOne({ email });

    if (!user)
      return res.status(400).json({ success: false, error: "User not found" });

    //working on the password
    const correctPassword = await comparePassword(user.password, password);

    if (!correctPassword)
      return res.status(403).json({ error: "Enter the correct password" });

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
        email: user.email,
        username: user.username,
      },
      process.env.SECRET_KEY,
      { expiresIn: "60m" }
    );

    res.cookie("token", token, { httpOnly: true, secure: false }).json({
      success: true,
      message: "Logged in success",
      user: {
        username: user.name,
        email: user.email,
        role: user.role,
        id: user._id,
      },
    });
  } catch (error) {
    console.log(`Error in the login controller ${error.message}`);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export default login;
