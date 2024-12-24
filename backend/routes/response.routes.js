const express = require("express");
const app = express();
const router = express.Router();

const {
  getResponseDetails,
  postResponse,
  putResponse,
} = require("../controllers/response.controllers");

router.get("/:formId", getResponseDetails);
router.post("/:formId", postResponse);
router.put("/:responseId", putResponse);

module.exports = router;
