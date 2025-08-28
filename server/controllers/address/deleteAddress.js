const deleteAddress = async (req, res) => {
  try {
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting address",
    });
    console.log(error.message);
  }
};

export default deleteAddress;
