import React from "react";
import { Outlet } from "react-router-dom";
import ShoppingViewHeader from "./ShoppingViewHeader";

const ShoppingLayout = () => {
  return (
    <div className="flex flex-col bg-white overflow-hidden">
      {/* common header of the shopping view */}
      <ShoppingViewHeader />
      <main className="flex flex-col w-full">
        <Outlet />
      </main>
    </div>
  );
};

export default ShoppingLayout;
