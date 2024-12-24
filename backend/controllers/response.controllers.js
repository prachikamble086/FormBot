const verifyToken = require("../middlewares/auth.middlewares");
const Response = require("../models/response.model");

const express = require("express");
const app = express();

const mongoose = require("mongoose");

const postResponse = async (req, res) => {
  try {
    const { formId } = req.params;
    const { completed, response, submittedAt, userId } = req.body;

    if (!mongoose.Types.ObjectId.isValid(formId)) {
      return res.status(400).json({ message: "Invalid form ID" });
    }

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const newResponse = new Response({
      formId,
      userId,
      completed,
      response,
      submittedAt,
    });

    await newResponse.save();

    return res.status(200).json({
      message: "Response created successfully",
      newResponse,
    });
  } catch (error) {
    return res.status(500).json({ message: "Error while creating response" });
  }
};

const putResponse = async (req, res) => {
  try {
    let { responseId } = req.params;
    const { userId, completed, response, submittedAt } = req.body;

    if (!mongoose.Types.ObjectId.isValid(responseId)) {
      return res.status(400).json({
        message: "Invalid response ID format",
      });
    }

    const existingResponse = await Response.findById(responseId);
    if (!existingResponse) {
      return res.status(404).json({ message: "Response not found" });
    }

    existingResponse.userId = userId || existingResponse.userId;
    existingResponse.completed =
      completed !== undefined ? completed : existingResponse.completed;
    existingResponse.response = response || existingResponse.response;
    existingResponse.submittedAt = submittedAt || existingResponse.submittedAt;

    await existingResponse.save();

    return res.status(200).json({
      message: "Response updated successfully",
      existingResponse,
    });
  } catch (error) {
    return res.status(500).json({ message: "Error in updating response" });
  }
};

app.use(verifyToken);

const getResponseDetails = async (req, res) => {
  try {
    let { formId } = req.params;

    formId = formId.trim();

    if (!mongoose.Types.ObjectId.isValid(formId)) {
      return res.status(400).json({
        message: "Invalid response ID format",
      });
    }

    const responses = await Response.find({ formId });
    if (!responses) {
      res.status(400).json({ message: "Something went wrong" });
    }

    // fetch form views , completion rate , submittedAt != null

    const formViews = responses.length;

    const completedResponses = responses.filter(
      (response) => response.completed
    ).length;

    const completionRate = ((completedResponses / formViews) * 100).toFixed(2);

    const submittedResponses = responses.filter(
      (response) => response.submittedAt !== null
    );
    res.status(200).json({
      formViews,
      completionRate: `${completionRate}%`,
      submittedResponses: submittedResponses.map((resp) => ({
        _id: resp._id,
        submittedAt: resp.submittedAt,
      })),
    });
  } catch (error) {
    console.log("Error occured while fetching response");
    res.status(400).json({ error });
  }
};

module.exports = { getResponseDetails, postResponse, putResponse };
