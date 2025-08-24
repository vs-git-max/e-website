import Cart from "../../models/cart.model.js";

const fetchCartItems = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    const cart = await Cart.findOne({ userId }).populate({
      path: "items.productId",
      select: "image title price salesPrice",
    });

    if (!cart) {
      return res.json({
        success: false,
        message: "Cart not found",
      });
    }

    const validItems = cart.items.filter(
      (productItem) => productItem.productId
    );

    if (validItems.length < cart.items.length) {
      cart.items = validItems;

      await cart.save();
    }

    const populateCartItems = validItems.map((item) => ({
      productId: item.productId._id,
      title: item.productId.title,
      image: item.productId.image,
      price: item.productId.price,
      salesPrice: item.productId.salesPrice,
      quantity: item.quantity,
    }));

    return res.status(200).json({
      success: true,
      message: "Cart fetch success",
      data: {
        ...cart._doc,
        items: populateCartItems,
      },
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Error fetching cart items",
    });
  }
};

export default fetchCartItems;
