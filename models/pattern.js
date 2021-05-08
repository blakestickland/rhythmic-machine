const mongoose = require("mongoose");

const patternSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true
  },
  title: {
    type: String,
    default: "",
    required: true,
    limit: 30
  },
  noteCount: {
    type: Number,
    default: 16,
    required: true
  },
  trackList: {
    type: Array,
    default: [{}],
    required: true
  }
});

const Pattern = mongoose.model("Pattern", patternSchema);

module.exports = Pattern;
