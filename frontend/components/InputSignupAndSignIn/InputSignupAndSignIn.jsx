// InputSignupAndSignIn.js
import React from "react";
import "./InputSignupAndSignIn.css";

const InputSignupAndSignIn = ({ label, placeholder, value, onChange }) => {
  return (
    <div className="inputSignupAndSignIn">
      <label className="input-label">{label}</label>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="input-signup-login"
      />
    </div>
  );
};

export default InputSignupAndSignIn;
