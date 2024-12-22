const { default: mongoose } = require("mongoose");
const Dashboard = require("../models/dashboard.model");

//Get Dashboard Details

const getDashboardDetails = async (req, res) => {
  try {
    let { dashboardId } = req.params;

    dashboardId = dashboardId.trim();

    const viewAndEditAccessId = await Dashboard.findByOne({
      $or: [
        { editAccess: { $in: [mongoose.Types.ObjectId(id)] } },
        { viewAccess: { $in: [mongoose.Types.ObjectId(id)] } },
      ],
    });

    if (!viewAndEditAccessId) {
      return res.status(400).json({ message: "Access denied" });
    }

    if (!mongoose.Types.ObjectId.isValid(dashboardId)) {
      return res.status(400).json({
        message: "Invalid dashboard Id",
      });
    }

    const dashboard = await Dashboard.findById(dashboardId)
      .populate("folders")
      .populate("forms");
    if (!dashboard) {
      res.status(400).json({ message: "Dashboard not found" });
    }

    res.status(200).json({
      title: dashboard.title,
      folders: dashboard.folders,
      forms: dashboard.forms,
    });
  } catch (error) {
    console.log("Error occured while fetching dashboard");
    res.status(500).json({ error });
  }
};

module.exports = { getDashboardDetails };
