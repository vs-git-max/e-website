import React from "react";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

const ShoppingProductTile = ({ productItem }) => {
  return (
    <Card className="w-full max-w-sm mx-auto">
      <div>
        <div className="relative">
          <img
            src={productItem.image}
            alt={productItem.title}
            className="w-full h-[300px] object-cover rounded-t-lg"
          />
          {productItem?.saleprice > 0 ? (
            <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
              Sale
            </Badge>
          ) : null}
        </div>
        <CardContent className="p-4">
          <h2 className="font-bold mb-2 text-xl">{productItem.title}</h2>
          <div className="flex justify-between items-center mb-2">
            <span className=" text-[16px] text-muted-foreground">
              {productItem.category}
            </span>
            <span className=" text-[16px] text-muted-foreground">
              {productItem.brand}
            </span>
          </div>
          <div className="flex justify-between items-center mb-2">
            <span
              className={` ${
                productItem.price > 0 ? "line-through" : ""
              } text-lg font-semibold text-primary`}>
              {productItem.price}
            </span>
            {productItem.salePrice > 0 ? (
              <span className=" text-lg font-semibold text-primary">
                {productItem.brand}
              </span>
            ) : null}
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full">Add to Cart</Button>
        </CardFooter>
      </div>
    </Card>
  );
};

export default ShoppingProductTile;
