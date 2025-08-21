import Form from "@/components/common/Form";
import { loginFormControls } from "@/config";
import { loginUser } from "@/store/auth/auth-slice";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const Login = () => {
  const dispatch = useDispatch();

  const initialState = {
    email: "",
    password: "",
  };
  const [formData, setFormData] = useState(initialState);

  const onSubmit = (e) => {
    e.preventDefault();

    dispatch(loginUser(formData))
      .then((data) => {
        if (data?.payload?.success) {
          toast.success(data?.payload?.message);
        } else {
          toast.error(data?.payload?.message);
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <div className="mx-auto max-w-md space-y-6 w-full">
      <div className="text-center">
        <h1 className="text-foreground font-bold tracking-tight text-3xl ">
          Login to your Account
        </h1>
        <p className="mt-2">
          Don't have an account{" "}
          <Link
            to="/auth/register"
            className="text-foreground font-medium hover:underline"
          >
            Register
          </Link>
        </p>
      </div>
      <Form
        formControls={loginFormControls}
        onSubmit={onSubmit}
        buttonText="Login"
        formData={formData}
        setFormData={setFormData}
      />
    </div>
  );
};

export default Login;
