// Admin login

const mongoose = require("mongoose");

const bcrypt = require("bcryptjs");

// Schema for admin

const adminSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: "manager",
  },
});

module.exports = mongoose.model("Admin", adminSchema);
