const Response = require("../models/response.model");

//Get Response Details

const getResponseDetails = async (req, res) => {
  try {
    let { responseId } = req.params;
    responseId = responseId.trim();

    if (!mongoose.Types.ObjectId.isValid(responseId)) {
      return res.status(400).json({
        message: "Invalid response ID format",
      });
    }

    const response = await Response.findById(responseId);
    if (!response) {
      res.status(400).json({ message: "Response not found" });
    }

    res.status(200).json({ response });
  } catch (error) {
    console.log("Error occured while fetching response");
    res.status(500).json({ error });
  }
};

module.exports = { getResponseDetails };
