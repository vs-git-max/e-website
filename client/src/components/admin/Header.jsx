import React from "react";
import { Button } from "../ui/button";
import { AlignJustify, LogOut } from "lucide-react";
import { useDispatch } from "react-redux";
import { logoutUser } from "@/store/auth/auth-slice";

const Header = ({ setOpen }) => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <header className="border-b flex items-center justify-between  px-4 py-3 bg-background">
      <Button className="lg:hidden sm:block" onClick={() => setOpen(true)}>
        <AlignJustify />
        <span className="sr-only">Toggle Menu</span>
      </Button>
      <div className="flex flex-1 justify-end">
        <Button
          onClick={handleLogout}
          className="text-sm item-center rounded-md px-4 py-2 font-medium inline-flex gap-2 shadow"
        >
          <LogOut />
          Logout
        </Button>
      </div>
    </header>
  );
};

export default Header;
