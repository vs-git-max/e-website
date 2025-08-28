import React, { useEffect, useState } from "react";
import banner1 from "../../assets/banner-1.webp";
import banner2 from "../../assets/banner-2.webp";
import banner3 from "../../assets/banner-3.webp";
import { Button } from "@/components/ui/button";
import {
  BabyIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CloudLightning,
  GiftIcon,
  HandMetal,
  LeafIcon,
  Loader2,
  NfcIcon,
  ShirtIcon,
  UmbrellaIcon,
  WatchIcon,
  ZapIcon,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllUserProducts,
  fetchProductDetails,
} from "@/store/shop/shop.slice";
import ShoppingProductTile from "@/components/user/ProductTile";
import { useNavigate } from "react-router-dom";
import { addToCart, fetchCartItems } from "@/store/cart/cart.slice";
import { toast } from "sonner";
import ProductDetails from "@/components/user/ProductDetails";

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const { shopProductList, productDetails } = useSelector(
    (state) => state.userProducts
  );
  const slides = [banner1, banner2, banner3];
  const { user } = useSelector((state) => state.auth);

  const brandWithIcons = [
    { id: "nike", label: "Nike", icon: NfcIcon },
    { id: "adidas", label: "Adidas", icon: Loader2 },
    { id: "puma", label: "Puma", icon: GiftIcon },
    { id: "levi", label: "Levi's", icon: LeafIcon },
    { id: "zara", label: "Zara", icon: ZapIcon },
    { id: "h&m", label: "H&M", icon: HandMetal },
  ];
  const categoriesWithIcon = [
    { id: "men", label: "Men", icon: ShirtIcon },
    { id: "women", label: "Women", icon: CloudLightning },
    { id: "kids", label: "Kids", icon: BabyIcon },
    { id: "accessories", label: "Accessories", icon: WatchIcon },
    { id: "footwear", label: "Footwear", icon: UmbrellaIcon },
  ];

  const handleNavigateToListingPage = (getCurrentItemId, section) => {
    sessionStorage.removeItem("filters");
    const currentFilters = {
      [section]: [getCurrentItemId],
    };

    sessionStorage.setItem("filters", JSON.stringify(currentFilters));
    navigate("/shop/listing");
  };

  const handleGetProductDetails = (getCurrentProductId) => {
    dispatch(fetchProductDetails(getCurrentProductId));
  };

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

  useEffect(() => {
    if (productDetails !== null) setOpenDetailsDialog(true);
  }, [productDetails]);

  useEffect(() => {
    const timer = setInterval(
      () => setCurrentSlide((prev) => (prev + 1) % slides.length),
      10000
    );

    return () => clearInterval(timer);
  }, [slides.length]);

  useEffect(() => {
    dispatch(
      fetchAllUserProducts({ filterParams: {}, sortParams: "price-lowtohigh" })
    );
  }, [dispatch]);

  return (
    <div className="flex flex-col min-h-screen">
      <div className="relative w-full h-[600px] overflow-hidden">
        {slides.map((item, index) => (
          <img
            src={item}
            key={index}
            className={`top-0 absolute left-0 w-full h-full object-cover transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
        <Button
          className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/80"
          variant="outline"
          size="icon"
          onClick={() =>
            setCurrentSlide(
              (prev) => (prev - 1 + slides.length) % slides.length
            )
          }
        >
          <ChevronLeftIcon className="size-4" />
        </Button>
        <Button
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/80"
          variant="outline"
          size="icon"
          onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
        >
          <ChevronRightIcon className="size-4" />
        </Button>
      </div>
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">
            Shop By Category
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {categoriesWithIcon.map((item) => (
              <Card
                onClick={() => handleNavigateToListingPage(item.id, "category")}
                key={item.label}
                className="cursor-pointer transition-shadow hover:shadow-lg "
              >
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <item.icon className="size-12 text-primary" />
                  <span className="font-bold">{item.label}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Shop By Brand</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {brandWithIcons.map((item) => (
              <Card
                onClick={() => handleNavigateToListingPage(item.id, "brand")}
                key={item.label}
                className="cursor-pointer transition-shadow hover:shadow-lg "
              >
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <item.icon className="size-12 text-primary" />
                  <span className="font-bold">{item.label}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      <section className="py-12 ">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">
            Feature Products
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {shopProductList && shopProductList.length > 0
              ? shopProductList.map((product, index) => (
                  <ShoppingProductTile
                    handleGetProductDetails={handleGetProductDetails}
                    key={index}
                    product={product}
                    handleAddToCart={handleAddToCart}
                  />
                ))
              : null}
          </div>
        </div>
      </section>
      <ProductDetails
        open={openDetailsDialog}
        setOpen={setOpenDetailsDialog}
        productDetails={productDetails}
      />
    </div>
  );
};

export default Home;
