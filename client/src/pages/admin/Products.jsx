import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import React, { Fragment, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

import ImageUpload from "@/components/admin/ImageUpload";
import Form from "@/components/common/Form";
import { Sheet, SheetContent, SheetHeader } from "@/components/ui/sheet";
import { addProductFormFields } from "@/config";
import { fetchAllProducts } from "@/store/admin/productSlice/productSlice";
import ProductTile from "@/components/admin/ProductTile";

const initialFormData = {
  image: null,
  title: "",
  description: "",
  category: "",
  brand: "",
  price: "",
  salePrice: "",
  totalStock: "",
};

const Products = () => {
  const dispatch = useDispatch();
  const { productList } = useSelector((state) => state.adminProducts);

  const [openCreateProductsDialog, setOpenCreateProductsDialog] =
    useState(false);

  const [formData, setFormData] = useState(initialFormData);

  const [imageFile, setImageFile] = useState(null);

  const [uploadedImageUrl, setUploadedImageUrl] = useState("");

  const [imageLoadingState, setImageLoadingState] = useState(false);

  const onSubmit = (event) => {
    event.preventDefault();
    dispatch({
      ...formData,
      image: uploadedImageUrl,
    }).then((data) => {
      if (data?.payload?.success) {
        setOpenCreateProductsDialog(false);
        dispatch(fetchAllProducts());
        setImageFile(null);
        setFormData(initialFormData);
        toast({
          title: "Product added successfully",
        });
      }
    });
  };

  useEffect(() => {
    dispatch();
  }, [dispatch]);

  return (
    <Fragment>
      <div className="mb-5 flex justify-end w-full">
        <Button onClick={() => setOpenCreateProductsDialog(true)}>
          Add New Product
        </Button>
      </div>
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
        {productList && productList.length > 0
          ? productList.map((product) => {
              <ProductTile product={product} />;
            })
          : null}
      </div>
      <Sheet
        open={openCreateProductsDialog}
        onOpenChange={() => {
          setOpenCreateProductsDialog(false);
        }}>
        <SheetContent side="right" className="overflow-auto">
          <SheetHeader>Add New Product</SheetHeader>
          <ImageUpload
            imageFile={imageFile}
            setImageFile={setImageFile}
            uploadedImageUrl={uploadedImageUrl}
            imageLoadingState={imageLoadingState}
            setUploadedImageUrl={setUploadedImageUrl}
            setImageLoadingState={setImageLoadingState}
          />
          <div className="py-6">
            <Form
              onSubmit={onSubmit}
              buttonText="Add"
              formData={formData}
              setFormData={setFormData}
              formControls={addProductFormFields}
            />
          </div>
        </SheetContent>
      </Sheet>
    </Fragment>
  );
};

export default Products;
