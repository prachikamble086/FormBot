const express = require("express");
const app = express();
const router = express.Router();

const {
  getDashboardDetails,
  postInvite,
} = require("../controllers/dashboard.controllers");

router.get("/:dashboardId", getDashboardDetails);
router.post("/:dashboardId/share", postInvite);

module.exports = router;
