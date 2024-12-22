const express = require("express");
const app = express();
const router = express.Router();

const { getResponseDetails } = require("../controllers/response.controllers");

router.get("/:responseId", getResponseDetails);

module.exports = router;
