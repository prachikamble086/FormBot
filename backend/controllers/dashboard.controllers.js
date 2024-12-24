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
    let { requestUserId, emailId } = req.body;

    if (!emailId) {
      return res.status(400).json({ message: "emailId is required" });
    }

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
      console.log("Not authorized to share this dashboard");
      return res.status(403).json({ message: "Access denied" });
    }

    const user = await User.findOne({ emailId });
    console.log("User found:", user);

    if (!user) {
      console.log("User not registered for email");
      return res.status(404).json({ message: "User not registered" });
    }

    res.status(200).json({
      message: "Access granted",
    });
  } catch (error) {
    console.log("Error occurred while sharing the dashboard", error);
    res
      .status(500)
      .json({ message: "Error occurred while sharing the dashboard" });
  }
};

module.exports = { getDashboardDetails, postInvite };
