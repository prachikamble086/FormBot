const mongoose = require("mongoose");
const { Schema } = mongoose;

const dashboardSchema = new Schema(
  {
    ownerId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "ownerId field is required"],
    },
    title: {
      type: String,
      required: [true, "title field is required"],
    },
    folders: [
      {
        type: Schema.Types.ObjectId,
        ref: "Folder",
      },
    ],
    forms: [
      {
        type: Schema.Types.ObjectId,
        ref: "Form",
      },
    ],
    editAccess: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    viewAccess: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    editLinkId: {
      type: String,
      required: [true, "editLinkId field is required"],
      unique: true,
    },
  },
  { timestamps: true }
);

const Dashboard = mongoose.model("Dashboard", dashboardSchema);
module.exports = Dashboard;
