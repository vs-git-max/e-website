import Product from "../../models/product.model.js";

const fetchAllProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.json({
      data: products,
      success: true,
    });
  } catch (error) {
    res.json({
      success: false,
      message: "Some error occurred",
    });
  }
};

export default fetchAllProducts;
