const editAddress = async (req, res) => {
  try {
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error editing address",
    });
    console.log(error.message);
  }
};

export default editAddress;
