import { hashingPassword } from "../../helpers/password.js";
import User from "../../models/user.model.js";

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const user = await User.findOne({ email });

    if (user)
      return res.json({
        success: false,
        message: "User already exist with the email",
      });

    const hashedPassword = await hashingPassword(password, 12);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(200).json({
      success: true,
      message: "New user created.",
    });
  } catch (error) {
    console.log(`Error in the register controller ${error.message}}`);
    res
      .json({
        success: false,
        error: error.message,
      })
      .status(500);
  }
};

export default register;
