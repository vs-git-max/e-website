const logout = (req, res) => {
  res.clearCookie("token").json({
    message: "Logout success",
    success: true,
  });
};

export default logout;
