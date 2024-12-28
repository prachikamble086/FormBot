import axios from "axios";

const baseUrl = import.meta.env.VITE_API_ENDPOINT;
export async function getUserData(userId) {
  try {
    // Get the logged-in user's ID from localStorage (or JWT token if necessary)
    const requestUserId = localStorage.getItem("userId");

    // Check if requestUserId is available
    if (!requestUserId) {
      throw new Error("User ID not found in localStorage");
    }

    // Send GET request with userId in URL and requestUserId in the body
    const { data } = await axios.get(`${baseUrl}/user/${userId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwtToken")}`, // Optional: Add Authorization header if needed
      },
      data: { requestUserId }, // Pass requestUserId in the request body
    });

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

export async function postLoginRequest(emailId, password) {
  try {
    const { data } = await axios.post(`${baseUrl}/auth/login`, {
      emailId,
      password,
    });
    return data;
  } catch (error) {
    console.error("Error during login:", error);
    throw error;
  }
}

export async function postFolderRequest(
  dashboardId,
  requestUserId,
  title,
  forms
) {
  try {
    console.log("Sending request to:", baseUrl);

    const { data } = await axios.post(`${baseUrl}/folder/${dashboardId}`, {
      requestUserId,
      title,
      forms,
    });

    return data;
  } catch (error) {
    console.error(
      "Error while creating folder:",
      error.response?.data || error.message
    );
    throw error;
  }
}

export async function getFolderListRequest(dashboardId, requestUserId) {
  try {
    const { data } = await axios.get(`${baseUrl}/dashboard/${dashboardId}`, {
      params: {
        requestUserId,
      },
    });
    return data;
  } catch (error) {
    console.error(
      "Error while fetching folder list:",
      error.response?.data || error.message
    );
    throw error;
  }
}

export const getDashboardDetailsRequest = async (
  dashboardId,
  requestUserId
) => {
  try {
    const response = await axios.get(`${baseUrl}/dashboard/${dashboardId}`, {
      headers: {
        "Content-Type": "application/json",
      },
      data: { requestUserId },
    });

    return response.data;
  } catch (error) {
    console.error(
      "Error fetching dashboard details:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export async function getFormsRequest(folderId, requestUserId) {
  try {
    const { data } = await axios.get(`${baseUrl}/forms/${folderId}`, {
      params: { requestUserId },
    });
    return data;
  } catch (error) {
    console.error("Error fetching forms:", error);
    throw error;
  }
}

//user1update@sample.com
//0987654321

export async function putUserData(userId, username, emailId, password) {
  try {
    const { data } = await axios.put(`${baseUrl}/user/${userId}`, {
      username,
      emailId,
      password,
    });
    return data;
  } catch (error) {
    console.error(`Error updating user data for ID ${userId}:`, error);
    throw error;
  }
}

export async function postFormRequest(dashboardId, requestUserId, title) {
  try {
    const { data } = await axios.post(`${baseUrl}/form/${dashboardId}`, {
      requestUserId,
      title,
    });
    return data;
  } catch (error) {
    console.error("Error creating form:", error);
    throw error;
  }
}

////////////////
