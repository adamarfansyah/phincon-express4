const express = require("express");
const cors = require("cors");
const app = express();
const routes = require("./routes/index.js");
const PORT = 3000;
const dotenv = require("dotenv");
const fileupload = require("express-fileupload");

dotenv.config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  fileupload({
    limits: { fileSize: 50 * 1024 * 1024 },
  })
);

app.use("/api", routes);

app.all("*", (req, res) => {
  res.status(404).json({ message: "API Not Found" });
});

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});
