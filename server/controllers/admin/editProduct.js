import Product from "../../models/product.model.js";

const editProduct = async (req, res) => {
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

    const { id } = req.params;

    let isProduct = await Product.findById(id);

    if (!isProduct)
      return res.json({
        success: true,
        message: "Product not found",
      });

    (isProduct.image = image || isProduct.image),
      (isProduct.title = title || isProduct.title),
      (isProduct.brand = brand || isProduct.brand),
      (isProduct.salesPrice = salesPrice === "" ? 0 : salesPrice),
      (isProduct.price = price === "" ? 0 : price),
      (isProduct.totalStock = totalStock || isProduct.totalStock),
      (isProduct.category = category || isProduct.category),
      (isProduct.description = description || isProduct.description),
      await isProduct.save();

    res.status(200).json({
      success: true,
      message: "Product edited",
      data: isProduct,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Some error occurred",
    });
  }
};

export default editProduct;
