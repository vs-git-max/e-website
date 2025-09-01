import Address from "../../models/address.model.js";

const editAddress = async (req, res) => {
  try {
    const { userId, addressId } = req.params;
    const formData = req.body;

    if (!userId || !addressId) {
      return res.status(400).json({
        success: false,
        message: "User id and address id required",
      });
    }

    const address = await Address.findOneAndUpdate(
      {
        _id: addressId,
        userId,
      },
      formData,
      { new: true }
    );

    if (!address) {
      return res.status(404).json({
        success: false,
        message: "Address not found",
      });
    }

    res.status(201).json({
      success: true,
      message: "Address edited successfully",
      data: address,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error editing address",
    });
    console.log(error.message);
  }
};

export default editAddress;
