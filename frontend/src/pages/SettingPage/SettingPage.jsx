import React, { useState } from "react";
import { user, lock } from "../../../constant";
import { useAppContext } from "../../../context/context";
import { useParams } from "react-router-dom";
import { putUserData } from "../../services/networkCalls";
import ThemeToggle from "../../../components/themes/themes";

const SettingPage = () => {
  const { user, setUser } = useAppContext();
  const { userId } = useParams(); // Get the userId from the URL
  console.log("User ID from URL:", userId); // Log userId from URL

  const [username, setUsername] = useState(""); // State to store the username
  const [emailId, setEmailId] = useState(""); // State to store the emailId
  const [password, setPassword] = useState(""); // State to store the old password
  const [newPassword, setNewPassword] = useState(""); // State to store the new password
  const [isLoading, setIsLoading] = useState(false); // State to manage loading state

  // Handler for updating the user profile
  const handleUpdateUserProfile = async (e) => {
    e.preventDefault();
    console.log("Form submitted");

    if (!userId) {
      console.log("No user Id found in URL");
      return;
    }

    // Create an object with updated data to send
    const updatedData = {};
    if (username) updatedData.username = username;
    if (emailId) updatedData.emailId = emailId;
    if (password && newPassword) {
      updatedData.password = password;
      updatedData.newPassword = newPassword;
    }

    // If no fields are updated, do nothing
    if (Object.keys(updatedData).length === 0) {
      console.log("No fields to update");
      return;
    }
    console.log("Updated data to send:", updatedData);

    try {
      setIsLoading(true);
      console.log("Setting loading state to true");

      // Get the stored userId from localStorage for validation
      const requestUserId = localStorage.getItem("userId");
      console.log("Request User ID from localStorage:", requestUserId);
      if (!requestUserId) {
        console.error("Invalid user ID in localStorage");
        return;
      }

      // Call the putUserData function with the updated fields
      const updateProfile = await putUserData(
        userId,
        updatedData.username,
        updatedData.emailId,
        updatedData.password,
        updatedData.newPassword
      );
      console.log("Response from putUserData:", updateProfile);

      if (updateProfile) {
        setUser(updateProfile); // Update the context with the new user data
        console.log("Profile updated successfully");
      } else {
        console.log("Profile update failed");
      }
    } catch (error) {
      console.log("Error in updating profile", error);
    } finally {
      setIsLoading(false);
      console.log("Setting loading state to false");
    }
  };

  return (
    <div>
      <ThemeToggle />
      <form onSubmit={handleUpdateUserProfile}>
        <div>
          <img src={user} alt="" />
          <input
            type="text"
            placeholder="Name"
            value={username}
            onChange={(e) => {
              console.log("Username input changed:", e.target.value);
              setUsername(e.target.value);
            }}
          />
        </div>
        <div>
          <img src={user} alt="" />
          <input
            type="text"
            placeholder="Update Email"
            value={emailId}
            onChange={(e) => {
              console.log("Email input changed:", e.target.value);
              setEmailId(e.target.value);
            }}
          />
        </div>
        <div>
          <img src={lock} alt="" />
          <input
            type="password"
            placeholder="Old Password"
            value={password}
            onChange={(e) => {
              console.log("Old password input changed:", e.target.value);
              setPassword(e.target.value);
            }}
          />
        </div>
        <div>
          <img src={lock} alt="" />
          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => {
              console.log("New password input changed:", e.target.value);
              setNewPassword(e.target.value);
            }}
          />
        </div>
        <button
          className="signup-login-button"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? "Updating..." : "Update"}
        </button>
      </form>
    </div>
  );
};

export default SettingPage;
