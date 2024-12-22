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

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({
        message: "Invalid user ID format",
      });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    return res.status(200).json({ user });
  } catch (error) {
    console.log("Error occured while fetching user");
    return res.status(500).json({ error });
  }
};

module.exports = { getUserDetails };
