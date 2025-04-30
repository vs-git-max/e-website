import React from "react";
import Filter from "./filter";

const Listing = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-6 p-4 md:p-6">
      <Filter />
    </div>
  );
};

export default Listing;
