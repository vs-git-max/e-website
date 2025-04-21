import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token)
    return res.status(401).json({
      success: false,
      error: "Unauthorized user",
    });

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    req.user = decoded;

    next();
  } catch (error) {
    console.log(`Error in the auth middleware ${error.message}`);
    res.status(401).json({
      success: false,
      error: "Internal server error",
    });
  }
};

export default authMiddleware;
