import React from "react";
import { DialogContent } from "../ui/dialog";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";

const UserOrderDetails = () => {
  return (
    <DialogContent className="sm:max-w-[600px]">
      <div className="grid gap-6">
        <div className="grid gap-2">
          <div className="flex items-center justify-between mt-6">
            <p className="font-medium">Order Id</p>
            <Label>123456</Label>
          </div>
          <div className="flex items-center justify-between mt-2">
            <p className="font-medium">Order Date</p>
            <Label>Date</Label>
          </div>
          <div className="flex items-center justify-between mt-2">
            <p className="font-medium">Order Price</p>
            <Label>$1000</Label>
          </div>
          <div className="flex items-center justify-between mt-2">
            <p className="font-medium">Order Status</p>
            <Label>Progress</Label>
          </div>
        </div>
        <Separator />
        <div className="grid gap-4 ">
          <div className="grid gap-2">
            <div className="font-medium">Order details</div>
            <ul className="grid gap-3">
              <li className="flex items-center justify-between">
                <span>Product 1</span>
                <span>$1000</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <div className="font-medium">Shopping Info</div>
            <div className="grid gap-0.5 text-muted-foreground">
              <span className="">Sam Chris</span>
              <span className="">Address</span>
              <span className="">City</span>
              <span className="">Pincode</span>
              <span className="">Phone Number</span>
              <span className="">Notes</span>
            </div>
          </div>
        </div>
      </div>
    </DialogContent>
  );
};

export default UserOrderDetails;
