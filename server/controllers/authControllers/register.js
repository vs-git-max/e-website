import User from "../../models/user.model.js";
import { hashPassword } from "../../utils/password.js";
import { validateEmail } from "../../utils/email.js";

const register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    //checking if user add all the fields
    if ([username, email, password].some((item) => !item || item.trim() === ""))
      return res
        .status(403)
        .json({ success: false, error: "Please add all the inputs" });

    //checking if the user already exists
    const checkUser = await User.findOne({ email });
    if (checkUser)
      return res.status(400).json({ message: "User already exist" });

    //working on the password
    if (password.length < 6)
      return res
        .status(400)
        .json({ error: "Password length should be greater than 6" });
    const hashedPassword = await hashPassword(password, 12);

    //working on the email
    const validatedEmail = await validateEmail(email);
    if (!validatedEmail)
      return res.status(400).json({ error: "Add correct email format." });

    //creating the new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    res
      .status(200)
      .json({ success: true, message: "User created successfully" });
  } catch (error) {
    console.log(`Error in the register controller ${error.message}`);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export default register;
