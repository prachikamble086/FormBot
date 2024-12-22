const express = require("express");
const app = express();
const router = express.Router();

const { getFolderDetails } = require("../controllers/folder.controllers");

router.get("/:folderId", getFolderDetails);

module.exports = router;
