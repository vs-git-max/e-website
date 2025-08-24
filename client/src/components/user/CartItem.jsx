import React from "react";
import { Button } from "../ui/button";
import { Minus, Plus, Trash } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCartItem,
  fetchCartItems,
  updateCartItems,
} from "@/store/cart/cart.slice";
import { toast } from "sonner";

const CartItem = ({ cartItem }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const handleCartItemDelete = (getCartItem) => {
    console.log(getCartItem, "getting the cart item");
    dispatch(
      deleteCartItem({
        userId: user?.id,
        productId: getCartItem?.productId,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        toast.success("Item deleted from cart");
        dispatch(fetchCartItems({ userId: user?.id }));
      }
    });
  };

  const handleUpdateCartQuantity = (getCartItem, typeOfAction) => {
    const newCartQuantity =
      typeOfAction === "plus"
        ? getCartItem?.quantity + 1
        : getCartItem?.quantity - 1;

    dispatch(
      updateCartItems({
        userId: user?.id,
        productId: getCartItem?.productId,
        quantity: newCartQuantity,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        toast.success("ICart item updated");
      }
    });
  };

  return (
    <div className="flex items-center  space-x-4">
      <img
        src={cartItem?.image}
        alt={cartItem?.title}
        className="w-20 h-20 rounded object-cover"
      />

      <div className="flex-1">
        <h3 className="font-extrabold">{cartItem?.title}</h3>
        <div className="flex items-center mt-1 gap-2">
          <Button
            onClick={() => handleUpdateCartQuantity(cartItem, "minus")}
            variant="outline"
            size="icon"
            disabled={cartItem?.quantity === 1}
            className="w-8 h-8 rounded-full"
          >
            <Minus className="size-4" />
            <span className="sr-only">Decrease</span>
          </Button>
          <span className="font-semibold">{cartItem?.quantity} </span>
          <Button
            onClick={() => handleUpdateCartQuantity(cartItem, "plus")}
            variant="outline"
            size="icon"
            className="w-8 h-8 rounded-full"
          >
            <Plus className="size-4" />
            <span className="sr-only">Increase</span>
          </Button>
        </div>
      </div>
      <div className="flex flex-col items-end">
        <p className="font-semibold ">
          $
          {(
            (cartItem?.salesPrice > 0
              ? cartItem?.salesPrice
              : cartItem?.price) * cartItem?.quantity
          ).toFixed(2)}
        </p>
        <Trash
          onClick={() => handleCartItemDelete(cartItem)}
          className="cursor-pointer mt-1 size-5"
        />
      </div>
    </div>
  );
};

export default CartItem;
