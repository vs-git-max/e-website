import Form from "@/components/common/Form";
import { registerFormControls } from "@/config";
import { registerUser } from "@/store/auth/auth-slice";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialState = {
    username: "",
    email: "",
    password: "",
  };

  const [formData, setFormData] = useState(initialState);

  const onSubmit = (e) => {
    e.preventDefault();

    dispatch(registerUser(formData))
      .then((data) => {
        if (data?.payload?.success) {
          navigate("/auth/login");
          toast.success(data?.payload?.message);
        } else {
          toast.error(data?.payload?.message);
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  console.log(formData);

  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Register your account
        </h1>
        <p className="mt-2 ">
          {" "}
          Already have an account{" "}
          <Link
            to="/auth/login"
            className="font-medium text-primary hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
      <Form
        formControls={registerFormControls}
        formData={formData}
        setFormData={setFormData}
        buttonText={"Create Account"}
        onSubmit={onSubmit}
      />
    </div>
  );
};

export default Signup;
