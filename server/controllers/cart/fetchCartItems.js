import Cart from "../../models/cart";

const fetchCartItems = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId)
      return res
        .status(404)
        .json({ success: false, message: "User id needed" });
    const cart = await Cart.findOne({ userId }).populate({
      path: "item.productId",
      select: "image title price salePrice",
    });

    if (!cart)
      return res
        .status(404)
        .json({ success: false, message: "Cart not found" });

    const validItems = cart.items.filter(
      (productItem) => productItem.productId
    );

    if (validItems.length <= cart.items.length) {
      cart.items = validItems;

      await cart.save();
    }

    const populateCartItems = validItems.map((item) => ({
      productId: item.productId._id,
      image: item.productId.image,
      title: item.productId.title,
      price: item.productId.price,
      salePrice: item.productId.salePrice,
      quantity: item.productId.quantity,
    }));

    res.status(200).json({
      success: true,
      data: {
        ...cart._doc,
        items: populateCartItems,
      },
    });
  } catch (error) {
    console.log(`Error in the fetch cart items controller ${error.message}`);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};

export default fetchCartItems;
