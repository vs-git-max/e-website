import React from "react";
import { Button } from "../ui/button";
import { Minus, Plus, Trash } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCartProduct,
  updateCartProduct,
} from "@/store/cart-slice/cart-slice";

const CartsItemsContent = ({ cartItem }) => {
  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const handleCartItemDelete = (getCartItem) => {
    dispatch(
      deleteCartProduct({ userId: user?.id, productId: getCartItem.productId })
    );
  };

  const handleUpdateCartQuantity = (getCartItem, operation) => {
    const updateQuantity =
      operation === "plus" ? getCartItem.quantity++ : getCartItem.quantity--;

    dispatch(
      updateCartProduct({
        userId: user?.id,
        productId: getCartItem?._id,
        quantity: updateQuantity,
      })
    );
  };

  return (
    <div className="flex items-center space-x-4">
      <img
        src={cartItem?.image}
        alt={cartItem?.title}
        className="size-20 object-cover rounded"
      />
      <div className="flex-1">
        <h3 className="font-extrabold ">{cartItem?.title}</h3>
        <div className="flex items-center mt-1 gap-2">
          <Button
            disabled={cartItem?.quantity === 1}
            variant="outline"
            size="icon"
            className="size-8 rounded-full"
            onClick={() => handleUpdateCartQuantity(cartItem, "minus")}>
            <Minus className="size-4" />
            <span className="sr-only">Decrease</span>
          </Button>
          <span className="font-semibold">{cartItem?.quantity}</span>
          <Button
            variant="outline"
            size="icon"
            className="size-8 rounded-full"
            onClick={() => handleUpdateCartQuantity(cartItem, "plus")}>
            <Plus className="size-4" />
            <span className="sr-only">Increase</span>
          </Button>
        </div>
      </div>
      <div className="flex flex-col items-end">
        <p className="font-semibold">
          $
          {(
            (cartItem?.salePrice > 0 ? cartItem?.salePrice : cartItem?.price) *
            cartItem?.quantity
          ).toFixed(2)}
        </p>
        <Trash
          className="cursor-pointer"
          size="20"
          onClick={() => handleCartItemDelete(cartItem)}
        />
      </div>
    </div>
  );
};

export default CartsItemsContent;
