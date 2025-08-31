import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import Form from "../common/Form";
import { addressFormControls } from "@/config";
import { useDispatch, useSelector } from "react-redux";
import { addAddress } from "@/store/address/address-slice";

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

  const onSubmit = (e) => {
    e.preventDefault();

    setFormData(initialFormData);

    dispatch(
      addAddress({
        ...formData,
        userId: user?.id,
      })
    ).then((data) => console.log(data));
  };

  const ifFormValid = () => {
    return Object.keys(formData)
      .map((key) => formData[key].trim() !== "")
      .every((item) => item);
  };

  return (
    <Card>
      <div className="">Address List </div>
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
