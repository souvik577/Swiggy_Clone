const mongoose = require("mongoose");

const foodSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, required: true },
  img: { type: String, required: true },
  desc: { type: String, required: true },
  rating: { type: Number, required: true },
});

module.exports = mongoose.model("Food", foodSchema);
