const mongoose = require("mongoose");
const { DB_URL, PORT } = require("./environment");

const connectDB = new Promise((resolve, reject) => {
  try {
    mongoose.connect(DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    resolve(PORT);
  } catch (err) {
    reject(err);
    console.log(err);
  }
});

module.exports = connectDB;
