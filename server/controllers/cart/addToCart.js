import Product from "../../models/product.model.js";
import Cart from "../../models/cart.model.js";

const addToCart = async (req, res) => {
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

    const product = await Product.findById(productId);

    if (!product)
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });

    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }

    const findCurrentProductIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (findCurrentProductIndex === -1) {
      cart.items.push({ productId, quantity });
    } else {
      cart.items[findCurrentProductIndex].quantity += quantity;
    }

    await cart.save();
    res.status(200).json({
      success: true,
      message: "Added to cart",
      data: cart,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Error adding to cart",
    });
  }
};

export default addToCart;
