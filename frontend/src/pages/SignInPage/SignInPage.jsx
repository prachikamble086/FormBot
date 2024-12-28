import React, { useState } from "react";
import InputSignupAndSignIn from "../../../components/InputSignupAndSignIn/InputSignupAndSignIn";
import "./SignInPage.css";
import {
  arrow_back,
  Google,
  Semicircle1,
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

    // Check if fields are empty
    if (!emailId || !password) {
      setError("All fields required");
      return;
    }

    try {
      const postLoginData = await postLoginRequest(emailId, password);

      if (postLoginData && postLoginData.user && postLoginData.token) {
        setUser(postLoginData.user);

        localStorage.setItem("jwtToken", postLoginData.token);

        const dashboardId =
          postLoginData.user.editAccess && postLoginData.user.editAccess[0];

        if (dashboardId) {
          localStorage.setItem("dashboardId", dashboardId);
          navigate(`/dashboard/${dashboardId}`);
        } else {
          setError("Dashboard not found.");
        }
      } else {
        setError("Invalid credentials or server error.");
      }
    } catch (error) {
      console.log("Login error:", error);
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

          {error && <div className="error">{error}</div>}

          <div className="signup-or-login">
            <button className="signup-login-button" type="submit">
              Login
            </button>
            <div>OR</div>
            <button className="signup-login-button">
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

        <img src={Semicircle1} alt="" className="Semicircle1" />
      </form>
    </div>
  );
};

export default SignInPage;
