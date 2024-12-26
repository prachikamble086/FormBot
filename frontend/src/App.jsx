import { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import LandingPage from "./pages/LandingPage/LandingPage";
import SignupPage from "./pages/signupPage/signupPage";
import SignInPage from "./pages/SignInPage/SignInPage";
import DashboardPage from "./pages/DashboardPage/DashboardPage";
import "./App.css";
import { useAppContext } from "../context/context";
import { setupAuthHeaderForServiceCalls } from "./services/authTokenMiddleware";
import { getUserData } from "./services/networkCalls";
import { setupAuthExceptionHandler } from "./services/authExecptionMMiddleware";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const jwtToken = localStorage.getItem("jwtToken");
  const userId = localStorage.getItem("userId");
  const { setUser } = useAppContext();

  function logoutUser() {
    setupAuthHeaderForServiceCalls(null);
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("userId");
    navigate("/login");
  }

  async function loadInitialData() {
    try {
      if (jwtToken && userId) {
        const userData = await getUserData(userId);
        setUser(userData.user);
      }

      setIsLoading(false);
    } catch (error) {
      console.error("Error loading data:", error);
      setIsLoading(false);
      [];
    }
  }

  useEffect(() => {
    setupAuthHeaderForServiceCalls(jwtToken);
    setupAuthExceptionHandler(logoutUser, navigate);

    loadInitialData();
  }, [jwtToken, userId, navigate, setUser]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<SignInPage />} />
        <Route path="/dashboard/:dashboardId" element={<DashboardPage />} />
      </Routes>
    </>
  );
}

export default App;
