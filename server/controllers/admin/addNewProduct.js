import Product from "../../models/product.model.js";

const addNewProduct = async (req, res) => {
  try {
    const {
      image,
      title,
      brand,
      salesPrice,
      price,
      totalStock,
      category,
      description,
    } = req.body;

    const newProduct = new Product({
      image,
      title,
      brand,
      salesPrice,
      price,
      totalStock,
      category,
      description,
    });

    await newProduct.save();

    res.status(201).json({
      success: true,
      data: newProduct,
    });
  } catch (error) {
    res.json({
      success: false,
      message: "Some error occurred",
    });
  }
};

export default addNewProduct;
