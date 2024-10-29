const express = require("express");
const mongoose = require("mongoose");
const authToken = require("./middlewares/auth");
const movieRoute = require("./routes/movieRoutes");
const userRoutes = require("./routes/authRoutes");
const actorRoute = require("./routes/actorRoutes");
const producerRoute = require("./routes/producerRoutes");
const cors = require("cors");

require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/users", userRoutes);

//token middleware
app.use(authToken);

//routes
app.use("/api/movies", movieRoute);
app.use("/api/actors", actorRoute);
app.use("/api/producers", producerRoute);

//db connection
const connectdb = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Db connected");
  } catch (error) {
    console.log("failed to connect db", error.message);
    process.exit(1);
  }
};
connectdb();

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Server running on port ${port}`));
