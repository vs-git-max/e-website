import React from "react";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Label } from "../ui/label";
import { Button } from "../ui/button";

const AddressCard = ({ address, handleDeleteAddress, handleEditAddress }) => {
  return (
    <Card>
      <CardContent className="grid gap-4 p-4">
        <Label>Address : {address?.address}</Label>
        <Label>City : {address?.city}</Label>
        <Label>Pincode : {address?.pincode}</Label>
        <Label>Phone : {address?.phone}</Label>
        <Label>Notes : {address?.notes}</Label>
      </CardContent>
      <CardFooter className="flex justify-between p-3">
        <Button onClick={() => handleEditAddress(address)}>Edit</Button>
        <Button onClick={() => handleDeleteAddress(address)}>Delete</Button>
      </CardFooter>
    </Card>
  );
};

export default AddressCard;
