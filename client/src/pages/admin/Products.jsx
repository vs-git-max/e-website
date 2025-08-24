import ImageUpload from "@/components/admin/ImageUpload";
import ProductTile from "@/components/admin/ProductTile";
import Form from "@/components/common/Form";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { addProductFormElements } from "@/config";
import {
  addNewProduct,
  deleteProduct,
  editProduct,
  fetchAllProducts,
} from "@/store/admin/product-slice";
import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

const Products = () => {
  const initialState = {
    image: null,
    title: "",
    description: "",
    category: "",
    brand: "",
    price: 0,
    salesPrice: 0,
    totalStock: "",
  };

  const [openCreateProductsDialog, setOpenCreateProductsDialog] =
    useState(false);
  const [formData, setFormData] = useState(initialState);
  const [imageFile, setImageFile] = useState(null);
  const [imageURL, setImageURL] = useState("");
  const [imageLoading, setImageLoading] = useState(false);
  const [currentEditedId, setCurrentEditedId] = useState(null);
  const { productList } = useSelector((state) => state.adminProducts);
  const dispatch = useDispatch();

  const onSubmit = (e) => {
    e.preventDefault();

    currentEditedId !== null
      ? dispatch(editProduct({ id: currentEditedId, formData })).then(
          (data) => {
            if (data?.payload?.success) {
              dispatch(fetchAllProducts());
              setFormData(initialState);
              setOpenCreateProductsDialog(false);
            }
          }
        )
      : dispatch(
          addNewProduct({
            ...formData,
            image: imageURL,
          })
        ).then((data) => {
          if (data?.payload?.success) {
            setFormData(initialState);
            setImageFile(null);
            dispatch(fetchAllProducts());
            setOpenCreateProductsDialog(false);
            toast.success("Product added successfully");
          }
        });
  };

  const isFormValid = () => {
    return Object.keys(formData)
      .map((key) => formData[key] !== "")
      .every((item) => item);
  };

  const handleDelete = (getCurrentProductId) => {
    dispatch(deleteProduct({ id: getCurrentProductId })).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchAllProducts());
        toast.success("Product deleted successfully");
      }
    });
  };

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  return (
    <Fragment>
      <div className="mb-5 flex justify-end w-full">
        <Button onClick={() => setOpenCreateProductsDialog(true)}>
          Add New Product
        </Button>
      </div>
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
        {productList &&
          productList?.length > 0 &&
          productList?.map((product) => (
            <ProductTile
              key={product?.id}
              product={product}
              setFormData={setFormData}
              handleDelete={handleDelete}
              setCurrentEditedId={setCurrentEditedId}
              setOpenCreateProductsDialog={setOpenCreateProductsDialog}
            />
          ))}
      </div>
      <Sheet
        open={openCreateProductsDialog}
        onOpenChange={() => {
          setOpenCreateProductsDialog(false);
          setFormData(initialState);
          setCurrentEditedId(null);
        }}
      >
        <SheetContent className="overflow-auto" side="right">
          <SheetHeader>
            <SheetTitle>
              {currentEditedId !== null ? "Edit Product" : "Add New Product"}
            </SheetTitle>
          </SheetHeader>
          <ImageUpload
            imageFile={imageFile}
            imageLoading={imageLoading}
            setImageLoading={setImageLoading}
            setImageFile={setImageFile}
            setImageURL={setImageURL}
            isEditMode={currentEditedId !== null}
          />
          <div className="px-6">
            <Form
              formControls={addProductFormElements}
              formData={formData}
              setFormData={setFormData}
              buttonText={
                currentEditedId !== null ? "Edit Product" : "Add New Product"
              }
              onSubmit={onSubmit}
              isButtonDisabled={!isFormValid()}
            />
          </div>
        </SheetContent>
      </Sheet>
    </Fragment>
  );
};

export default Products;
