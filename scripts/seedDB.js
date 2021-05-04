const mongoose = require("mongoose");
const db = require("../models");

// This file empties the Books collection and inserts the books below

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/reactpatterns"
);

const patternSeed = [
  {
      patternName: "Four-on-the-floor",
      numberOfSteps: 16,
      pattern: [1, 5, 9, 13],
      description: "Standard quarter-note 4/4 beat"
  },
  {
      patternName: "Four-Four offbeats",
      numberOfSteps: 16,
      pattern: [3, 7, 11, 15],
      description: "Hits on the offbeats of 4/4"
  },
  {
      patternName: "4/4 16 semi-quavers",
      numberOfSteps: 16,
      pattern: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
      description: "sixteen semi-quavers"
  },
  {
      patternName: "Hits every second beat",
      numberOfSteps: 16,
      pattern: [5, 13],
      description: "standard snare pattern 4/4"
  },
];

db.Pattern.remove({})
  .then(() => db.Pattern.collection.insertMany(patternSeed))
  .then(data => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
