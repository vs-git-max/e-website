import Product from "../../models/product";

const getProductsDetails = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);

    if (!product)
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });

    res.status(200).json({ success: true, data: product });
  } catch (error) {
    console.log(`Error in the getProductsDetails controller ${error.message}`);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};

export default getProductsDetails;
