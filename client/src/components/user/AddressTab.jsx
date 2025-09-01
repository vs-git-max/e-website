import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import Form from "../common/Form";
import { addressFormControls } from "@/config";
import { useDispatch, useSelector } from "react-redux";
import {
  addAddress,
  deleteAddress,
  editAddress,
  fetchAddress,
} from "@/store/address/address-slice";
import AddressCard from "./AddressCard";
import { toast } from "sonner";

const initialFormData = {
  address: "",
  phone: "",
  city: "",
  pincode: "",
  notes: "",
};

const AddressTab = () => {
  const [formData, setFormData] = useState(initialFormData);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { addressData } = useSelector((state) => state.address);
  const [currentEditedId, setCurrentEditedId] = useState(null);

  const onSubmit = (e) => {
    e.preventDefault();

    currentEditedId !== null
      ? dispatch(
          editAddress({
            userId: user?.id,
            addressId: currentEditedId,
            formData,
          })
        ).then((data) => {
          if (data?.payload?.success) {
            dispatch(fetchAddress(user?.id));
            setFormData(initialFormData);
            setCurrentEditedId(null);
          }
        })
      : dispatch(
          addAddress({
            formData,
            userId: user?.id,
          })
        ).then((data) => {
          if (data?.payload?.success) {
            dispatch(fetchAddress(user?.id));
            setFormData(initialFormData);
          }
        });
  };

  useEffect(() => {
    dispatch(fetchAddress(user?.id));
  }, [dispatch, user?.id]);

  console.log(addressData);

  const ifFormValid = () => {
    return Object.keys(formData)
      .map((key) => formData[key].trim() !== "")
      .every((item) => item);
  };

  const handleDeleteAddress = (getCurrentAddress) => {
    dispatch(
      deleteAddress({
        userId: user?.id,
        addressId: getCurrentAddress?._id,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        toast.success("Address deleted successfully");
        dispatch(fetchAddress(user?.id));
      }
    });
  };

  const handleEditAddress = (getCurrentAddress) => {
    setCurrentEditedId(getCurrentAddress?._id);
    setFormData({
      ...formData,
      address: getCurrentAddress?.address,
      phone: getCurrentAddress?.phone,
      city: getCurrentAddress?.city,
      pincode: getCurrentAddress?.pincode,
      notes: getCurrentAddress?.notes,
    });
  };

  return (
    <Card>
      <div className="mb-5 p-3 grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3">
        {" "}
        {addressData && addressData?.length > 0
          ? addressData.map((address) => (
              <AddressCard
                key={address?.id}
                address={address}
                handleEditAddress={handleEditAddress}
                handleDeleteAddress={handleDeleteAddress}
              />
            ))
          : null}
      </div>
      <CardHeader>
        <CardTitle>
          {currentEditedId !== null ? "Edit address" : "Add new address"}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <Form
          onSubmit={onSubmit}
          formData={formData}
          buttonText={currentEditedId !== null ? "Edit address" : "Add address"}
          setFormData={setFormData}
          isButtonDisabled={!ifFormValid()}
          formControls={addressFormControls}
        />
      </CardContent>
    </Card>
  );
};

export default AddressTab;
