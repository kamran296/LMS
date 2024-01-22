const mongoose = require("mongoose");

const testSchema = new mongoose.Schema({
  batchname: {
    type: mongoose.Types.ObjectId,
    ref: "Batch",
    required: true,
  },
  testName: {
    type: String,
    required: true,
  },
  answerSheet: {
    type: String, // Assuming the path or URL to the image file
    required: true,
  },
});

module.exports = mongoose.model("Test", testSchema);
