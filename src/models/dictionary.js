const mongoose = require("mongoose");

const dictionarySchema = mongoose.Schema({
  word: {
    type: String,
    require: true,
  },
  items: {
    type: Array,
    default: [],
  },
});

module.exports = mongoose.model("dictionary", dictionarySchema);
