import Cart from "../../models/cart.model.js";

const deleteCartItem = async (req, res) => {
  try {
    const { userId, productId } = req.params;

    if (!userId || !productId) {
      return res
        .json({
          success: false,
          message: "Add all fields",
        })
        .status(400);
    }
    console.log(productId, "product id");

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

    cart.items = cart.items.filter(
      (item) => item.productId?._id.toString() !== productId
    );

    await cart.save();

    await cart.populate({
      path: "items.productId",
      select: "image title price salesPrice",
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
    console.log(error.message);
    res.json({
      success: false,
      message: "Error deleting cart item",
    });
  }
};

export default deleteCartItem;
