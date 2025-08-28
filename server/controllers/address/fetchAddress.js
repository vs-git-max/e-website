import Address from "../../models/address.model.js";

const fetchAddress = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId)
      return res
        .json({ success: false, message: "User id required" })
        .status(400);

    const address = await Address.find({ userId });

    res.status(200).json({
      success: true,
      message: "Address found",
      data: address,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching address",
    });
    console.log(error.message);
  }
};

export default fetchAddress;
