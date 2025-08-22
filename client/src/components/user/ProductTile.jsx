import React from "react";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { brandOptionsMap, categoryOptionsMap } from "@/config";

const ShoppingProductTile = ({ product, handleGetProductDetails }) => {
  return (
    <Card className="w-full max-w-sm mx-auto">
      <div className="" onClick={() => handleGetProductDetails(product?._id)}>
        <div className="relative">
          <img
            src={product?.image}
            alt={product?.title}
            className="w-full h-[300px] object-cover rounded-t-lg"
          />
          {product?.salesPrice > 0 ? (
            <Badge className="absolute top-2 left-2 bg-red-700 hover:bg-red-800 font-bold tracking-wide">
              Sale
            </Badge>
          ) : null}
        </div>
        <CardContent className="p-4">
          <h2 className="text-xl font-bold mb-2">{product?.title}</h2>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">
              {categoryOptionsMap[product?.category]}
            </span>
            <span className="text-sm text-muted-foreground">
              {brandOptionsMap[product?.brand]}
            </span>
          </div>
          <div className="flex items-center justify-between mb-2">
            <span
              className={` ${
                product?.salesPrice > 0 && "line-through"
              } text-lg font-semibold text-primary`}
            >
              ${product?.price}
            </span>
            {product.salesPrice > 0 && (
              <span className="text-lg font-semibold text-primary">
                ${product?.salesPrice}
              </span>
            )}
          </div>
        </CardContent>
      </div>
      <CardFooter>
        <Button className="w-full">Add to Cart</Button>
      </CardFooter>
    </Card>
  );
};

export default ShoppingProductTile;
