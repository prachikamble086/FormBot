const express = require("express");
const app = express();
const router = express.Router();

const {
  getFormDetails,
  postForm,
  deleteForm,
} = require("../controllers/form.controllers");

router.post("/:dashboardId", postForm);
router.get("/:formId", getFormDetails);
router.delete("/:formId", deleteForm);

module.exports = router;
