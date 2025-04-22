import Product from "../../models/product.js";

const fetchAllProducts = async (req, res) => {
  try {
    const listOfProducts = await Product.find({});

    res.status(201).json({
      success: true,
      data: listOfProducts,
    });
  } catch (error) {
    console.log(`Error in the fetchProducts ${error.message}`);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export default fetchAllProducts;
