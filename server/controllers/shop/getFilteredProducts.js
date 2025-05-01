import Product from "../../models/product.js";

const getFilteredProducts = async (req, res) => {
  try {
    const products = await Product.find({});

    if (!products)
      return res.status(400).json({ message: "Products not found" });

    res.status(200).json({ success: true, data: products });
  } catch (error) {
    console.log(
      `Error in the get filtered products controller ${error.message}`
    );
    res.status(500).json({ sucess: false, error: "Internal server error" });
  }
};

export default getFilteredProducts;
