const login = async (req, res) => {
  const { email, password } = req.body;

  try {
  } catch (error) {
    console.log(`Error in the login controller ${error.message}`);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export default login;
