const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  city: {
    type: String,
    required: true,
  },
  province: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  access: {
    type: String,
    required: true,
  },
});

module.exports = User = mongoose.model("user", UserSchema);
