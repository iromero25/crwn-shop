import React, { FormEvent, useState } from "react";
import { connect, ConnectedProps } from "react-redux";

import FormInput from "../form-input/FormInput";
import CustomButton from "../custom-button/CustomButton";
import { signUpStart } from "../../redux/user/user.actions";

import "./sign-up.scss";

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

interface Props extends ConnectedProps<typeof Connect> {}

const SignUp: React.FC<Props> = ({ signUpStart }) => {
  const [signUpFormData, setSignUpFormData] = useState<ISignUpFormData>(emptySignUpData);
  const { displayName, email, password, confirmPassword } = signUpFormData;

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { email, displayName, password, confirmPassword } = signUpFormData;
    if (password !== confirmPassword) {
      alert("passwords don't match");
      return;
    }

    signUpStart({ email, password, displayName });
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

const mapDispatchToProps = {
  signUpStart,
};

const Connect = connect(null, mapDispatchToProps);

export default Connect(SignUp);
