const mongoose = require("mongoose");
const { Schema } = mongoose;

const responseSchema = new Schema(
  {
    formId: {
      type: Schema.Types.ObjectId,
      ref: "Form",
      required: [true, "formId field is required"],
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    completed: {
      type: Boolean,
      default: false,
    },
    submittedAt: {
      type: Date,
    },
    response: [
      {
        category: {
          type: String,
          required: [true, "response field is required"],
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
        value: {
          type: String,
        },
      },
    ],
  },
  { timestamp: true }
);

const Response = mongoose.model("Response", responseSchema);
module.exports = Response;
