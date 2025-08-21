const logout = async (req, res) => {
  try {
    res.clearCookie("token").json({
      success: true,
      message: "User logged out successfully",
    });
  } catch (error) {
    console.log(error);
  }
};

export default logout;
