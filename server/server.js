const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const doctorsRoutes = require("./routes/doctors");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json()); 

const authRoutes = require("./routes/auth");
app.use("/api", authRoutes);
app.use("/api/doctors", doctorsRoutes);

const PORT = process.env.PORT ;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
