import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import Form from "../common/Form";
import { addressFormControls } from "@/config";
import { useDispatch, useSelector } from "react-redux";
import { addAddress, fetchAddress } from "@/store/address/address-slice";
import AddressCard from "./AddressCard";

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

  const onSubmit = (e) => {
    e.preventDefault();

    setFormData(initialFormData);

    dispatch(
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

  return (
    <Card>
      <div className="mb-5 p-3 grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3">
        {" "}
        {addressData && addressData?.length > 0
          ? addressData.map((address) => <AddressCard address={address} />)
          : null}
      </div>
      <CardHeader>
        <CardTitle>Add new address</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <Form
          onSubmit={onSubmit}
          formData={formData}
          buttonText="Add address"
          setFormData={setFormData}
          isButtonDisabled={!ifFormValid()}
          formControls={addressFormControls}
        />
      </CardContent>
    </Card>
  );
};

export default AddressTab;
