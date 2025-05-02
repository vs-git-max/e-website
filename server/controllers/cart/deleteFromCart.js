import Cart from "../../models/cart";

const deleteCartItems = async (req, res) => {
  try {
    const { userId, productId } = req.params;

    if ([userId, productId].some((item) => !item))
      return res
        .status(400)
        .json({ success: false, message: "Invalid inputs" });

    const cart = await Cart.findOne({ userId }).populate({
      path: "items.productId",
      select: "image price salePrice title ",
    });

    if (!cart)
      return res
        .status(400)
        .json({ sucess: false, messsage: "Cart not found" });

    cart.items.filter((item) => item.productId._id.toString() !== productId);

    await cart.save();

    const populateCartItems = cart.items.map((item) => ({
      productId: item.productId ? item.productId._id : null,
      image: item.productId ? item.productId.image : null,
      title: item.productId ? item.productId.title : "Product not available",
      price: item.productId ? item.productId.price : null,
      salePrice: item.productId ? item.productId.salePrice : null,
      quantity: item.quantity,
    }));

    res.status(200).json({
      sucess: true,
      data: {
        ...cart._doc,
        items: populateCartItems,
      },
    });
  } catch (error) {
    console.log(`Error in the delete cart items controller ${error.message}`);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};

export default deleteCartItems;
