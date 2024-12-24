const express = require("express");
const app = express();
const router = express.Router();

const {
  getUserDetails,
  putUserDetails,
} = require("../controllers/user.controllers");

router.get("/:userId", getUserDetails);
router.put("/:userId,putUserDetails");

module.exports = router;
