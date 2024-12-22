const mongoose = require("mongoose");
const { Schema } = mongoose;
const validator = require("validator");

const userSchema = new Schema(
  {
    userName: {
      type: String,
      required: [true, "userName field is required"],
    },
    emailId: {
      type: String,
      required: [true, "emailId field is required"],
      unique: true,
      validate: [validator.isEmail, "Please enter a valid email address"],
    },
    password: {
      type: String,
      required: [true, "password field is required"],
    },
    editAccess: [
      {
        type: Schema.Types.ObjectId,
        ref: "Dashboard",
      },
    ],
    viewAccess: [
      {
        type: Schema.Types.ObjectId,
        ref: "Dashboard",
      },
    ],
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
