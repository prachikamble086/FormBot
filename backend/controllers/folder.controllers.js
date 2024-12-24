const Dashboard = require("../models/dashboard.model");
const Folder = require("../models/folder.model");
const mongoose = require("mongoose");

//Get Folder Details

const getFolderDetails = async (req, res) => {
  try {
    let { folderId } = req.params;
    let { requestUserId } = req.body;

    folderId = folderId.trim();

    if (!mongoose.Types.ObjectId.isValid(folderId)) {
      return res.status(400).json({
        message: "Invalid folder ID",
      });
    }

    const folder = await Folder.findById(folderId).populate({
      path: "forms",
      select: "_id title",
    });

    if (!folder) {
      return res.status(400).json({ message: "Folder not found" });
    }

    const currentDashboard = await Dashboard.findById(folder.dashboardId);

    const hasViewOrEditAccess =
      currentDashboard.editAccess.includes(requestUserId) ||
      currentDashboard.viewAccess.includes(requestUserId);

    if (!hasViewOrEditAccess) {
      return res.status(400).json({ message: "Access denied" });
    }

    res.status(200).json({
      title: folder.title,
      ownerId: folder.ownerId,
      forms: folder.forms,
    });
  } catch (error) {
    console.log("Error occurred while fetching folder:", error);
    res.status(500).json({ error });
  }
};

//post folder check if the requestId is in the edit access array

const postFolder = async (req, res) => {
  try {
    let { dashboardId } = req.params;
    let { requestUserId, title, forms } = req.body;

    dashboardId = dashboardId.trim();

    if (!mongoose.Types.ObjectId.isValid(dashboardId)) {
      console.log("Invalid dashboardId:", dashboardId);
      return res.status(400).json({
        message: "Invalid folder ID",
      });
    }

    const dashboard = await Dashboard.findById(dashboardId);

    if (!dashboard) {
      console.log("Dashboard not found");
      return res.status(500).json({ message: "Dashboard not found" });
    }

    const hasEditAccess = dashboard.editAccess.includes(requestUserId);
    if (!hasEditAccess) {
      console.log("User does not have edit access:", requestUserId);
      return res.status(500).json({ message: "Access denied" });
    }

    const folderPost = new Folder({
      title,
      forms,
      dashboardId: dashboard._id,
      ownerId: dashboard.ownerId,
    });

    await folderPost.save();

    dashboard.folders.push(folderPost._id);
    await dashboard.save();

    res.status(200).json({
      message: "Folder created successfully",
      folderId: folderPost._id,
      title: folderPost.title,
    });
  } catch (error) {
    res.status(500).json({ message: "Error occurred while creating folder" });
  }
};

const deleteFolder = async (req, res) => {
  try {
    let { folderId } = req.params;
    let { requestUserId } = req.body;

    folderId = folderId.trim();

    if (!mongoose.Types.ObjectId.isValid(folderId)) {
      return res.status(400).json({
        message: "Invalid folder ID",
      });
    }

    const folder = await Folder.findById(folderId);

    if (!folder) {
      res.status(400).json({ message: "Folder not found" });
    }

    const currentDashboard = await Dashboard.findById(folder.dashboardId);

    const hasEditAccess = currentDashboard.editAccess.includes(requestUserId);

    if (!hasEditAccess) {
      return res.status(400).json({ message: "Access denied" });
    }

    await Folder.findOneAndDelete(folderId);

    res.status(200).json({ message: "Folder deleted succeessfully" });
  } catch (error) {}
};

module.exports = { getFolderDetails, postFolder, deleteFolder };
