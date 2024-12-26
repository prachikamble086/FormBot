const express = require("express");
const app = express();
const router = express.Router();

const {
  getFolderDetails,
  postFolder,
  deleteFolder,
  getFolderList,
} = require("../controllers/folder.controllers");

router.post("/:dashboardId", postFolder);
router.get("/:folderId", getFolderDetails);
router.delete("/:folderId", deleteFolder);
router.get("/dashboardId/folders", getFolderList);
module.exports = router;
