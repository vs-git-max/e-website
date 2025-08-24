import Cart from "../../models/cart.model.js";

const updateCartItems = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    if (!userId || !productId || quantity <= 0) {
      return res
        .json({
          success: false,
          message: "Add all fields",
        })
        .status(400);
    }

    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.json({
        success: false,
        message: "Cart not found",
      });
    }

    const findCurrentProductIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (findCurrentProductIndex === -1) {
      res.status(404).json({
        success: false,
        message: "Item not found",
      });
    }

    cart.items[findCurrentProductIndex].quantity = quantity;
    await cart.save();
    await cart.populate({
      path: "items.productId",
      select: "image price salesPrice quantity title",
    });

    const populateCartItems = cart.items.map((item) => ({
      productId: item.productId ? item.productId._id : null,
      title: item.productId ? item.productId.title : null,
      image: item.productId ? item.productId.image : null,
      price: item.productId ? item.productId.price : null,
      salesPrice: item.productId ? item.productId.salesPrice : null,
      quantity: item.quantity,
    }));

    return res.status(200).json({
      success: true,
      message: "Cart update success",
      data: {
        ...cart._doc,
        items: populateCartItems,
      },
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Error updating cart items",
    });
  }
};

export default updateCartItems;
