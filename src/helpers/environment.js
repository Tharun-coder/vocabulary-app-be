require("dotenv").config();
const DB_URL = process.env.DB_URL;
const PORT = process.env.PORT || 5000;
const APP_ID = process.env.APP_ID;
const APP_KEY = process.env.APP_KEY;

module.exports = { DB_URL, PORT, APP_ID, APP_KEY };
