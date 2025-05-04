import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import AuthLayout from "./components/auth/AuthLayout";
import AuthLogin from "./pages/auth/AuthLogin";
import AuthRegister from "./pages/auth/AuthRegister";
import AdminLayout from "./components/admin/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import Orders from "./pages/admin/Orders";
import Products from "./pages/admin/Products";
import ShoppingLayout from "./components/shopping-view/ShoppingLayout";
import NotFound from "./pages/not-found/NotFound";
import Home from "./pages/shopping/Home";
import Account from "./pages/shopping/Account";
import Listing from "./pages/shopping/Listing";
import CheckOut from "./pages/shopping/CheckOut";
import CheckAuth from "./components/common/CheckAuth";
import UnauthPage from "./pages/unauth-page/UnauthPage";
import { useDispatch, useSelector } from "react-redux";
import { checkAuth } from "./store/auth-slice/auth-slice";
import { Skeleton } from "@/components/ui/skeleton";

const App = () => {
  const { isAuthenticated, user, isLoading } = useSelector(
    (state) => state.auth
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth());

    if (isLoading)
      return <Skeleton className="w-[600px] h-[600px] rounded-full" />;
  }, [dispatch, isLoading]);

  return (
    <div className="flex flex-col overflow-hidden bg-white">
      <Routes>
        {/* log in and register auths */}
        <Route
          path="/auth"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AuthLayout />
            </CheckAuth>
          }>
          <Route path="login" element={<AuthLogin />} />
          <Route path="register" element={<AuthRegister />} />
        </Route>

        {/* admin layout  */}
        <Route 
          path="/admin"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AdminLayout />
            </CheckAuth>
          }>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="orders" element={<Orders />} />
          <Route path="products" element={<Products />} />
        </Route>

        {/* the main shop */}
        <Route
          path="/shop"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <ShoppingLayout />
            </CheckAuth>
          }>
          <Route path="home" element={<Home />} />
          <Route path="account" element={<Account />} />
          <Route path="listing" element={<Listing />} />
          <Route path="checkout" element={<CheckOut />} />
        </Route>

        {/* error handling pages */}
        <Route path="*" element={<NotFound />} />
        <Route path="unauth-page" element={<UnauthPage />} />
      </Routes>
    </div>
  );
};

export default App;
