import React, { FormEvent, useState } from "react";
import { connect, ConnectedProps } from "react-redux";

import { IEmailAndPassword } from "../types";
import FormInput from "../form-input/FormInput";
import CustomButton from "../custom-button/CustomButton";
import { startEmailSignIn, startGoogleSignIn } from "../../redux/user/user.actions";

import "./sign-in.scss";

interface Props extends ConnectedProps<typeof Connector> {}

const SignIn: React.FC<Props> = ({ signInWithGoogle, signInWithEmail }) => {
  const [emailAndPassword, setemailAndPassword] = useState<IEmailAndPassword>({
    email: "",
    password: "",
  });

  const handleSubmit = async (event: FormEvent<HTMLElement>) => {
    event.preventDefault();

    try {
      signInWithEmail(emailAndPassword);
      setemailAndPassword({ email: "", password: "" });
    } catch (error) {
      alert("Either email or password are wrong");
      console.log(error);
    }
  };

  const handleChange = (event: FormEvent<HTMLInputElement>) => {
    const { value, name } = event.currentTarget;
    setemailAndPassword(previousState => ({ ...previousState, [name]: value }));
  };

  const { email, password } = emailAndPassword;

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
          <CustomButton type="button" onClick={signInWithGoogle} isGoogleSignIn>
            Sign In with Google
          </CustomButton>
        </div>
      </form>
    </div>
  );
};

const mapDispatchToProps = {
  signInWithGoogle: startGoogleSignIn,
  signInWithEmail: (emailAndPassword: IEmailAndPassword) =>
    startEmailSignIn(emailAndPassword),
};

const Connector = connect(null, mapDispatchToProps);

export default Connector(SignIn);
