import React from "react";
import { Card, CardContent } from "../ui/card";
import { Label } from "../ui/label";

const AddressCard = ({ address }) => {
  return (
    <Card>
      <CardContent className="grid gap-4 p-4">
        <Label>Address : {address?.address}</Label>
        <Label>City : {address?.city}</Label>
        <Label>Pincode : {address?.pincode}</Label>
        <Label>Notes : {address?.notes}</Label>
      </CardContent>
    </Card>
  );
};

export default AddressCard;
