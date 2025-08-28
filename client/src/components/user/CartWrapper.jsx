import React from "react";
import { SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import { Button } from "../ui/button";
import CartItem from "./CartItem";

const CartWrapper = ({ cartItems }) => {
  const total =
    Array.isArray(cartItems?.items) && cartItems?.items.length > 0
      ? cartItems.items
          .reduce(
            (sum, currentItem) =>
              sum +
              (currentItem.salesPrice > 0
                ? currentItem?.salesPrice
                : currentItem?.price) *
                currentItem?.quantity,
            0
          )
          .toFixed(2)
      : 0;

  return (
    <SheetContent className="sm:max-w-md">
      <SheetHeader>
        <SheetTitle>Your Cart</SheetTitle>
      </SheetHeader>
      <div className="mt-8 space-y-4 overflow-auto">
        {Array.isArray(cartItems?.items) &&
        cartItems?.items &&
        cartItems?.items?.length > 0
          ? cartItems?.items?.map((cartItem) => (
              <CartItem key={cartItem?.id} cartItem={cartItem} />
            ))
          : null}
      </div>
      <div className="mt-8 space-y-4 ">
        <div className="flex justify-between">
          <span className="font-bold">Total</span>
          <span className="font-bold">${total}</span>
        </div>
      </div>
      <Button className="mt-6 w-full">Check Out</Button>
    </SheetContent>
  );
};

export default CartWrapper;
