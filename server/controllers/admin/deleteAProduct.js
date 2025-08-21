import Product from "../../models/product.model.js";

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findByIdAndDelete(id);

    if (!product)
      return res.json({
        success: false,
        message: "Products not found",
      });

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    res.json({
      success: false,
      message: "Some error occurred",
    });
  }
};

export default deleteProduct;
