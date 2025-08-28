import Address from "../../models/address.model.js";

const deleteAddress = async (req, res) => {
  try {
    const { userId, addressId } = req.params;

    if ([userId, addressId].some((item) => !item)) {
      return res
        .json({
          success: false,
          message: "Add all the fields.",
        })
        .status(404);
    }

    const address = await Address.findOneAndDelete({
      _id: addressId,
      userId,
    });

    if (!address) {
      return res.status(404).json({
        success: false,
        message: "Address not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Address deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting address",
    });
    console.log(error.message);
  }
};

export default deleteAddress;
