import React from "react";
import "./InputSignupAndSignIn.css";
const InputSignupAndSignIn = ({ label, placeholder }) => {
  return (
    <div className="inputSignupAndSignIn">
      <label className="input-label">{label}</label>
      <input
        type="text"
        placeholder={placeholder}
        className="input-signup-login"
      />
    </div>
  );
};

export default InputSignupAndSignIn;
