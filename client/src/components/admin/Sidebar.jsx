import { adminSidebarMenuItems } from "@/config";
import { ChartNoAxesCombined } from "lucide-react";
import React, { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";

const Sidebar = ({ open, setOpen }) => {
  const navigate = useNavigate();

  const MenuItems = ({ setOpen }) => {
    return (
      <nav className="flex flex-col mt-8 gap-2">
        {adminSidebarMenuItems.map((item) => {
          <div
            className="flex text-xl cursor-pointer items-centergap-2 rounded-md px-3 py-2 text-muted-foreground hover:bg-muted-foreground"
            key={item.id}
            onClick={() => {
              navigate(item.path);
              setOpen ? setOpen(false) : null;
            }}>
            {item.icon}
            <span>{item.label}</span>
          </div>;
        })}
      </nav>
    );
  };

  return (
    <Fragment>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left" className="w-64 ">
          <div className="flex flex-col h-full">
            <SheetHeader className="border-b">
              <ChartNoAxesCombined />
              <SheetTitle className="flex gap-2 mb-5">
                <ChartNoAxesCombined />
                <span>Admin Panel</span>
              </SheetTitle>
            </SheetHeader>
            <MenuItems setOpen={setOpen} />
          </div>
        </SheetContent>
      </Sheet>

      <aside className="hidden w-64 flex-col border-r bg-background p-6 lg:flex">
        <div
          onClick={() => navigate("/admin/dashboard")}
          className="flex items-center gap-2 cursor-pointer">
          <ChartNoAxesCombined />
          <h1 className="text-2xl font-extrabold">Admin Panel</h1>
        </div>
        <MenuItems />
      </aside>
    </Fragment>
  );
};

export default Sidebar;
