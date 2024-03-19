const mongoose = require("mongoose");

const imgSchema = mongoose.Schema({
  title: String,
  description: String,
  filename: String,
  path: String,
});

const imgModel = mongoose.model("imagenes", imgSchema);

module.exports = imgModel;
