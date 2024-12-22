const express = require("express");
const app = express();
const router = express.Router();

const { getUserDetails } = require("../controllers/user.controllers");

router.get("/:userId", getUserDetails);

module.exports = router;
