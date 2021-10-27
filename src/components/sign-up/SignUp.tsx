import React, { FormEvent, useState } from "react";
import FormInput from "../form-input/FormInput";
import { auth, createUserProfileDocument } from "../../firebase/firebase.utils";

import "./sign-up.scss";
import CustomButton from "../custom-button/CustomButton";

interface ISignUpFormData {
  displayName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const emptySignUpData: ISignUpFormData = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUp: React.FC = () => {
  const [signUpFormData, setSignUpFormData] = useState<ISignUpFormData>(emptySignUpData);
  const { displayName, email, password, confirmPassword } = signUpFormData;

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { email, displayName, password, confirmPassword } = signUpFormData;
    if (password !== confirmPassword) {
      alert("passwords don't match");
      return;
    }

    try {
      const { user } = await auth.createUserWithEmailAndPassword(email, password);
      await createUserProfileDocument(user, { displayName });
      setSignUpFormData(emptySignUpData);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (event: FormEvent<HTMLInputElement>) => {
    const { name, value } = event.currentTarget;
    setSignUpFormData(previousState => ({ ...previousState, [name]: value }));
  };

  return (
    <div className="sign-up">
      <h2 className="title">I do not have an account</h2>
      <span>Sign up with your email and password</span>
      <form className="sign-up-form" onSubmit={handleSubmit}>
        <FormInput
          type="text"
          name="displayName"
          value={displayName}
          handleChange={handleChange}
          label="Display Name"
          required
        />
        <FormInput
          type="email"
          name="email"
          value={email}
          handleChange={handleChange}
          label="Email"
          required
        />
        <FormInput
          type="password"
          name="password"
          value={password}
          handleChange={handleChange}
          label="Password"
          required
        />
        <FormInput
          type="password"
          name="confirmPassword"
          value={confirmPassword}
          handleChange={handleChange}
          label="Confirm Password"
          required
        />
        <CustomButton type="submit">SIGN UP</CustomButton>
      </form>
    </div>
  );
};

export default SignUp;
