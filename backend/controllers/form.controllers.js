const verifyToken = require("../middlewares/auth.middlewares");
const Form = require("../models/form.model");
const Dashboard = require("../models/dashboard.model");
const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid"); // Import uuid
const express = require("express");
const app = express();

const getFormDetails = async (req, res) => {
  try {
    let { formId } = req.params;
    let { requestUserId } = req.body;

    formId = formId.trim();

    if (!mongoose.Types.ObjectId.isValid(formId)) {
      return res.status(400).json({
        message: "Invalid form ID format",
      });
    }

    const form = await Form.findById(formId);
    if (!form) {
      res.status(400).json({ message: "Form not found" });
    }

    const isOwner = form.ownerId.toString() === requestUserId;

    if (!isOwner) {
      await Form.updateOne({ _id: formId }, { $inc: { views: 1 } });
    }

    res.status(200).json({
      title: form.title,
      ownerId: form.ownerId,
      elements: form.elements,
      isOwner,
    });
  } catch (error) {
    console.log("Error occured while fetching form");
    res.status(500).json({ error });
  }
};

app.use(verifyToken);

//all other APIs will be authenticated

const postForm = async (req, res) => {
  try {
    let { dashboardId } = req.params;
    let { title, elements } = req.body;

    dashboardId = dashboardId.trim();

    if (!mongoose.Types.ObjectId.isValid(dashboardId)) {
      console.log("Invalid dashboardId:", dashboardId);
      return res.status(400).json({
        message: "Invalid dashboard ID",
      });
    }

    const dashboard = await Dashboard.findById(dashboardId);
    if (!dashboard) {
      console.log("Dashboard not found");
      return res.status(500).json({ message: "Dashboard not found" });
    }

    const editLinkId = uuidv4();

    console.log("Dashboard found, proceeding to create form");

    const formPost = new Form({
      title,
      elements,
      dashboardId: dashboard._id,
      ownerId: dashboard.ownerId,
      editLinkId,
    });

    await formPost.save();

    res.status(200).json({
      message: "Form created successfully",
      formId: formPost._id,
      title: formPost.title,
      editLinkId: formPost.editLinkId,
    });
  } catch (error) {
    console.log("Error in creating form:", error);
    return res.status(500).json({ message: "Error in creating form" });
  }
};

const deleteForm = async (req, res) => {
  try {
    let { formId } = req.params;
    let { requestUserId } = req.body;

    formId = formId.trim();

    if (!mongoose.Types.ObjectId.isValid(formId)) {
      return res.status(400).json({
        message: "Invalid folder ID",
      });
    }

    const form = await Form.findById(formId);

    if (!form) {
      res.status(400).json({ message: "Form not found" });
    }

    const currentDashboard = await Dashboard.findById(form.dashboardId);

    const hasEditAccess = currentDashboard.editAccess.includes(requestUserId);

    if (!hasEditAccess) {
      return res.status(400).json({ message: "Access denied" });
    }

    await Form.findOneAndDelete(formId);
  } catch (error) {
    console.log("Error in fetching form");
    return res.status(500).json({ message: "Error in fetching form" });
  }
};

module.exports = { getFormDetails, postForm, deleteForm };
