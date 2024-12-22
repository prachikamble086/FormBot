const mongoose = require("mongoose");
const { Schema } = mongoose;

const formSchema = new Schema(
  {
    ownerId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "ownerId field is required"],
    },
    folderId: {
      type: Schema.Types.ObjectId,
      ref: "Folder",
    },
    dashboardId: {
      type: Schema.Types.ObjectId,
      ref: "Dashboard",
      required: [true, "dashboardId field is required"],
    },
    editLinkId: {
      type: String,
      unique: true,
      required: [true, "editLinkId field is required"],
    },
    title: {
      type: String,
      unique: true,
      required: [true, "title field is required"],
    },
    views: {
      type: Number,
      default: 0,
    },
    elements: [
      {
        category: {
          type: String,
          required: [true, "category field is required"],
          enum: ["bubble", "input"],
        },
        title: {
          type: String,
          required: [true, "title field is required"],
        },
        typeOfElement: {
          type: String,
          required: [true, "typeOfElement field is required"],
          enum: [
            "text",
            "image",
            "number",
            "email",
            "phone",
            "date",
            "rating",
            "button",
          ],
        },
        placeholder: {
          type: String,
          required: [true, "placeholder field is required"],
        },
      },
    ],
  },
  { timestamps: true }
);

const Form = mongoose.model("Form", formSchema);
module.exports = Form;
