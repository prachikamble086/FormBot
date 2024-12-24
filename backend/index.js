const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const app = express();
const PORT = 8000;

const { connectDB } = require("./models/db");

const authRoute = require("./routes/auth.routes");
const verifyToken = require("./middlewares/auth.middlewares");
const userRoute = require("./routes/user.routes");
const dashboardRoute = require("./routes/dashboard.route");
const folderRoute = require("./routes/folder.routes");
const formRoute = require("./routes/form.routes");
const responseRoute = require("./routes/response.routes");

app.use(express.json());

connectDB();

app.get("/", (req, res) => {
  res.send("Backend server is running!");
});

app.use("/auth", authRoute);
app.use("/form", formRoute);
app.use("/response", responseRoute);
app.use(verifyToken);
app.use("/user", userRoute);
app.use("/dashboard", dashboardRoute);
app.use("/folder", folderRoute);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
