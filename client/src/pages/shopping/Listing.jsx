import React, { useEffect, useState } from "react";

import Filter from "./filter";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { sortOptions } from "@/config";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllFilteredProducts,
  fetchProductDetails,
} from "@/store/shop/shop-slice";
import ShoppingProductTile from "@/components/shopping-view/Product-Tile";
import { useSearchParams } from "react-router-dom";
import ProductDetails from "./ProducDetails";
import { addToCart, fetchCartItems } from "@/store/cart-slice/cart-slice";

const Listing = () => {
  const dispatch = useDispatch();
  const { productsList, productDetails } = useSelector(
    (state) => state.shopProducts
  );

  const { user } = useSelector((state) => state.auth);

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

  //fetching the list of products

  useEffect(() => {
    if (filter !== null && sort !== null)
      dispatch(
        fetchAllFilteredProducts({ filterParams: filter, sortParams: sort })
      );
  }, [dispatch, sort, filter]);

  //working on the filter functionality
  const [filter, setFilter] = useState({});
  const [sort, setSort] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();

  const createSearchParamsHelper = (filterParams) => {
    const queryParams = [];

    for (const [key, value] of Object.entries(filterParams)) {
      if (Array.isArray(value) && value.length > 0) {
        const paramValue = value.join(",");

        queryParams.push(`${key}=${encodeURIComponent(paramValue)}`);
      }
    }

    return queryParams.join("&");
  };

  const handleSort = (value) => {
    setSort(value);
  };

  const handleFilter = (getSectionId, getCurrentOption) => {
    let copyFilter = { ...filter };
    console.log(copyFilter);

    const indexOfCurrentSection = Object.keys(copyFilter).indexOf(getSectionId);

    if (indexOfCurrentSection === -1) {
      copyFilter = {
        ...copyFilter,
        [getSectionId]: [getCurrentOption],
      };
    } else {
      const indexOfCurrentOption =
        copyFilter[getSectionId].indexOf(getCurrentOption);
      if (indexOfCurrentOption === -1)
        copyFilter[getSectionId].push(getCurrentOption);
      else copyFilter[getSectionId].splice(indexOfCurrentOption, 1);
    }

    setFilter(copyFilter);
    sessionStorage.setItem("filters", JSON.stringify(copyFilter));
  };

  useEffect(() => {
    setSort("price-lowtohign");
    setFilter(JSON.parse(sessionStorage.getItem("filters")) || {});
  }, []);

  useEffect(() => {
    if (filter && Object.keys(filter).length > 0) {
      const createQueryString = createSearchParamsHelper(filter);
      setSearchParams(new URLSearchParams(createQueryString));
    }
  }, [filter, setSearchParams]);

  //handling the get product details

  const handleGetProductDetails = (getCurrentProductId) => {
    dispatch(fetchProductDetails(getCurrentProductId));
  };

  //working on the productDetails dialogue
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (productDetails !== null) setOpen(true);
  }, [productDetails]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-6 p-4 md:p-6">
      <Filter filter={filter} handleFilter={handleFilter} />
      <div className="bg-background w-full rounded-lg shadow-sm">
        <div className="flex items-center justify-between p-4">
          <h2 className="text-lg font-extrabold">All Products</h2>
          <div className="flex items-center gap-3">
            <span className="text-muted-foreground">
              {productsList?.length} Products
            </span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center justify-between">
                  <ArrowUpDown className="size-4" /> Sort by
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[200px]">
                <DropdownMenuRadioGroup value={sort} onValueChange={handleSort}>
                  {sortOptions.map((sortItem) => (
                    <DropdownMenuItem key={sortItem.id} value={sortItem.id}>
                      {sortItem.label}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  lg:grid-cols-4 gap-4 p-4">
          {productsList && productsList.length > 0
            ? productsList.map((productItem) => (
                <ShoppingProductTile
                  productItem={productItem}
                  handleGetProductDetails={handleGetProductDetails}
                  handleAddToCart={handleAddToCart}
                />
              ))
            : null}
        </div>
      </div>
      <ProductDetails
        open={open}
        setOpen={setOpen}
        productDetails={productDetails}
      />
    </div>
  );
};

export default Listing;
