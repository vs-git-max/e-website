import React from "react";
import { Card, CardContent } from "../ui/card";
import { Label } from "../ui/label";

const AddressCard = ({ address }) => {
  return (
    <CardContent className="grid gap-4">
      <Label>{address?.label}</Label>
      <Label>{address?.city}</Label>
      <Label>{address?.pincodel}</Label>
      <Label>{address?.notes}</Label>
    </CardContent>
  );
};

export default AddressCard;
