const fetchAddress = async (req, res) => {
  try {
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching address",
    });
    console.log(error.message);
  }
};

export default fetchAddress;
