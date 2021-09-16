const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
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
  pro: {
    type: Object,
    required: false,
  },
});

module.exports = User = mongoose.model("user", UserSchema);
