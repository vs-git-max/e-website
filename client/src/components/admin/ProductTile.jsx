import React from "react";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/button";

const ProductTile = ({
  product,
  setFormData,
  handleDelete,
  setCurrentEditedId,
  setOpenCreateProductsDialog,
}) => {
  return (
    <Card className="w-full max-w-sm mx-auto">
      <div className="">
        <div className="relative">
          <img
            className="w-full h-[300px] object-cover rounded-t-lg"
            src={product.image}
            alt={product?.title}
          />
        </div>
        <CardContent>
          <h2 className="text-xl font-bold mb-2 mt-2">{product?.title}</h2>
          <div className="flex justify-between items-center mb-2">
            <span
              className={`${
                product?.salesPrice > 0 ? "line-through" : ""
              } text-lg font-semibold text-primary`}
            >
              ${product?.price}
            </span>
            {product?.salesPrice > 0 && (
              <span className="text-lg font-bold">${product?.salesPrice}</span>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between items-center mb-2">
          <Button
            onClick={() => {
              setOpenCreateProductsDialog(true);
              setCurrentEditedId(product?._id);
              setFormData(product);
            }}
          >
            Edit
          </Button>
          <Button onClick={() => handleDelete(product?._id)}>Delete</Button>
        </CardFooter>
      </div>
    </Card>
  );
};

export default ProductTile;
