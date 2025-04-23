import Form from "@/components/common/Form";
import { loginUserAction } from "@/store/auth-slice/auth-slice";

import { loginFormControls } from "@/config";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const initialState = {
  email: "",
  password: "",
};

const AuthLogin = () => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState(initialState);

  const onSubmit = (e) => {
    e.preventDefault();

    setFormData(initialState);

    dispatch(loginUserAction(formData)).then((data) => {
      if (data?.payload?.success) {
        toast({
          title: data.payload.message,
        });
      } else {
        toast({
          title: data?.payload?.message,
        });
      }
    });
  };

  return (
    <div className="mx-auto wfull max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Create new account
        </h1>
      </div>
      <Form
        formControls={loginFormControls}
        buttonText={"Login"}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
      />
      <p className="mt-2">
        Dont have an Account{" "}
        <Link
          className="font-medium text-primary hover:underline"
          to="/auth/register">
          Signup
        </Link>
      </p>
    </div>
  );
};

export default AuthLogin;
