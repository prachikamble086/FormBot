import { useState } from "react";
import InputSignupAndSignIn from "../../../components/InputSignupAndSignIn/InputSignupAndSignIn";
import "./SignupPage.css";
import {
  arrow_back,
  Google,
  Semicircle1,
  Semicirle2,
  triangleLoginSignUp,
} from "../../../constant";

import ThemeToggleLoginSignUp from "../../../components/themesSignUpLogin/themesSignUpLogin";
import { Link, useNavigate } from "react-router-dom";
import { postRegisterRequest } from "../../services/networkCalls";
import { useAppContext } from "../../../context/context";
const SignupPage = () => {
  const [username, setUsername] = useState("");
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const { setUser } = useAppContext();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !emailId || !password || !confirmPassword) {
      alert("All fields required");
      return;
    }
    if (password != confirmPassword) {
      setError("Password does not match ");
      return;
    }

    try {
      const postRegisterRequestData = await postRegisterRequest(
        username,
        emailId,
        password
      );

      if (
        postRegisterRequestData &&
        postRegisterRequestData.user &&
        postRegisterRequestData.jwt
      ) {
        setUser(postRegisterRequestData.user);
        localStorage.setItem("jwtToken", postRegisterRequestData.jwt);
        console.log("Navigating to dashboard");

        navigate("/dashboard"); //sdfghjkl;lkjhgfdfghjkl;lkjhgffghjkl;
      } else {
        setError("Registration failed. Please try again");
      }
    } catch (error) {
      console.log("Registration error", error);
      setError("Something went wrong. Please try again");
    }
  };

  return (
    <div className="signUpLoginPage">
      <form onSubmit={handleSubmit}>
        <ThemeToggleLoginSignUp />
        <img src={arrow_back} alt="" className="arrow_back" />

        <div className="signUpPageForms">
          <InputSignupAndSignIn
            label="Username"
            placeholder="Enter a username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <InputSignupAndSignIn
            label="Email"
            placeholder="Enter your email"
            value={emailId}
            onChange={(e) => setEmailId(e.target.value)}
          />
          <InputSignupAndSignIn
            label="Password"
            placeholder="**********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputSignupAndSignIn
            label="Confirm Password"
            placeholder="**********"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <div className="signup-or-login">
            <button className="signup-login-button" type="submit">
              Sign Up
            </button>
            <div>OR</div>
            <button className="signup-login-button">
              {" "}
              <img src={Google} alt="" />
              Sign Up with Google
            </button>
            <div className="already-have-account">
              Already have an account ?{" "}
              <Link to="/login" className="already-have-account-type">
                Login
              </Link>
            </div>
          </div>
        </div>
        <img src={triangleLoginSignUp} alt="" className="triangleLoginSignUp" />

        <img src={Semicirle2} alt="" className="Semicirle2" />

        <img src={Semicircle1} alt="" className="Semicircle1" />
      </form>
    </div>
  );
};

export default SignupPage;
