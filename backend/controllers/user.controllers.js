const User = require("../models/user.model");

// Get User Details
const getUserDetails = async (req, res) => {
  try {
    let { userId } = req.params;
    let { requestUserId } = req.body; // Ensure requestUserId is passed in the body

    console.log("Received userId:", userId);
    console.log("Received requestUserId:", requestUserId);

    userId = userId.trim();

    if (userId !== requestUserId) {
      console.log("Access denied: userId does not match requestUserId");
      return res.status(403).json({ message: "Access denied" }); // Changed to 403
    }

    const user = await User.findById(userId)
      .populate({ path: "editAccess", select: "_id title" })
      .populate({ path: "viewAccess", select: "_id title" });

    console.log("User fetched:", user);

    if (!user) {
      console.log("User not found");
      return res.status(400).json({ message: "User not found" });
    }

    return res.status(200).json({ user });
  } catch (error) {
    console.log("Error occurred while fetching user:", error);
    return res.status(400).json({ error });
  }
};

// Put User Details
// const putUserDetails = async (req, res) => {
//   try {
//     let { userId } = req.params;
//     const { requestUserId, userName, emailId, password, newPassword } =
//       req.body;

//     console.log("Received update request for userId:", userId);
//     console.log("Request body:", {
//       requestUserId,
//       userName,
//       emailId,
//       password,
//       newPassword,
//     });

//     userId = userId.trim();

//     if (!userId) {
//       console.log("Invalid userId");
//       return res.status(400).json({ message: "Invalid userId" });
//     }

//     if (userId !== requestUserId) {
//       console.log("Access denied: userId does not match requestUserId");
//       return res.status(403).json({ message: "Access denied" }); // Changed to 403
//     }

//     const user = await User.findByIdAndUpdate(userId);
//     if (!user) {
//       console.log("User not found for update");
//       return res.status(400).json({ message: "User not found" });
//     }

//     console.log("User before update:", user);

//     const salt = await bcrypt.genSalt(10);
//     const newPasswordHashed = await bcrypt.hash(password, salt);

//     if (userName) user.userName = userName;
//     if (emailId) user.emailId = emailId;
//     if (newPassword) user.password = newPasswordHashed;

//     await user.save();

//     console.log("User after update:", user);

//     return res
//       .status(200)
//       .json({ message: "User profile updated successfully", user });
//   } catch (error) {
//     console.log("Error occurred while updating user:", error);
//     return res
//       .status(400)
//       .json({ message: "Error occurred while updating user" });
//   }
// };

const putUserDetails = async (req, res) => {
  try {
    let { userId } = req.params;
    const { requestUserId, userName, emailId, password, newPassword } =
      req.body;

    console.log("Received update request for userId:", userId);
    console.log("Request body:", {
      requestUserId,
      userName,
      emailId,
      password,
      newPassword,
    });

    userId = userId.trim();

    if (!userId) {
      console.log("Invalid userId");
      return res.status(400).json({ message: "Invalid userId" });
    }

    if (userId !== requestUserId) {
      console.log("Access denied: userId does not match requestUserId");
      return res.status(403).json({ message: "Access denied" }); // Changed to 403
    }

    const user = await User.findById(userId);
    if (!user) {
      console.log("User not found for update");
      return res.status(400).json({ message: "User not found" });
    }

    console.log("User before update:", user);

    // Check if the provided password matches the existing password
    if (password && !(await bcrypt.compare(password, user.password))) {
      console.log("Incorrect old password");
      return res.status(400).json({ message: "Incorrect old password" });
    }

    // Update the user fields if provided
    if (userName) user.userName = userName;
    if (emailId) user.emailId = emailId;

    if (newPassword) {
      const salt = await bcrypt.genSalt(10);
      const newPasswordHashed = await bcrypt.hash(newPassword, salt);
      user.password = newPasswordHashed;
      console.log("New password hashed:", newPasswordHashed); // Log the new hashed password
    }

    await user.save();

    console.log("User after update:", user);

    return res
      .status(200)
      .json({ message: "User profile updated successfully", user });
  } catch (error) {
    console.log("Error occurred while updating user:", error);
    return res
      .status(400)
      .json({ message: "Error occurred while updating user" });
  }
};

module.exports = { getUserDetails, putUserDetails };
