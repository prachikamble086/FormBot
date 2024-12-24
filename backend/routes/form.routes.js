const express = require("express");
const app = express();
const router = express.Router();

const {
  getFormDetails,
  postForm,
  deleteForm,
} = require("../controllers/form.controllers");
const verifyToken = require("../middlewares/auth.middlewares");

router.get("/:formId", getFormDetails);

router.use(verifyToken);

router.post("/:dashboardId", postForm);
router.delete("/:formId", deleteForm);

module.exports = router;
