import Product from "../../models/product.js";

const deleteProducts = async (req, res) => {
  try {
    const productId = req.params;

    const product = await Product.findByIdAndDelete(productId);

    if (!product)
      res.status(401).json({
        success: false,
        message: "Product not found",
      });

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.log(`Error in the deleteProducts ${error.message}`);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export default deleteProducts;
