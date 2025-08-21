import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token)
    return res.json({
      success: false,
      message: "Token not found",
    });

  try {
    const decode = jwt.verify(token, process.env.JWT_TOKEN);
    req.user = decode;
    next();
  } catch (error) {
    console.log(error.message);

    res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};

export default authMiddleware;
