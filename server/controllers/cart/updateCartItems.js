import Cart from "../../models/cart";

const updateCartItems = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    if ([userId, productId].some((item) => !item) && quantity <= 0)
      return res.status(403).json({
        success: false,
        message: "Provide valid data.",
      });

    const cart = await Cart.findOne({ userId });

    if (!cart)
      return res
        .status(400)
        .json({ success: false, message: "Cart not found" });

    const currentProductIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (currentProductIndex === -1) {
      return res.status(404).json({
        success: false,
        message: "Product not available in the cart",
      });
    }

    cart.items[currentProductIndex].quantity = quantity;

    await cart.save();

    await cart.populate({
      path: "items.productId",
      select: "image title price salePrice",
    });

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
    console.log(`Error in the update  cart  items controller ${error.message}`);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};

export default updateCartItems;
