import React, { useEffect } from "react";
import { useAppContext } from "../../context/context";
import "./themesSignUpLogin.css";
const ThemeToggleLoginSignUp = () => {
  const { theme, setTheme } = useAppContext();

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme); // Apply theme to HTML
    localStorage.setItem("theme", newTheme); // Persist the theme in localStorage
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light"; // Get theme from localStorage
    document.documentElement.setAttribute("data-theme", savedTheme); // Set the theme on HTML
    setTheme(savedTheme); // Update context with saved theme
  }, [setTheme]);

  return (
    <button onClick={toggleTheme} className="theme-toggle-login-signUp">
      Switch to {theme === "light" ? "Dark" : "Light"} Mode
    </button>
  );
};

export default ThemeToggleLoginSignUp;
