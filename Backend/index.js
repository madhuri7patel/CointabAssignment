const express = require("express");
require("dotenv").config();
const { connection } = require("./Config/db");
const cors = require("cors");
const { UserRoute } = require("./Routes/UserRoute");

const app = express();
app.use(express.json());
app.use(cors());
app.use("/", UserRoute);
const PORT = process.env.PORT || 8080;

app.listen(PORT, async () => {
  try {
    await connection;
    console.log("Connected");
  } catch (err) {
    console.log(err.messege);
  }

  console.log(`Server is running on PORT ${PORT}`);
});
