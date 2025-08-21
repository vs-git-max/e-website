import Header from "@/components/admin/Header";
import Sidebar from "@/components/admin/Sidebar";
import React, { useState } from "react";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex min-h-screen">
      <Sidebar open={open} setOpen={setOpen} />
      <div className="flex flex-1 flex-col">
        <Header open={open} setOpen={setOpen} />
        <main className="flex flex-1 flex-col bg-muted/40 p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
