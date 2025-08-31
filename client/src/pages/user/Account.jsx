import React from "react";
import accountImage from "../../assets/account.jpg";
const Account = () => {
  return (
    <div className="flex flex-col ">
      <div className="relative h-[300px] w-full">
        <img
          src={accountImage}
          alt="Account image"
          className="h-full w-full object-cover object-center"
        />
      </div>
    </div>
  );
};

export default Account;
