const Dashboard = require("../models/dashboard.model");
const Folder = require("../models/folder.model");
const mongoose = require("mongoose");
const User = require("../models/user.model");
//Get Dashboard Details

const getDashboardDetails = async (req, res) => {
  try {
    let { dashboardId } = req.params;
    let { requestUserId } = req.body;

    dashboardId = dashboardId.trim();

    if (!mongoose.Types.ObjectId.isValid(dashboardId)) {
      return res.status(400).json({
        message: "Invalid dashboard Id",
      });
    }

    const dashboard = await Dashboard.findById(dashboardId)
      .populate("folders")
      .populate({
        path: "forms",
        select: "_id title",
      });

    console.log(dashboard);
    console.log(dashboard.folders);
    console.log(dashboard.forms);

    if (!dashboard) {
      return res.status(400).json({ message: "Dashboard not found" });
    }

    const hasViewOrEditAccess =
      dashboard.editAccess.includes(requestUserId) ||
      dashboard.viewAccess.includes(requestUserId);

    if (!hasViewOrEditAccess) {
      return res.status(400).json({ message: "Access denied" });
    }

    res.status(200).json({
      title: dashboard.title,
      ownerId: dashboard.ownerId,
      folders: dashboard.folders,
      forms: dashboard.forms,
    });
  } catch (error) {
    console.log("Error occured while fetching dashboard");
    return res.status(500).json({ error });
  }
};

const postInvite = async (req, res) => {
  try {
    let { dashboardId } = req.params;
    let { requestUserId, email, permission } = req.body;

    console.log("dashboardId:", dashboardId);
    console.log("requestUserId:", requestUserId);
    console.log("email:", email);
    console.log("permission:", permission);
    dashboardId = dashboardId.trim();

    if (!mongoose.Types.ObjectId.isValid(dashboardId)) {
      console.log("Invalid dashboardId:", dashboardId);
      return res.status(400).json({
        message: "Invalid dashboard ID",
      });
    }

    const dashboard = await Dashboard.findById(dashboardId);
    if (!dashboard) {
      return res.status(404).json({ message: "Dashboard not found" });
    }

    if (dashboard.ownerId.toString() !== requestUserId) {
      console.log(
        "User is not authorized to share this dashboard:",
        requestUserId
      );
      return res.status(403).json({ message: "Access denied" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      console.log("User not registered for email:", email);
      return res.status(404).json({ message: "User not registered" });
    }

    console.log("User found:", user._id);

    res.status(200).json({
      message: `User can now be granted  access`,
    });
  } catch (error) {
    console.log("Error occurred while sharing the dashboard:");
    res
      .status(500)
      .json({ message: "Error occurred while sharing the dashboard" });
  }
};

module.exports = { getDashboardDetails, postInvite };
