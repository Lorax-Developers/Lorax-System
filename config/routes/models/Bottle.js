const mongoose = require("mongoose");

const BottleSchema = new mongoose.Schema({
  Code: {
    type: String,
    required: true,
  },
  bottleQR: {
    type: String,
    required: true,
  },
  batchQR: {
    type: String,
    required: true,
    unique: true,
  },
  material: {
    type: String,
    required: true,
  },
  size: {
    type: String,
    required: true,
  },
  manufacturer: {
    type: String,
    required: true,
  },
  Status: {
    type: String,
    required: true,
  },
});

module.exports = Bottle = mongoose.model("bottle", BottleSchema);
