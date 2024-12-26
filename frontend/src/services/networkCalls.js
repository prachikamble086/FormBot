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

export async function putUserData(userId, userDetails) {
  try {
    const { data } = await axios.put(`${baseUrl}/user/${userId}`, userDetails);
    return data;
  } catch (error) {
    console.error(`Error updating user data for ID ${userId}:`, error);
    throw error;
  }
}

// export async function postFolderRequest(
//   dashboardId,
//   requestUserId,
//   title,
//   forms
// ) {
//   try {
//     console.log("Sending request to:", baseUrl);

//     const { data } = await axios.post(`${baseUrl}/folders/${dashboardId}`, {
//       requestUserId,
//       title,
//       forms,
//     });
//     return data;
//   } catch (error) {
//     console.error("Error during login:", error);
//     throw error;
//   }
// }

// Define baseUrl somewhere, or ensure it's defined before using it

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
