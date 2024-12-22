import React from "react";
import InputSignupAndSignIn from "../../../components/InputSignupAndSignIn/InputSignupAndSignIn";
import SignupLoginButton from "../../../components/SignupLoginButton/SignupLoginButton";
import "./SignInPage.css";
import {
  arrow_back,
  Semicircle1,
  Semicirle2,
  triangleLoginSignUp,
} from "../../../constant";
import ThemeToggleLoginSignUp from "../../../components/themesSignUpLogin/themesSignUpLogin";
const SignInPage = () => {
  return (
    <div className="signUpLoginPage">
      <ThemeToggleLoginSignUp />
      <img src={arrow_back} alt="" className="arrow_back" />

      <div className="signUpPageForms">
        <InputSignupAndSignIn label="Email" placeholder="Enter your email" />
        <InputSignupAndSignIn label="Password" placeholder="**********" />

        <SignupLoginButton buttonContent="Sign Up" loginSignup="Login" />
      </div>
      <img src={triangleLoginSignUp} alt="" className="triangleLoginSignUp" />

      <img src={Semicirle2} alt="" className="Semicirle2" />

      <img src={Semicircle1} alt="" className="Semicircle1" />
    </div>
  );
};

export default SignInPage;
