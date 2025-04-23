import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import React, { Fragment, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

import ImageUpload from "@/components/admin/ImageUpload";
import Form from "@/components/common/Form";
import { Sheet, SheetContent, SheetHeader } from "@/components/ui/sheet";
import { addProductFormFields } from "@/config";
import {
  deleteProduct,
  editProduct,
  fetchAllProducts,
} from "@/store/admin/productSlice/productSlice";
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

  const [currentEdittedImageId, setCurrentEdittedImageId] = useState(null);

  const isFormValid = () => {
    return Object.values(formData).every((item) => item !== "");
  };

  const onSubmit = (event) => {
    event.preventDefault();

    currentEdittedImageId !== null
      ? dispatch(editProduct({ id: currentEdittedImageId, formData })).then(
          (data) => {
            if (data?.payload?.success) {
              dispatch(fetchAllProducts);
              setFormData(initialFormData);
              setOpenCreateProductsDialog(false);
              setCurrentEdittedImageId(null);
            }
          }
        )
      : null;

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

  const handleDelete = (getCurrentProductId) => {
    dispatch(deleteProduct(getCurrentProductId)).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchAllProducts);
      }
    });
  };

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
              <ProductTile
                product={product}
                setFormData={setFormData}
                handleDelete={handleDelete}
                setCurrentEdittedImageId={setCurrentEdittedImageId}
                setOpenCreateProductsDialog={setOpenCreateProductsDialog}
              />;
            })
          : null}
      </div>
      <Sheet
        open={openCreateProductsDialog}
        onOpenChange={() => {
          setOpenCreateProductsDialog(false);
          setCurrentEdittedImageId(null);
          setFormData(initialFormData);
        }}>
        <SheetContent side="right" className="overflow-auto">
          <SheetHeader>
            {currentEdittedImageId !== null
              ? "Edit Product"
              : "Add New Product"}
          </SheetHeader>
          <ImageUpload
            imageFile={imageFile}
            setImageFile={setImageFile}
            uploadedImageUrl={uploadedImageUrl}
            imageLoadingState={imageLoadingState}
            isEditMode={currentEdittedImageId !== null}
            setUploadedImageUrl={setUploadedImageUrl}
            setImageLoadingState={setImageLoadingState}
          />
          <div className="py-6">
            <Form
              onSubmit={onSubmit}
              buttonText={currentEdittedImageId !== null ? "Edit" : "Add"}
              formData={formData}
              setFormData={setFormData}
              formControls={addProductFormFields}
              isBtnDisabled={!isFormValid()}
            />
          </div>
        </SheetContent>
      </Sheet>
    </Fragment>
  );
};

export default Products;
