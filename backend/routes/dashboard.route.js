const express = require("express");
const app = express();
const router = express.Router();

const { getDashboardDetails } = require("../controllers/dashboard.controllers");

router.get("/:dashboardId", getDashboardDetails);

module.exports = router;
