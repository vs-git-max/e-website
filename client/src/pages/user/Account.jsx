import React from "react";
import accountImage from "../../assets/account.jpg";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import OrdersTab from "@/components/user/OrdersTab";
import AddressTab from "@/components/user/AddressTab";

const Account = () => {
  return (
    <div className="flex flex-col ">
      <div className="relative h-[350px] w-full">
        <img
          src={accountImage}
          alt="Account image"
          className="h-full w-full object-cover object-center"
        />
      </div>
      <div className="container mx-auto grid grid-cols-1 gap-8 py-8">
        <div className="flex flex-col shadow bg-background border rounded-lg">
          <Tabs defaultValue="orders">
            <TabsList>
              <TabsTrigger value="orders">Orders</TabsTrigger>
              <TabsTrigger value="address">Address</TabsTrigger>
            </TabsList>
            <TabsContent value="orders">
              <OrdersTab />
            </TabsContent>
            <TabsContent value="address">
              <AddressTab />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Account;
