import React from "react";
import InputSignupAndSignIn from "../../../components/InputSignupAndSignIn/InputSignupAndSignIn";
import SignupLoginButton from "../../../components/SignupLoginButton/SignupLoginButton";
import "./SignupPage.css";
import {
  arrow_back,
  Semicircle1,
  Semicirle2,
  triangleLoginSignUp,
} from "../../../constant";

import ThemeToggleLoginSignUp from "../../../components/themesSignUpLogin/themesSignUpLogin";
const signupPage = () => {
  return (
    <div className="signUpLoginPage">
      <ThemeToggleLoginSignUp />
      <img src={arrow_back} alt="" className="arrow_back" />

      <div className="signUpPageForms">
        <InputSignupAndSignIn label="Username" placeholder="Enter a username" />
        <InputSignupAndSignIn label="Email" placeholder="Enter your email" />
        <InputSignupAndSignIn label="Password" placeholder="**********" />
        <InputSignupAndSignIn
          label="Confirm Password"
          placeholder="**********"
        />
        <SignupLoginButton buttonContent="Sign Up" loginSignup="Login" />
      </div>
      <img src={triangleLoginSignUp} alt="" className="triangleLoginSignUp" />

      <img src={Semicirle2} alt="" className="Semicirle2" />

      <img src={Semicircle1} alt="" className="Semicircle1" />
    </div>
  );
};

export default signupPage;
