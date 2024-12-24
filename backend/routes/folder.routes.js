const express = require("express");
const app = express();
const router = express.Router();

const {
  getFolderDetails,
  postFolder,
  deleteFolder,
} = require("../controllers/folder.controllers");

router.post("/:dashboardId", postFolder);
router.get("/:folderId", getFolderDetails);
router.delete("/:folderId", deleteFolder);
module.exports = router;
