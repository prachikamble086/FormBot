const User = require("../models/user.model");
const Dashboard = require("../models/dashboard.model");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const { v4: uuidv4 } = require("uuid");

dotenv.config();

const signup = async (req, res) => {
  try {
    const { userName, emailId, password } = req.body;

    if (!userName || !emailId || !password) {
      return res.status(400).json({ message: "All fields required" });
    }

    const existingUser = await User.findOne({ emailId });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      userName,
      emailId,
      password: hashedPassword,
    });

    const ownerDashboard = new Dashboard({
      ownerId: newUser._id,
      title: newUser.userName + " Workspace",
      editAccess: [newUser._id],
      viewAccess: [newUser._id],
      editLinkId: uuidv4(),
    });

    newUser.editAccess = [ownerDashboard._id];

    ownerDashboard.save();
    newUser.save();

    const token = jwt.sign({ userId: newUser._id }, process.env.SECRET, {
      expiresIn: "2h",
    });

    return res.status(200).json({ token, message: "User created" });
  } catch (error) {
    console.log("Signup error", error);
    res.status(400).json({ message: "Internal server error" });
  }
};

const login = async (req, res) => {
  try {
    const { emailId, password } = req.body;
    if (!emailId || !password) {
      return res.status(400).json({ message: "All fields required" });
    }

    const existingUser = await User.findOne({ emailId });
    if (!existingUser) {
      return res.status(400).json({ message: "Please signup" });
    }

    const doesPasswordMatch = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!doesPasswordMatch) {
      return res.status(400).json({ message: "Incorrect password" });
    }

    const token = jwt.sign({ userId: existingUser._id }, process.env.SECRET, {
      expiresIn: "2h",
    });
    return res.status(200).json({ token, message: "Login successfull" });
  } catch (error) {
    return res.status(400).json({ message: "Internal server error" });
  }
};

module.exports = { signup, login };
