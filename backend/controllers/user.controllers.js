const User = require("../models/user.model");

//Get User Details

const getUserDetails = async (req, res) => {
  try {
    let { userId } = req.params;
    let { requestUserId } = req.body;

    userId = userId.trim();

    if (userId !== requestUserId) {
      return res.status(500).json({ message: "Access denied" });
    }

    const user = await User.findById(userId)
      .populate({ path: "editAccess", select: "_id title" })
      .populate({ path: "viewAccess", select: "_id title" });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    return res.status(200).json({ user });
  } catch (error) {
    console.log("Error occured while fetching user");
    return res.status(400).json({ error });
  }
};

//check is if request id is same as userId

const putUserDetails = async (req, res) => {
  try {
    let { userId } = req.params;
    let { requestUserId } = req.body;

    userId = userId.trim();

    if (userId !== requestUserId) {
      return res.status(400).json({ mesage: "Access denied" });
    }
    const user = User.findById(userId);
    if (!user) {
      return res.status(400).json({ mesage: "Acceess denied" });
    }
    user.userName = userName;
    user.emailId = emailId;
    user.password = password;
    await user.save();
    res.status(200).json({ message: "User profile updated successfully" });
  } catch (error) {
    console.log("Error occured while fectcing user");
    return res
      .status(400)
      .json({ message: "Error occured while fectcing user" });
  }
};
module.exports = { getUserDetails, putUserDetails };
