import Product from "../../models/product.js";

const editProducts = async (req, res) => {
  try {
    const productId = req.params;

    const {
      title,
      image,
      description,
      category,
      price,
      brand,
      salePrice,
      totalStock,
    } = req.body;

    const product = await Product.findById(productId);

    if (!product)
      res.status(403).json({
        success: false,
        message: "Product not found",
      });

    product.title = title || product.title;
    product.description = description || product.description;
    product.category = category || product.category;
    product.price = price || product.price;
    product.brand = brand || product.brand;
    product.salePrice = salePrice || product.salePrice;
    product.totalStock = totalStock || product.totalStock;
    product.image = image || product.image;

    await product.save();

    res.status(200).json({
      success: true,
      message: "Product updated",
      data: product,
    });
  } catch (error) {
    console.log(`Error in the editProducts ${error.message}`);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export default editProducts;
