import React from "react";
import { Dialog, DialogContent } from "../ui/dialog";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { StarIcon } from "lucide-react";
import { Input } from "../ui/input";
import { addToCart, fetchCartItems } from "@/store/cart/cart.slice";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setProductsDetails } from "@/store/shop/shop.slice";

const ProductDetails = ({ open, setOpen, productDetails }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const handleAddToCart = (getProductId) => {
    dispatch(
      addToCart({ userId: user?.id, productId: getProductId, quantity: 1 })
    ).then((data) => {
      if (data?.payload?.success) {
        toast.success("Product added to cart");
        dispatch(fetchCartItems({ userId: user?.id }));
      }
    });
  };

  const handleDialogClose = () => {
    setProductsDetails();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleDialogClose}>
      <DialogContent className="grid grid-cols-2 gap-8 sm:p-12 max-w-[90vw] sm:max-w-[80vw] lg:max-w-[70vw]">
        <div className="relative overflow-hidden rounded-lg">
          <img
            src={productDetails?.image}
            alt={productDetails?.title}
            width={600}
            height={600}
            className="w-full object-cover aspect-square"
          />
        </div>
        <div className=" ">
          <div className="">
            <h1 className="text-3xl font-bold">{productDetails?.title}</h1>
            <p className="text-muted-foreground text-2xl mt-5 mb-4">
              {productDetails?.description}
            </p>
          </div>
          <div className="flex items-center justify-between">
            <p
              className={` ${
                productDetails?.salesPrice > 0 ? "line-through" : ""
              }  text-2xl font-bold text-primary`}
            >
              {productDetails?.price}
            </p>
            {productDetails?.salesPrice > 0 && (
              <p className="text-2xl font-bold text-muted-foreground">
                {productDetails?.salesPrice}
              </p>
            )}
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-0.5">
              <StarIcon className="size-5 fill-primary" />
              <StarIcon className="size-5 fill-primary" />
              <StarIcon className="size-5 fill-primary" />
              <StarIcon className="size-5 fill-primary" />
              <StarIcon className="size-5 fill-primary" />
            </div>
            <span className="text-muted-foreground font-medium">4.5</span>
          </div>
          <div className="mt-5 mb-5">
            <Button
              className="mt-5 w-full"
              onClick={() => handleAddToCart(productDetails?._id)}
            >
              Add to Cart
            </Button>
          </div>
          <Separator />
          <div className="max-h-[300px] overflow-auto">
            <h2 className="text-xl font-bold">Reviews</h2>
            <div className="grid gap-6">
              <div className="flex gap-4">
                <Avatar className="size-10 border">
                  <AvatarFallback>SM</AvatarFallback>
                </Avatar>
                <div className="grid gap-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold">Sam Chris</h3>
                  </div>
                  <div className="flex items-center gap-0.5">
                    <StarIcon className="size-5 fill-primary" />
                    <StarIcon className="size-5 fill-primary" />
                    <StarIcon className="size-5 fill-primary" />
                    <StarIcon className="size-5 fill-primary" />
                    <StarIcon className="size-5 fill-primary" />
                  </div>
                  <p className=" text-muted-foreground">
                    This is an awesome product
                  </p>
                </div>
              </div>
            </div>
            <div className="grid gap-6">
              <div className="flex gap-4">
                <Avatar className="size-10 border">
                  <AvatarFallback>SM</AvatarFallback>
                </Avatar>
                <div className="grid gap-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold">Sam Chris</h3>
                  </div>
                  <div className="flex items-center gap-0.5">
                    <StarIcon className="size-5 fill-primary" />
                    <StarIcon className="size-5 fill-primary" />
                    <StarIcon className="size-5 fill-primary" />
                    <StarIcon className="size-5 fill-primary" />
                    <StarIcon className="size-5 fill-primary" />
                  </div>
                  <p className=" text-muted-foreground">
                    This is an awesome product
                  </p>
                </div>
              </div>
            </div>
            <div className="grid gap-6">
              <div className="flex gap-4">
                <Avatar className="size-10 border">
                  <AvatarFallback>SM</AvatarFallback>
                </Avatar>
                <div className="grid gap-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold">Sam Chris</h3>
                  </div>
                  <div className="flex items-center gap-0.5">
                    <StarIcon className="size-5 fill-primary" />
                    <StarIcon className="size-5 fill-primary" />
                    <StarIcon className="size-5 fill-primary" />
                    <StarIcon className="size-5 fill-primary" />
                    <StarIcon className="size-5 fill-primary" />
                  </div>
                  <p className=" text-muted-foreground">
                    This is an awesome product
                  </p>
                </div>
              </div>
            </div>
            <div className="grid gap-6">
              <div className="flex gap-4">
                <Avatar className="size-10 border">
                  <AvatarFallback>SM</AvatarFallback>
                </Avatar>
                <div className="grid gap-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold">Sam Chris</h3>
                  </div>
                  <div className="flex items-center gap-0.5">
                    <StarIcon className="size-5 fill-primary" />
                    <StarIcon className="size-5 fill-primary" />
                    <StarIcon className="size-5 fill-primary" />
                    <StarIcon className="size-5 fill-primary" />
                    <StarIcon className="size-5 fill-primary" />
                  </div>
                  <p className=" text-muted-foreground">
                    This is an awesome product
                  </p>
                </div>
              </div>
            </div>
            <div className="flex gap-2 mt-6">
              <Input placeholder="Write a review..." />
              <Button>Submit</Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductDetails;
