import React, { useState } from "react";
import InputSignupAndSignIn from "../../../components/InputSignupAndSignIn/InputSignupAndSignIn";
import SignupLoginButton from "../../../components/SignupLoginButton/SignupLoginButton";
import "./SignInPage.css";
import {
  arrow_back,
  Google,
  Semicircle1,
  Semicirle2,
  triangleLoginSignUp,
} from "../../../constant";
import ThemeToggleLoginSignUp from "../../../components/themesSignUpLogin/themesSignUpLogin";
import { Link, useNavigate } from "react-router-dom";
import { useAppContext } from "../../../context/context";
import { postLoginRequest } from "../../services/networkCalls";
const SignInPage = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const { setUser } = useAppContext();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!emailId || !password) {
      setError("All fields required");
      return;
    }

    try {
      const postLoginData = await postLoginRequest(emailId, password);

      if (postLoginData && postLoginData.user && postLoginData.token) {
        setUser(postLoginData.user);
        localStorage.setItem("jwtToken", postLoginData.token);
        localStorage.setItem("userId", postLoginData.user._id);

        const dashboardId = postLoginData.dashboardId;
        localStorage.setItem("dashboardId", dashboardId);

        navigate(`/dashboard/${dashboardId}`);
      } else {
        setError("Invalid credentials or server error.");
      }
    } catch (error) {
      console.log(error);
      setError("Something went wrong. Please try again");
    }
  };

  return (
    <div className="signUpLoginPage">
      <form onSubmit={handleLogin}>
        <ThemeToggleLoginSignUp />
        <img src={arrow_back} alt="" className="arrow_back" />

        <div className="signUpPageForms">
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

          <div className="signup-or-login">
            <button className="signup-login-button" type="submit">
              Login
            </button>
            <div>OR</div>
            <button className="signup-login-button">
              {" "}
              <img src={Google} alt="" />
              Sign Up with Google
            </button>
            <div className="already-have-account">
              Don’t have an account?{" "}
              <Link to="/signup" className="already-have-account-type">
                Register now
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

export default SignInPage;
