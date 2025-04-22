import Product from "../../models/product.js";

const addNewProducts = async (req, res) => {
  try {
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

    if (
      [
        title,
        image,
        description,
        category,
        price,
        brand,
        salePrice,
        totalStock,
      ].every((item) => !item || item.trim() === "")
    )
      return res.status(402).json({ message: "Please fill all the spaces" });

    const newProduct = new Product({
      title,
      image,
      description,
      category,
      price,
      brand,
      salePrice,
      totalStock,
    });

    await newProduct.save();

    res.status(201).json({ success: true, data: newProduct });
  } catch (error) {
    console.log(`Error in the addProducts ${error.message}`);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export default addNewProducts;
