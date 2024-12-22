const mongoose = require("mongoose");
const { Schema } = mongoose;

const folderSchema = new Schema(
  {
    ownerId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "ownerId field is required"],
    },
    title: {
      type: String,
      required: [true, "title field is required"],
      unique: true,
    },
    dashboardId: {
      type: Schema.Types.ObjectId,
      ref: "Dashboard",
      required: [true, "dashboardId field is required"],
    },
    forms: [
      {
        type: Schema.Types.ObjectId,
        ref: "Form",
      },
    ],
  },
  { timestamps: true }
);

const Folder = mongoose.model("Folder", folderSchema);
module.exports = Folder;
