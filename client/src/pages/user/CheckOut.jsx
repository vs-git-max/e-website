import React from "react";

import img from "../../assets/account.jpg";
import AddressTab from "@/components/user/AddressTab";
import { useSelector } from "react-redux";
import CartItem from "@/components/user/CartItem";
import { Button } from "@/components/ui/button";

const CheckOut = () => {
  const { cartItems } = useSelector((state) => state.shoppingCart);

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
    <div className="flex flex-col">
      <div className="relative h-[300px] w-full overflow-hidden">
        <img
          src={img}
          alt="Image"
          className="h-full w-full object-cover object-center"
        />
      </div>
      <div className="grid grid-cols-1 gap-3 mt-5 p-5 sm:grid-cols-2 ">
        <AddressTab />
        <div className="flex flex-col gap-5">
          {cartItems.items && cartItems.items.length > 0
            ? cartItems.items.map((item) => (
                <CartItem key={item?.id} cartItem={item} />
              ))
            : null}
          <div className="mt-8 space-y-4 ">
            <div className="flex justify-between">
              <span className="font-bold">Total</span>
              <span className="font-bold">${total}</span>
            </div>
          </div>
          <div className="w-full mt-4">
            <Button className="w-full">Checkout With Paypal</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckOut;
