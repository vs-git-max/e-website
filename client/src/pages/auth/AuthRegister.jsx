import Form from "@/components/common/Form";
import { registerFormControls } from "@/config";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const initialState = {
  userName: "",
  email: "",
  password: "",
};

const AuthRegister = () => {
  const [formData, setFormData] = useState(initialState);
  const onSubmit = (e) => {
    e.preventDefault();
    setFormData(initialState);
    console.log(formData);
  };

  return (
    <div className="mx-auto wfull max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Create new account
        </h1>
      </div>
      <Form
        formControls={registerFormControls}
        buttonText={"Signup"}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
      />
      <p className="mt-2">
        Already have an Account{" "}
        <Link
          className="font-medium text-primary hover:underline"
          to="/auth/login">
          Login
        </Link>
      </p>
    </div>
  );
};

export default AuthRegister;
