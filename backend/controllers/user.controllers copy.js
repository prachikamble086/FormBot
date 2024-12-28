const User = require("../models/user.model");

//Get User Details

// const getUserDetails = async (req, res) => {
//   try {
//     let { userId } = req.params;
//     let { requestUserId } = req.body;

//     userId = userId.trim();

//     if (userId !== requestUserId) {
//       return res.status(500).json({ message: "Access denied" });
//     }

//     const user = await User.findById(userId)
//       .populate({ path: "editAccess", select: "_id title" })
//       .populate({ path: "viewAccess", select: "_id title" });
//     if (!user) {
//       return res.status(400).json({ message: "User not found" });
//     }

//     return res.status(200).json({ user });
//   } catch (error) {
//     console.log("Error occured while fetching user");
//     return res.status(400).json({ error });
//   }
// };

const getUserDetails = async (req, res) => {
  try {
    let { userId } = req.params; // Extract userId from the URL parameter
    let { requestUserId } = req.body; // Extract requestUserId from the request body

    // Log both userId and requestUserId for debugging
    console.log("Received userId from params:", userId);
    console.log("Received requestUserId from body:", requestUserId);

    // Trim userId to avoid any extra spaces or characters
    userId = userId.trim();
    requestUserId = requestUserId.trim();

    // Check if userId from params matches the requestUserId from the body
    if (userId !== requestUserId) {
      return res.status(403).json({ message: "Access denied" });
    }

    // Fetch user data from the database
    const user = await User.findById(userId)
      .populate({ path: "editAccess", select: "_id title" })
      .populate({ path: "viewAccess", select: "_id title" });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    return res.status(200).json({ user });
  } catch (error) {
    console.error("Error occurred while fetching user:", error);
    return res.status(500).json({ error: "Something went wrong" });
  }
};

//check is if request id is same as userId

const putUserDetails = async (req, res) => {
  try {
    let { userId } = req.params;
    const { requestUserId, userName, emailId, password } = req.body;

    userId = userId.trim();

    if (!userId) {
      return res.status(400).json({ mesage: "Invalid userId" });
    }

    if (userId !== requestUserId) {
      return res.status(400).json({ mesage: "Access denied" });
    }

    const user = await User.findByIdAndUpdate(userId);
    if (!user) {
      return res.status(400).json({ mesage: "User not found" });
    }

    user.userName = userName;
    user.emailId = emailId;
    user.password = password;

    await user.save();

    return res
      .status(200)
      .json({ message: "User profile updated successfully", user });
  } catch (error) {
    console.log("Error occured while fectcing user");
    return res
      .status(400)
      .json({ message: "Error occured while fectcing user" });
  }
};

module.exports = { getUserDetails, putUserDetails };
