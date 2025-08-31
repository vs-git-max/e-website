import Address from "../../models/address.model.js";

const addAddress = async (req, res) => {
  try {
    const { userId, address, city, pincode, phone, notes } = req.body;
    if (
      [userId, address, city, pincode, phone, notes].some(
        (item) => !item || item.length <= 0
      )
    ) {
      return res
        .status(400)
        .json({ success: false, message: "Enter all the input fields." });
    }

    console.log(userId);

    const newlyCreatedAddress = new Address({
      userId,
      address,
      city,
      pincode,
      phone,
      notes,
    });

    await newlyCreatedAddress.save();

    res.status(201).json({
      success: true,
      message: "Address created",
      data: newlyCreatedAddress,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error adding address",
    });
    console.log(error.message);
  }
};

export default addAddress;
