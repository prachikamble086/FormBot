const express = require("express");
const app = express();
const router = express.Router();

const { getFormDetails } = require("../controllers/form.controllers");

router.get("/:formId", getFormDetails);

module.exports = router;
