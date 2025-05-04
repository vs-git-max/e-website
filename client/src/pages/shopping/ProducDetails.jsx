import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { addToCart, fetchCartItems } from "@/store/cart-slice/cart-slice";
import { setProductDetails } from "@/store/shop/shop-slice";
import { StarIcon } from "lucide-react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

const ProductDetails = ({ open, setOpen, productDetails }) => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  //handling the add to cart functionality
  const handleAddToCart = (getProductId) => {
    dispatch(
      addToCart({
        userId: user?.id,
        productId: getProductId,
        quantity: 1,
      }).then((data) => {
        if (data?.payload?.success) {
          dispatch(fetchCartItems(user?.id));
        }
      })
    );
  };

  const handleDialogClose = () => {
    setOpen(false);
    dispatch(setProductDetails());
  };

  return (
    <Dialog open={open} onOpenChange={handleDialogClose()}>
      <DialogContent className="grid grid-cols-2 gap-8 sm:p-12 max-w-[90vw] sm:max-w-[80vw] lg:max-w-[70vw]">
        <div className="relative overflow-hidden rounded-lg">
          <img
            src={productDetails?.image}
            alt={productDetails?.title}
            className="aspect-square w-full object-cover"
            size="600"
          />
        </div>
        <div className="">
          <div>
            <h1 className="text-3xl font-extrabold">{productDetails?.title}</h1>
            <p className="text-muted-foreground text-2xl">
              {productDetails?.description}
            </p>
          </div>
          <div className="flex items-center justify-between mt-4 mb-5">
            <p
              className={`text-3xl font-bold text-primary ${
                productDetails.salePrice > 0 ? "line-through" : ""
              }`}>
              {productDetails?.price}
            </p>
            {productDetails?.salePrice > 0 ? (
              <p className="text-2xl font-bold text-muted-foreground">
                {productDetails.salePrice}
              </p>
            ) : null}
          </div>
          <div className="flex items-center justify-between mt-2">
            <StarIcon className="size-5 fill-primary" />
            <StarIcon className="size-5 fill-primary" />
            <StarIcon className="size-5 fill-primary" />
            <StarIcon className="size-5 fill-primary" />
            <StarIcon className="size-5 fill-primary" />
            <StarIcon className="size-5 fill-primary" />
          </div>
          <span className="text-muted-foreground">(4.5)</span>
          <div className="mt-5 mb-5">
            <Button
              className="w-full"
              onClick={() => handleAddToCart(productDetails?._id)}>
              Add to Cart
            </Button>
          </div>
          <Separator />
          <div className="max-h-[300px] overflow-auto">
            <h2 className="text-xl font-bold mb-4">Reviews</h2>
            <div className="flex gap-6">
              <Avatar className="size-10 border">
                <AvatarFallback>SM</AvatarFallback>
              </Avatar>
              <div className="grid gap-2">
                <div className="flex items-center gap-2">
                  <h3 className="font-bold">Sam Chris</h3>
                </div>
                <div className="flex items-center gap-0.5">
                  <StarIcon className="size-5 fill-primary" />
                  <StarIcon className="size-5 fill-primary" />
                  <StarIcon className="size-5 fill-primary" />
                  <StarIcon className="size-5 fill-primary" />
                  <StarIcon className="size-5 fill-primary" />
                  <StarIcon className="size-5 fill-primary" />
                </div>
                <p className="text-muted-foreground">
                  This is a wonderfilled product. Blessed to have bought it.
                </p>
              </div>
            </div>
            <div className="mt-6 flex gap-2">
              <Input placeholder="Add some reviews..." />
              <Button>Submit</Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductDetails;
