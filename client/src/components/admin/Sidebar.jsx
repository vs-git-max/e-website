import {
  BadgeCheck,
  ChartNoAxesCombined,
  LayoutDashboard,
  ShoppingBasket,
} from "lucide-react";
import React, { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";

const adminMenuItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    path: "/admin/dashboard",
    icon: <LayoutDashboard />,
  },
  {
    id: "products",
    label: "Products",
    path: "/admin/products",
    icon: <ShoppingBasket />,
  },
  {
    id: "orders",
    label: "Orders",
    path: "/admin/orders",
    icon: <BadgeCheck />,
  },
];

const MenuItems = ({ setOpen }) => {
  const navigate = useNavigate();

  return (
    <nav className="mt-8 flex flex-col gap-3">
      {" "}
      {adminMenuItems.map((item) => (
        <div
          onClick={() => {
            navigate(item.path);
            setOpen(false);
          }}
          key={item.id}
          className="flex items-center gap-3 rounded-md px-3 py-2 text-muted-foreground text-2xl cursor-pointer hover:bg-muted hover:text-foreground"
        >
          {item.icon}

          <span>{item.label}</span>
        </div>
      ))}
    </nav>
  );
};

const Sidebar = ({ open, setOpen }) => {
  const navigate = useNavigate();

  return (
    <Fragment>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left" className="w-64">
          <div className="flex flex-col h-full">
            <SheetHeader className="border-b ">
              <SheetTitle className=" text-xl font-extrabold flex gap-2 mb-4 mt-5">
                <ChartNoAxesCombined size={30} /> Admin Panel
              </SheetTitle>
            </SheetHeader>
            <MenuItems setOpen={setOpen} />
          </div>
        </SheetContent>
      </Sheet>

      <aside className="hidden w-64 flex-col border-r bg-background lg:flex p-6">
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => navigate("/admin/dashboard")}
        >
          <ChartNoAxesCombined size={30} />
          <h1 className="text-xl font-extrabold">Admin Panel</h1>
        </div>
        <MenuItems />
      </aside>
    </Fragment>
  );
};

export default Sidebar;
