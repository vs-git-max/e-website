const addAddress = async (req, res) => {
  try {
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error adding address",
    });
    console.log(error.message);
  }
};

export default addAddress;
