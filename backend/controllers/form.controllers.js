const Form = require("../models/form.model");

//Get Form Details

const getFormDetails = async (req, res) => {
  try {
    let { formId } = req.params;
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

    res.status(200).json({ form });
  } catch (error) {
    console.log("Error occured while fetching form");
    res.status(500).json({ error });
  }
};

module.exports = { getFormDetails };
