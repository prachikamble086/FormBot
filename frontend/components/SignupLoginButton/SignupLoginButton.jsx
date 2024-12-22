import React from "react";
import "./SignupLoginButton.css";
import { Google } from "../../constant";
const SignupLoginButton = ({ buttonContent, loginSignup }) => {
  return (
    <div className="signup-or-login">
      <button className="signup-login-button">{buttonContent}</button>
      <div>OR</div>
      <button className="signup-login-button">
        {" "}
        <img src={Google} alt="" />
        Sign Up with Google
      </button>
      <div className="already-have-account">
        Already have an account ?{" "}
        <div className="already-have-account-type">{loginSignup}</div>
      </div>
    </div>
  );
};

export default SignupLoginButton;
