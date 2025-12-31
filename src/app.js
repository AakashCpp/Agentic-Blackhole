const express = require("express");
const cors = require("cors");
const scanRoute = require("./routes/scanRoutes.js");

const app = express();

app.use(cors());
app.use(express.json({ limit: "10mb" }));

app.use("/api/scans", scanRoute);

app.get("/", (req, res) => {
  res.status(200).json({ status: "Cyber AI Backend Running" });
});

module.exports = app;
