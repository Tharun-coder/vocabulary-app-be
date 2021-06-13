const express = require("express");
const connectDB = require("./src/helpers/connection");
const router = require("./src/routes/dictionary");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/dictionary", router);

connectDB
  .then((port) => {
    app.listen(port);
  })
  .catch((err) => console.log(err));
