import React, { useState } from "react";
import FormInput from "../form-input/FormInput";
import CustomButton from "../custom-button/CustomButton";

import "./sign-in.scss";

const SignIn: React.FC = () => {
  const [formValues, setFormValues] = useState<{ email: string; password: string }>({
    email: "",
    password: "",
  });

  const handleSubmit = (event: React.FormEvent<HTMLElement>) => {
    event.preventDefault();
    setFormValues({ email: "", password: "" });
  };

  const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    const { value, name } = event.currentTarget;
    setFormValues(previousState => ({ ...previousState, [name]: value }));
  };

  const { email, password } = formValues;

  return (
    <div className="sign-in">
      <h2>I already have an account</h2>
      <span>Sign in with your email and password</span>

      <form onSubmit={handleSubmit}>
        <FormInput
          name="email"
          label="email"
          type="email"
          value={email}
          handleChange={handleChange}
          required
        />
        <FormInput
          name="password"
          label="password"
          type="password"
          value={password}
          handleChange={handleChange}
          required
        />
        <CustomButton type="submit">Sign In</CustomButton>
      </form>
    </div>
  );
};

export default SignIn;
