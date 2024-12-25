import axios from "axios";

const baseUrl = import.meta.env.VITE_API_ENDPOINT;

export async function getUserData(userId) {
  try {
    const { data } = await axios.get(`${baseUrl}/user/${userId}`);
    return data;
  } catch (error) {
    console.error(`Error fetching user data for ID ${userId}:`, error);
    throw error;
  }
}

export async function postRegisterRequest(userName, emailId, password) {
  try {
    const { data } = await axios.post(`${baseUrl}/auth/signup`, {
      userName,
      emailId,
      password,
    });
    return data;
  } catch (error) {
    console.error("Error during registration:", error);
    throw error;
  }
}

export async function postLoginRequest(email, password) {
  try {
    const { data } = await axios.post(`${baseUrl}/auth/login`, {
      email,
      password,
    });
    return data;
  } catch (error) {
    console.error("Error during login:", error);
    throw error;
  }
}

export async function putUserData(userId, userDetails) {
  try {
    const { data } = await axios.put(`${baseUrl}/user/${userId}`, userDetails);
    return data;
  } catch (error) {
    console.error(`Error updating user data for ID ${userId}:`, error);
    throw error;
  }
}
