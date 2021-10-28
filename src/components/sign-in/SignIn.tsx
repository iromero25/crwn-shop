import React, { FormEvent, useState } from "react";
import FormInput from "../form-input/FormInput";
import CustomButton from "../custom-button/CustomButton";
import { auth, signInWithGoogle } from "../../firebase/firebase.utils";

import "./sign-in.scss";

const SignIn: React.FC = () => {
  const [formValues, setFormValues] = useState<{ email: string; password: string }>({
    email: "",
    password: "",
  });

  const handleSubmit = async (event: FormEvent<HTMLElement>) => {
    event.preventDefault();

    const { email, password } = formValues;

    try {
      await auth.signInWithEmailAndPassword(email, password);
      setFormValues({ email: "", password: "" });
    } catch (error) {
      alert("Either email or password are wrong");
      console.log(error);
    }
  };

  const handleChange = (event: FormEvent<HTMLInputElement>) => {
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
        <div className="buttons">
          <CustomButton type="submit">Sign In</CustomButton>
          <CustomButton onClick={signInWithGoogle} isGoogleSignIn>
            Sign In with Google
          </CustomButton>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
