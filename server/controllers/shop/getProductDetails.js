import Product from "../../models/product.model.js";

const getProductDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);

    if (!product) {
      return res
        .json({
          message: "Product not found",
          success: false,
        })
        .status(404);
    }

    res.status(200).json({
      success: true,
      message: "Product found",
      data: product,
    });
  } catch (error) {
    console.log(error);

    res.json({
      success: false,
      message: "Error finding the product",
    });
  }
};

export default getProductDetails;
