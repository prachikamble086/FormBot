const Folder = require("../models/folder.model");

//Get Folder Details

const getFolderDetails = async (req, res) => {
  try {
    let { folderId } = req.params;
    folderId = folderId.trim();

    if (!mongoose.Types.ObjectId.isValid(folderId)) {
      return res.status(400).json({
        message: "Invalid folder ID folderat",
      });
    }

    const folder = await Folder.findById(folderId);
    if (!folder) {
      res.status(400).json({ message: "Folder not found" });
    }

    res.status(200).json({ folder });
  } catch (error) {
    console.log("Error occured while fetching folder");
    res.status(500).json({ error });
  }
};

module.exports = { getFolderDetails };
