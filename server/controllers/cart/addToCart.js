import Product from "../../models/product";
import Cart from "../../models/cart.js";

const addToCart = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    if ([userId, productId].some(item > !item) && quantity <= 0)
      return res
        .status(400)
        .json({ success: false, message: "Invalid data provided" });

    const product = await Product.findById(productId);
    if (!product)
      return res
        .status(404)
        .json({ success: false, message: "Product not found." });

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }

    const findCurrentProductsIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (findCurrentProductsIndex === -1) {
      cart.items.push({ productId, quantity });
    } else {
      cart.items[findCurrentProductsIndex].quantity += quantity;
    }

    await cart.save();

    res.status(200).json({ success: true, data: cart });
  } catch (error) {
    console.log(`Error in the add to cart controller ${error.message}`);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};

export default addToCart;
