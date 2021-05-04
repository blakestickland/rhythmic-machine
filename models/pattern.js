const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const patternSchema = new mongoose.Schema({
  patternName: {
    type: String,
    required: true
  },
  // integer for highest number of steps in the pattern
  numberOfSteps: {
    type: Number,
    default: 0,
    required: true
  },
  // url for recipe web page - unique index
  pattern: {
    type: Array,
    default: [Number],
    required: true
  },

  // Not all ingredients, just the recommended ingredients from scraped web pages
  // from which seed data was sourced
  description: String
});

const Pattern = mongoose.model("Pattern", patternSchema);

module.exports = Pattern;
